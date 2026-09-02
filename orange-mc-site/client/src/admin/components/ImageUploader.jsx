import { useRef, useState } from "react";
import { api, resolveImageUrl } from "../../api";
import "./ImageUploader.css";

export default function ImageUploader({ value, onChange }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const { url } = await api.uploadImage(file);
      onChange(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  function handleRemove() {
    onChange("");
  }

  return (
    <div className="image-uploader">
      <div className="image-uploader__preview">
        {value ? (
          <img src={resolveImageUrl(value)} alt="" />
        ) : (
          <span className="image-uploader__empty">No image</span>
        )}
      </div>
      <div className="image-uploader__actions">
        <button type="button" className="btn btn-secondary" onClick={() => inputRef.current?.click()} disabled={uploading}>
          {uploading ? "Uploading…" : value ? "Replace" : "Upload"}
        </button>
        {value && (
          <button type="button" className="btn btn-ghost" onClick={handleRemove}>
            Remove
          </button>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/png, image/jpeg, image/webp, image/gif, image/svg+xml"
          onChange={handleFile}
          hidden
        />
      </div>
      {error && <p className="image-uploader__error">{error}</p>}
    </div>
  );
}
