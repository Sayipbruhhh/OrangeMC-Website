import { useEffect, useState } from "react";
import { api } from "../api";
import SpotlightCard from "./SpotlightCard";
import "./ServerStatus.css";

export default function ServerStatus() {
  const [status, setStatus] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let mounted = true;
    api
      .getServerStatus()
      .then((data) => mounted && setStatus(data))
      .catch(() => {});
    const interval = setInterval(() => {
      api
        .getServerStatus()
        .then((data) => mounted && setStatus(data))
        .catch(() => {});
    }, 30000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  if (!status) return null;

  const online = status.status === "online";

  function copyIp() {
    navigator.clipboard?.writeText(status.javaIp || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <SpotlightCard className="server-status" spotlightColor="#643515">
      <div className="server-status__row">
        <div className="server-status__ip-block">
          <span className={`server-status__dot ${online ? "server-status__dot--on" : "server-status__dot--off"}`} />
          <div>
            <div className="server-status__label">Java IP</div>
            <button className="server-status__ip" onClick={copyIp}>
              {status.javaIp} <span>{copied ? "Copied!" : "Click to copy"}</span>
            </button>
          </div>
        </div>

        <div className="server-status__stat">
          <div className="server-status__label">Bedrock</div>
          <div className="server-status__value">
            {status.bedrockIp}:{status.bedrockPort}
          </div>
        </div>

        <div className="server-status__stat">
          <div className="server-status__label">Version</div>
          <div className="server-status__value">{status.version}</div>
        </div>

        <div className="server-status__stat">
          <div className="server-status__label">Players</div>
          <div className="server-status__value">
            {status.playersOnline}/{status.maxPlayers}
          </div>
        </div>

        <div className="server-status__stat">
          <div className="server-status__label">Status</div>
          <div className={`server-status__value ${online ? "server-status__value--on" : "server-status__value--off"}`}>
            {online ? "Online" : "Offline"}
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}
