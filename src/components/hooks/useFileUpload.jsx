import { useSnack } from '@components/hooks';

const useFileUpload = ({ fileList, setFileList, delFileList, setDelFileList, maxFile, fileTypes, maxSize }) => {
  const { showWarnSnackbar, showSnackbar } = useSnack();

  const handleAddFile = (files) => {
    // 항상 배열로 처리하도록 확인
    const safeFileList = Array.isArray(fileList) ? fileList : [];

    const readFile = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          resolve({
            type: 'client', // 'local'에서 'client'로 변경 - FormData 처리 시 일관성 유지
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
            source: reader.result,
            file: file, // file 객체 보존 - FormData에 필요
          });
        };
        reader.onerror = reject;
      });
    };

    // 입력된 파일 목록을 배열로 변환
    const filesArray = Array.from(files || []);

    // 허용된 확장자만 필터링
    const validExtensions = fileTypes || [];
    const newFilesArray = filesArray.filter(file => validExtensions.includes(file.name.split('.').pop().toLowerCase()));
    
    if (newFilesArray.length < filesArray.length) {
      alert('허용된 파일만 업로드 할 수 있습니다. 해당 확장자가 아닌 파일은 제외되었습니다.');
    }
    
    // 현재 파일 목록의 총 크기 계산
    const size = safeFileList.reduce((acc, cur) => {
      return Number(acc) + Number(cur.fileSize || 0);
    }, 0);
    
    // 새 파일들의 총 크기 계산
    const currSize = newFilesArray.reduce((acc, cur) => {
      return Number(acc) + Number(cur.size || 0);
    }, 0);

    // 최대 크기 확인
    const max = (maxSize || 10) * 1024 * 1024;
    if(size + currSize > max) {
      alert(`제한 용량(${maxSize}MB) 이상을 업로드 했습니다.`);
      return;
    }

    // 최대 파일 개수 확인
    if (safeFileList.length + newFilesArray.length > maxFile) {
      showWarnSnackbar(`최대 업로드 파일 개수는 ${maxFile}개 입니다.`);
      return;
    }

    // 파일 읽기 및 처리
    Promise.all(newFilesArray.map((f) => readFile(f)))
      .then((newFiles) => {
        // 파일 목록 업데이트 (중요: 부모 컴포넌트의 setFilesWithNoDuplicates 함수가 사용됨)
        if (typeof setFileList === 'function') {
          setFileList([...safeFileList, ...newFiles]);
          
          // 디버깅용 로그 추가
          console.log('Files after update:', [...safeFileList, ...newFiles]);
        }
      })
      .catch((error) => {
        console.error('Error reading files:', error);
      });
  };

  const handleRemoveFile = (index) => {
    // 항상 배열로 처리
    const safeFileList = Array.isArray(fileList) ? fileList : [];
    const safeDelFileList = Array.isArray(delFileList) ? delFileList : [];
    
    // 서버 파일 삭제 처리
    if (setDelFileList && typeof setDelFileList === 'function') {
      const file = safeFileList[index];
      if (file && file.type === 'server' && file.fileNo) {
        setDelFileList([...safeDelFileList, file.fileNo]);
      }
    }
    
    // 파일 목록에서 제거
    const files = safeFileList.filter((el, idx) => idx !== index);
    if (typeof setFileList === 'function') {
      setFileList(files);
      
      // 디버깅용 로그 추가
      console.log('Files after removal:', files);
    }
  };

  return { handleAddFile, handleRemoveFile };
};

export default useFileUpload;