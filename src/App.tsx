import { Suspense, lazy, useEffect, useRef } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollFx } from "@/components/ScrollFx";
import { Layout } from "@/components/Layout";
import { ThemeProvider } from "@/components/ThemeProvider";
import { I18nProvider } from "@/i18n";
import Home from "@/pages/Home";

const Projects = lazy(() => import("@/pages/Projects"));
const Experience = lazy(() => import("@/pages/Experience"));
const Training = lazy(() => import("@/pages/Training"));
const Credentials = lazy(() => import("@/pages/Credentials"));
const Tools = lazy(() => import("@/pages/Tools"));
const Resources = lazy(() => import("@/pages/Resources"));
const Contact = lazy(() => import("@/pages/Contact"));
const NotFound = lazy(() => import("@/pages/NotFound"));

/** Scrolls to the top (or the #anchor) on navigation and moves focus to the page for keyboard and screen-reader users. */
function RouteEffects() {
  const { pathname, hash } = useLocation();
  const first = useRef(true);

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
      return;
    }
    window.scrollTo(0, 0);
    if (first.current) {
      first.current = false;
      return;
    }
    document.getElementById("main")?.focus({ preventScroll: true });
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <I18nProvider>
          <ThemeProvider>
            <BrowserRouter>
              <RouteEffects />
              <ScrollFx />
              <Layout>
                <Suspense fallback={null}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/experience" element={<Experience />} />
                    <Route path="/training" element={<Training />} />
                    <Route path="/credentials" element={<Credentials />} />
                    <Route path="/tools" element={<Tools />} />
                    <Route path="/resources" element={<Resources />} />
                    <Route path="/contact" element={<Contact />} />
                    {/* Old URLs keep working */}
                    <Route path="/skills" element={<Navigate to="/credentials" replace />} />
                    <Route path="/electrical-gems" element={<Navigate to="/resources" replace />} />
                    <Route path="/ai-electrical-assistant" element={<Navigate to="/tools" replace />} />
                    <Route path="/about" element={<Navigate to="/" replace />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </Layout>
            </BrowserRouter>
          </ThemeProvider>
        </I18nProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}
