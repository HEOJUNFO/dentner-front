import React , {useEffect, useState, useCallback} from "react";


const useSearchLayout = () => {
  const [keyword, setKeyword] = useState();  
  const [buttonClick, setButtonClick] = useState(false);  

  return {keyword, setKeyword, buttonClick, setButtonClick}
}

export default useSearchLayout;