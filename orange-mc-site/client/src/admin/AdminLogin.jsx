import { useState } from "react";
import MagicRings from "../components/MagicRings";
import { api, setToken } from "../api";
import "./AdminLogin.css";

export default function AdminLogin({ onLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { token } = await api.login(username, password);
      setToken(token);
      onLoggedIn();
    } catch (err) {
      setError(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-login">
      <div className="admin-login__bg">
        <MagicRings
          color="#FF7A00"
          colorTwo="#FF3B30"
          ringCount={6}
          speed={2}
          attenuation={10}
          lineThickness={2}
          baseRadius={0.35}
          radiusStep={0.1}
          scaleRate={0.08}
          opacity={0.6}
          noiseAmount={0.1}
          ringGap={1.5}
          fadeIn={0.7}
          fadeOut={0.5}
          followMouse
          mouseInfluence={0.15}
          hoverScale={1.1}
          parallax={0.04}
          clickBurst
        />
      </div>

      <form className="admin-login__card" onSubmit={handleSubmit}>
        <div className="admin-login__logo">Orange<span>MC</span></div>
        <p className="admin-login__subtitle">Admin dashboard</p>

        <label className="admin-login__label">Username</label>
        <input
          className="field-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          required
        />

        <label className="admin-login__label">Password</label>
        <input
          className="field-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />

        {error && <p className="admin-login__error">{error}</p>}

        <button className="btn btn-primary admin-login__submit" type="submit" disabled={loading}>
          {loading ? "Signing in…" : "Continue"}
        </button>
      </form>
    </div>
  );
}
