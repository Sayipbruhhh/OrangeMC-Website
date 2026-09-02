import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalBackground from "./components/GlobalBackground";
import HomePage from "./pages/HomePage";
import AdminApp from "./admin/AdminApp";
import { ContentProvider, useContent } from "./context/ContentContext";
import LoadingScreen from "./components/LoadingScreen";
import { useState } from "react";

// Detects "/admin" purely from the current path, so it works unchanged on
// any host/domain: localhost, a staging subdomain, or a production domain.
function PublicSiteWithLoader() {
  const { loading } = useContent();
  const [showSite, setShowSite] = useState(false);

  // "ready" only needs the fetch attempt to have finished (success or
  // failure) — an unreachable API should surface the error banner in
  // HomePage rather than trap the visitor on the loading screen forever.
  return (
    <>
      {!showSite && <LoadingScreen ready={!loading} onFinished={() => setShowSite(true)} />}
      {showSite && <HomePage />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-root">
        <Routes>
          <Route path="/admin/*" element={<AdminApp />} />
          <Route
            path="/*"
            element={
              <ContentProvider>
                <GlobalBackground />
                <PublicSiteWithLoader />
              </ContentProvider>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
