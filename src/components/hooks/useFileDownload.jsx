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
    const token = localStorage.getItem('token');

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
  };

  /**
   * 암호화 파일 다운로드
   * @param {*} e
   * @param {*} fileNo
   * @param {*} fileName
   */
  const handleFileDownloadEncrypt = async (e, fileNo, fileName) => {
    e.preventDefault();
    console.log('=== 파일 다운로드 시작 ===');
    console.log('파일번호:', fileNo);
    console.log('파일이름:', fileName);
    
    // actions.setLoading(true);
    try {
      // 세션스토리지 대신 로컬스토리지에서 토큰 가져오기
      const token = localStorage.getItem('token');
      console.log('토큰 존재 여부:', !!token);
      
      // 토큰 첫 10자만 로그 (보안을 위해 전체 토큰은 출력하지 않음)
      if (token) {
        console.log('토큰 일부:', token.substring(0, 10) + '...');
        console.log('토큰 길이:', token.length);
        
        // JWT 토큰 구조 확인 (점으로 구분된 3개 부분이어야 함)
        const tokenParts = token.split('.');
        console.log('토큰 구조 유효성:', tokenParts.length === 3 ? '유효' : '유효하지 않음');
      } else {
        console.error('토큰이 없습니다!');
        return;
      }
  
      console.log('API 요청 URL:', `${import.meta.env.VITE_API_URL_SUB}/api/v1/common/download/encrypt/${fileNo}`);
      
      fetch(`${import.meta.env.VITE_API_URL_SUB}/api/v1/common/download/encrypt/${fileNo}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then(async (response) => {
          console.log('응답 상태:', response.status);
          console.log('응답 OK 여부:', response.ok);
          
          if (!response.ok) {
            console.error('응답 에러:', response.status, response.statusText);
            
            // 응답 본문 확인 시도
            try {
              const errorText = await response.text();
              console.error('에러 응답 본문:', errorText);
            } catch (err) {
              console.error('에러 응답 본문을 읽을 수 없음');
            }
            
            if (response.status === 400 || response.status === 401) {
              throw new Error('인증 토큰이 유효하지 않습니다. 다시 로그인해 주세요.');
            }
            throw new Error('파일 다운로드 실패');
          }
  
          console.log('응답 헤더:', {
            contentType: response.headers.get('Content-Type'),
            contentLength: response.headers.get('Content-Length'),
          });
  
          // 스트림을 읽기 위한 리더
          const reader = response.body.getReader();
          const contentLength = +response.headers.get('Content-Length') || 0;
          console.log('파일 크기:', contentLength, 'bytes');
  
          // 다운로드 진행 상황을 추적하기 위한 변수
          let receivedLength = 0;
          const chunks = []; // 다운로드한 데이터를 저장할 배열
          console.log('다운로드 시작...');
  
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              console.log('다운로드 완료!');
              break;
            }
  
            chunks.push(value);
            receivedLength += value.length;
  
            // 진행률 업데이트 (25%, 50%, 75%, 100%에서만 로그 출력)
            if (contentLength) {
              const percent = Math.round((receivedLength / contentLength) * 100);
              if (percent % 25 === 0) {
                console.log(`다운로드 진행률: ${percent}%`);
              }
              //actions.setReceived(Math.round((receivedLength / contentLength) * 100));
            }
          }
  
          console.log('데이터 청크 수:', chunks.length);
          console.log('받은 총 데이터 크기:', receivedLength, 'bytes');
  
          // 모든 청크를 하나의 Uint8Array로 결합
          const blob = new Blob(chunks, { type: 'application/octet-stream' });
          console.log('Blob 생성 완료:', blob.size, 'bytes');
  
          // 다운로드 링크 생성 및 클릭
          const url = window.URL.createObjectURL(blob);
          console.log('Blob URL 생성:', url);
          
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${fileName}`);
          document.body.appendChild(link);
          console.log('다운로드 링크 생성 완료, 클릭 시도...');
          link.click();
          console.log('다운로드 시작됨');
  
          // 메모리 해제
          window.URL.revokeObjectURL(url);
          document.body.removeChild(link);
          console.log('리소스 정리 완료');
        })
        .catch((error) => {
          console.error('파일 다운로드 오류:', error);
          console.error('에러 메시지:', error.message);
          console.error('에러 스택:', error.stack);
          alert(error.message || '파일 다운로드 중 오류가 발생했습니다.');
        })
        .finally(() => {
          console.log('=== 파일 다운로드 프로세스 종료 ===');
          // actions.setLoading(false);
          //actions.setReceived(0);
        });
  
    } catch (e) {
      console.error('전체 다운로드 프로세스 오류:', e);
      console.error('오류 메시지:', e.message);
      console.error('오류 스택:', e.stack);
      alert('파일 다운로드 중 예기치 않은 오류가 발생했습니다.');
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
    const token = localStorage.getItem('token');

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
  };

  const handleFileZipDownloadEncrypt = async (e, fileType, fileNo) => {
    e.preventDefault();
    console.log.log('파일다운로드테스트')

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
console.log(token)
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
    console.log(response)
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

  return { handleFileDownload, handleFileZipDownload, handleFileDownloadEncrypt, handleFileZipDownloadEncrypt };
};

export default useFileDownload;
