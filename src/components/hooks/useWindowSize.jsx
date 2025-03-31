import React, { useEffect, useState } from "react";

const useWindowSize = () => {
    const [isMobile, setIsMobile] = useState(false);
  
    useEffect(() => {
      function handleResize() {
        if (window.innerWidth <= 767) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
      }
    
      window.addEventListener("resize", handleResize);
      
      handleResize();
      
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
    return isMobile;
  }

export default useWindowSize