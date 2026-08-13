import type { RouteRecord } from "vite-react-ssg";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import ProductsPage from "./pages/ProductsPage";
import WorkPage from "./pages/WorkPage";
import InsightsPage from "./pages/InsightsPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";

// Canonical route table (mirrors src/lib/site.ts `routes`). Each page is
// pre-rendered to static HTML by vite-react-ssg; PageShell owns the shell.
export const routes: RouteRecord[] = [
  {
    path: "/",
    element: <Layout />,
    entry: "src/Layout.tsx",
    children: [
      { index: true, Component: HomePage },
      { path: "services", Component: ServicesPage },
      { path: "products", Component: ProductsPage },
      { path: "work", Component: WorkPage },
      { path: "insights", Component: InsightsPage },
      { path: "contact", Component: ContactPage },
      { path: "privacy", Component: PrivacyPage },
      { path: "terms", Component: TermsPage },
    ],
  },
];
