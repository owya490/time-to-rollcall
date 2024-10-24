import { useState, useEffect } from "react";

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const handleMediaChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Set the initial state
    setMatches(mediaQueryList.matches);

    // Listen for changes to the media query
    mediaQueryList.addEventListener("change", handleMediaChange);

    return () => {
      mediaQueryList.removeEventListener("change", handleMediaChange);
    };
  }, [query]);

  return matches;
}

export default useMediaQuery;
