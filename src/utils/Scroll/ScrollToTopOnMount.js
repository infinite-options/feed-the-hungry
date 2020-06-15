import { useEffect } from "react";

// put this on top of a page to make sure
// it scrolls to top
function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}
export default ScrollToTopOnMount;