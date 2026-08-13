import { Outlet } from "react-router-dom";

/**
 * Root layout. The per-page brand shell (nav + footer + interactions) lives in
 * PageShell — because each source page carries its own root wrapper style — so
 * the layout is just the routed outlet.
 */
export default function Layout() {
  return <Outlet />;
}
