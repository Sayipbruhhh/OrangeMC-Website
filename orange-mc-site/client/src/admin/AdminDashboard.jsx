import { useState } from "react";
import { schemas, sectionOrder } from "./schemas";
import SectionEditor from "./components/SectionEditor";
import Toast from "./components/Toast";
import { clearToken } from "../api";
import "./AdminDashboard.css";

export default function AdminDashboard({ content, setContent, onLogout }) {
  const [active, setActive] = useState(sectionOrder[0]);
  const [toast, setToast] = useState(null);

  function showToast(t) {
    setToast(t);
    setTimeout(() => setToast(null), 3000);
  }

  function handleSaved(sectionKey, updatedSection) {
    setContent((prev) => ({ ...prev, [sectionKey]: updatedSection }));
  }

  const activeSchema = schemas[active];

  return (
    <div className="admin-dashboard">
      <aside className="admin-dashboard__sidebar">
        <div className="admin-dashboard__brand">
          Orange<span>MC</span>
          <small>Admin CMS</small>
        </div>

        <nav className="admin-dashboard__nav">
          {sectionOrder.map((key) => (
            <button
              key={key}
              className={`admin-dashboard__nav-item ${active === key ? "admin-dashboard__nav-item--active" : ""}`}
              onClick={() => setActive(key)}
            >
              {schemas[key].label}
            </button>
          ))}
        </nav>

        <div className="admin-dashboard__sidebar-footer">
          <a href="/" className="admin-dashboard__view-site" target="_blank" rel="noreferrer">
            View site ↗
          </a>
          <button
            className="btn btn-ghost admin-dashboard__logout"
            onClick={() => {
              clearToken();
              onLogout();
            }}
          >
            Log out
          </button>
        </div>
      </aside>

      <main className="admin-dashboard__main">
        {activeSchema && content[active] !== undefined && (
          <SectionEditor
            key={active}
            sectionKey={active}
            schema={activeSchema}
            initialValue={content[active]}
            onSaved={handleSaved}
            showToast={showToast}
          />
        )}
      </main>

      <Toast toast={toast} />
    </div>
  );
}
