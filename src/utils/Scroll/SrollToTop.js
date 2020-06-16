import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// put this one at the top of a page
// but if u have multiple tabs in the same page, use ScrollToTopOnMount instead.
// (so that your scroll position doesn't get reset to top when switching tabs)
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}