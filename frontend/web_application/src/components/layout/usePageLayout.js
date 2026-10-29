import { useLayoutEffect } from "react";
import { useOutletContext } from "react-router-dom";

// Sets the AppLayout header title and highlighted sidebar item for the current
// page. activePage must equal a sidebar nav name (compared case-insensitively).
// Layout effect so the new title is in place before the browser paints.
export function usePageLayout(title, activePage = "") {
  const setPage = useOutletContext();

  useLayoutEffect(() => {
    setPage({ title, activePage });
  }, [setPage, title, activePage]);
}
