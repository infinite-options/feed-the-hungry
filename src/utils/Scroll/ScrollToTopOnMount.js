import { useEffect } from "react";

// put this on top of a compoent to make sure
// it scrolls to the top of that component
function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}
export default ScrollToTopOnMount;