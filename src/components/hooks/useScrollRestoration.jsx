import { useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollRestoration = () => {
  const location = useLocation();
  const scrollPositions = useRef({});

  // 페이지가 변경될 때 스크롤 위치 저장
  useLayoutEffect(() => {
    const currentKey = location.key || location.pathname;

    return () => {
      scrollPositions.current[currentKey] = window.scrollY;
    };
  }, [location]);

  // 페이지가 렌더링될 때 저장된 스크롤 위치 복원
  useLayoutEffect(() => {
    const currentKey = location.key || location.pathname;

    const restoreScrollPosition = () => {
      // console.log('scrollPositions.current[currentKey]', scrollPositions.current[currentKey]);
      if (scrollPositions.current[currentKey] !== undefined) {
        // console.log('여기안타냐');
        window.scrollTo(0, scrollPositions.current[currentKey]);
        // console.log('여기안탄듯');
      }
    };

    restoreScrollPosition();
  }, [location]);
};

export default useScrollRestoration;
