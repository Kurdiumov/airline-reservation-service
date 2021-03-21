import React, { useState, useEffect } from "react";

function useMobileView() {
  const [isMobile, setIsMobile] = useState(undefined);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 960);
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}

export default useMobileView;
