import { useEffect, useState } from "react";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import { api, getToken, clearToken } from "../api";

const STATUS = {
  CHECKING: "checking",
  LOGGED_OUT: "logged_out",
  LOGGED_IN: "logged_in"
};

export default function AdminApp() {
  const [status, setStatus] = useState(STATUS.CHECKING);
  const [content, setContent] = useState(null);

  async function verifySession() {
    const token = getToken();
    if (!token) {
      setStatus(STATUS.LOGGED_OUT);
      return;
    }
    try {
      // /api/auth/me is checked against the backend on every load — a token
      // sitting in localStorage is never treated as proof of access by itself.
      await api.me();
      const data = await api.getContent();
      setContent(data);
      setStatus(STATUS.LOGGED_IN);
    } catch {
      clearToken();
      setStatus(STATUS.LOGGED_OUT);
    }
  }

  useEffect(() => {
    verifySession();
  }, []);

  if (status === STATUS.CHECKING) {
    return <div className="admin-app__loading">Loading admin panel…</div>;
  }

  if (status === STATUS.LOGGED_OUT) {
    return <AdminLogin onLoggedIn={verifySession} />;
  }

  return <AdminDashboard content={content} setContent={setContent} onLogout={() => setStatus(STATUS.LOGGED_OUT)} />;
}
