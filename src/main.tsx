import "./globals.css";
import "@/generated/hover.css";
import { ViteReactSSG } from "vite-react-ssg";
import { routes } from "./routes";

// vite-react-ssg entry: pre-renders each route to static HTML at build time and
// hydrates on the client. `createRoot` is the contract vite-react-ssg looks for.
export const createRoot = ViteReactSSG({ routes });
