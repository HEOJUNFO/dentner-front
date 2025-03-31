import { useRef } from 'react';

const useScroll = () => {
  const element = useRef(null);
  const onMoveToElement = () => {
    element.current?.scrollIntoView({ behavior: 'smooth',  });
  };

  return { element, onMoveToElement };
};

export default useScroll;
