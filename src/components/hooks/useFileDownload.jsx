import { fileDownload, fileZipDownload, fileDownloadEncrypt, fileZipDownloadEncrypt } from '../../api/Common';
import ModalStore from '@store/ModalStore';

const useFileDownload = () => {
  const { actions } = ModalStore();
  /**
   *
   * @param {*} e click event
   * @param {*} fileNo 파일번호
   * @param {*} fileName 파일이름(오리지날)
   */
  const handleFileDownload = async (e, fileNo, fileName) => {
    e.preventDefault();

    actions.setLoading(true);
    const token = sessionStorage.getItem('token');

    fetch(`${import.meta.env.VITE_API_URL_SUB}/api/v1/common/download/${fileNo}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('파일 다운로드 실패');
        }

        // 스트림을 읽기 위한 리더
        const reader = response.body.getReader();
        const contentLength = +response.headers.get('Content-Length') || 0;

        // 다운로드 진행 상황을 추적하기 위한 변수
        let receivedLength = 0;
        const chunks = []; // 다운로드한 데이터를 저장할 배열

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          chunks.push(value);
          receivedLength += value.length;

          // 진행률 업데이트 (여기서는 예시로 콘솔에 출력)
          if (contentLength) {
            // console.log(`Received ${(receivedLength / contentLength) * 100}%`);
            //actions.setReceived(Math.round((receivedLength / contentLength) * 100));
          }
        }

        // 모든 청크를 하나의 Uint8Array로 결합
        const blob = new Blob(chunks, { type: 'application/octet-stream' });

        // 다운로드 링크 생성 및 클릭
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${fileName}`);
        document.body.appendChild(link);
        link.click();

        // 메모리 해제
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error('파일 다운로드 오류:', error);
      })
      .finally(() => {
        actions.setLoading(false);
        //actions.setReceived(0);
      });

    // await fileDownload(fileNo)
    //   .then((response) => {
    //     console.log(response.data.type, '', response.headers['content-type']);
    //     const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/zip' }));
    //     const link = document.createElement('a');
    //     link.href = url;
    //     link.setAttribute('download', `${fileName}`);
    //     document.body.appendChild(link);
    //     link.click();

    //     document.body.removeChild(link);
    //     window.URL.revokeObjectURL(url);
    //   })
    //   .catch((error) => {
    //     console.error('There was a problem with your fetch operation:', error);
    //   });
  };

  /**
   * 암호화 파일 다운로드
   * @param {*} e
   * @param {*} fileNo
   * @param {*} fileName
   */
  const handleFileDownloadEncrypt = async (e, fileNo, fileName) => {
    e.preventDefault();
    // actions.setLoading(true);
    try {
      const token = sessionStorage.getItem('token');

      fetch(`${import.meta.env.VITE_API_URL_SUB}/api/v1/common/download/encrypt/${fileNo}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then(async (response) => {
          if (!response.ok) {
            throw new Error('파일 다운로드 실패');
          }

          // 스트림을 읽기 위한 리더
          const reader = response.body.getReader();
          const contentLength = +response.headers.get('Content-Length') || 0;

          // 다운로드 진행 상황을 추적하기 위한 변수
          let receivedLength = 0;
          const chunks = []; // 다운로드한 데이터를 저장할 배열

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            chunks.push(value);
            receivedLength += value.length;

            // 진행률 업데이트 (여기서는 예시로 콘솔에 출력)
            if (contentLength) {
              // console.log(`Received ${(receivedLength / contentLength) * 100}%`);
              //actions.setReceived(Math.round((receivedLength / contentLength) * 100));
            }
          }

          // 모든 청크를 하나의 Uint8Array로 결합
          const blob = new Blob(chunks, { type: 'application/octet-stream' });

          // 다운로드 링크 생성 및 클릭
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${fileName}`);
          document.body.appendChild(link);
          link.click();

          // 메모리 해제
          window.URL.revokeObjectURL(url);
          document.body.removeChild(link);
        })
        .catch((error) => {
          console.error('파일 다운로드 오류:', error);
        })
        .finally(() => {
          // actions.setLoading(false);
          //actions.setReceived(0);
        });

      // await fileDownloadEncrypt(fileNo)
      //   .then((response) => {
      //     console.log(response.data.type, '', response.headers['content-type']);
      //     const url = window.URL.createObjectURL(new Blob([response.data], { type: response.data.type }));
      //     const link = document.createElement('a');
      //     link.href = url;
      //     link.setAttribute('download', `${fileName}`);
      //     document.body.appendChild(link);
      //     link.click();
      //   })
      //   .catch((error) => {
      //     console.error('There was a problem with your fetch operation:', error);
      //   });
    } catch (e) {
      console.log(e);
    }
  };

  /**
   *
   * @param {*} e
   * @param {*} fileType 파일구분( A: 면허증, B:사업자등록증, C:리뷰, D:프로필, E:배너, F:회사사진OR포트폴리오, G:의뢰서, H:3D뷰어소통, I:추가금, J:CAD업로드, K:재제작)
   * @param {*} fileNo 번호
   */
  const handleFileZipDownload = async (e, fileType, fileNo) => {
    e.preventDefault();

    let filename = '';
    if (fileType === 'A') {
      filename = `면허증_${fileNo}`;
    } else if (fileType === 'B') {
      filename = `사업자등록증_${fileNo}`;
    } else if (fileType === 'C') {
      filename = `리뷰_${fileNo}`;
    } else if (fileType === 'D') {
      filename = `프로필_${fileNo}`;
    } else if (fileType === 'E') {
      filename = `배너_${fileNo}`;
    } else if (fileType === 'F') {
      filename = `회사사진OR포트폴리오_${fileNo}`;
    } else if (fileType === 'G') {
      filename = `의뢰서_${fileNo}`;
    } else if (fileType === 'H') {
      filename = `3D뷰어소통_${fileNo}`;
    } else if (fileType === 'I') {
      filename = `추가금_${fileNo}`;
    } else if (fileType === 'J') {
      filename = `CAD업로드_${fileNo}`;
    } else if (fileType === 'K') {
      filename = `재제작_${fileNo}`;
    }
    const token = sessionStorage.getItem('token');

    actions.setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL_SUB}/api/v1/common/download/zip/${fileType}/${fileNo}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('파일 다운로드 실패');
        }

        // 스트림을 읽기 위한 리더
        const reader = response.body.getReader();
        const contentLength = +response.headers.get('Content-Length') || 0;

        // 다운로드 진행 상황을 추적하기 위한 변수
        let receivedLength = 0;
        const chunks = []; // 다운로드한 데이터를 저장할 배열

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          chunks.push(value);
          receivedLength += value.length;

          // 진행률 업데이트 (여기서는 예시로 콘솔에 출력)
          if (contentLength) {
            // console.log(`Received ${(receivedLength / contentLength) * 100}%`);
            //actions.setReceived(Math.round((receivedLength / contentLength) * 100));
          }
        }

        // 모든 청크를 하나의 Uint8Array로 결합
        const blob = new Blob(chunks, { type: 'application/octet-stream' });

        // 다운로드 링크 생성 및 클릭
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${filename}.zip`);
        document.body.appendChild(link);
        link.click();

        // 메모리 해제
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error('파일 다운로드 오류:', error);
      })
      .finally(() => {
        actions.setLoading(false);
        //actions.setReceived(0);
      });

    // await fileZipDownload({ fileType, fileNo })
    //   .then((response) => {
    //     const url = window.URL.createObjectURL(new Blob([response.data], { type: response.data.type }));
    //     const link = document.createElement('a');
    //     link.href = url;
    //     link.setAttribute('download', `${filename}.zip`);
    //     document.body.appendChild(link);
    //     link.click();
    //   })
    //   .catch((error) => {
    //     console.error('There was a problem with your fetch operation:', error);
    //   });
  };

  const handleFileZipDownloadEncrypt = async (e, fileType, fileNo) => {
    e.preventDefault();

let filename = '';
if (fileType === 'A') {
  filename = `면허증_${fileNo}`;
} else if (fileType === 'B') {
  filename = `사업자등록증_${fileNo}`;
} else if (fileType === 'C') {
  filename = `리뷰_${fileNo}`;
} else if (fileType === 'D') {
  filename = `프로필_${fileNo}`;
} else if (fileType === 'E') {
  filename = `배너_${fileNo}`;
} else if (fileType === 'F') {
  filename = `회사사진OR포트폴리오_${fileNo}`;
} else if (fileType === 'G') {
  filename = `의뢰서_${fileNo}`;
} else if (fileType === 'H') {
  filename = `3D뷰어소통_${fileNo}`;
} else if (fileType === 'I') {
  filename = `추가금_${fileNo}`;
} else if (fileType === 'J') {
  filename = `CAD업로드_${fileNo}`;
} else if (fileType === 'K') {
  filename = `재제작_${fileNo}`;
}

// 세션스토리지 대신 로컬스토리지에서 토큰 가져오기
const token = localStorage.getItem('token');

// 토큰이 없는 경우 처리
if (!token) {
  console.log("로컬 스토리지에서 토큰을 찾을 수 없습니다");
  // 필요하다면 로그인 페이지로 리다이렉트
  // window.location.href = '/login';
  return;
}

actions.setLoading(true);
fetch(`${import.meta.env.VITE_API_URL_SUB}/api/v1/common/download/zip/encrypt/${fileType}/${fileNo}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
})
  .then(async (response) => {
    if (!response.ok) {
      if (response.status === 400 || response.status === 401) {
        throw new Error('인증 토큰이 유효하지 않습니다. 다시 로그인해 주세요.');
      }
      throw new Error('파일 다운로드 실패');
    }

    // 스트림을 읽기 위한 리더
    const reader = response.body.getReader();
    const contentLength = +response.headers.get('Content-Length') || 0;

    // 다운로드 진행 상황을 추적하기 위한 변수
    let receivedLength = 0;
    const chunks = []; // 다운로드한 데이터를 저장할 배열

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      chunks.push(value);
      receivedLength += value.length;

      // 진행률 업데이트 (여기서는 예시로 콘솔에 출력)
      if (contentLength) {
        // console.log(`Received ${(receivedLength / contentLength) * 100}%`);
        //actions.setReceived(Math.round((receivedLength / contentLength) * 100));
      }
    }

    // 모든 청크를 하나의 Uint8Array로 결합
    const blob = new Blob(chunks, { type: 'application/octet-stream' });

    // 다운로드 링크 생성 및 클릭
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${filename}.zip`);
    document.body.appendChild(link);
    link.click();

    // 메모리 해제
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
  })
  .catch((error) => {
    console.error('파일 다운로드 오류:', error);
    alert(error.message || '파일 다운로드 중 오류가 발생했습니다.');
  })
  .finally(() => {
    actions.setLoading(false);
    //actions.setReceived(0);
  });

  };

  const fetchInstance = () => {};

  return { handleFileDownload, handleFileZipDownload, handleFileDownloadEncrypt, handleFileZipDownloadEncrypt };
};

export default useFileDownload;
