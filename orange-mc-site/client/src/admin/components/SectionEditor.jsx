import { useEffect, useState } from "react";
import { api } from "../../api";
import FieldRenderer from "./FieldRenderer";
import "./SectionEditor.css";

// Renders the editable form for a single content section (e.g. "hero",
// "founders") based on its schema, and saves the whole section back with
// one PUT request when the admin clicks Save.
export default function SectionEditor({ sectionKey, schema, initialValue, onSaved, showToast }) {
  const [draft, setDraft] = useState(initialValue);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setDraft(initialValue);
    setDirty(false);
  }, [initialValue, sectionKey]);

  // Warn before leaving the tab with unsaved changes.
  useEffect(() => {
    function handler(e) {
      if (!dirty) return;
      e.preventDefault();
      e.returnValue = "";
    }
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  function updateField(key, value) {
    setDraft((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
  }

  async function handleSave() {
    setSaving(true);
    try {
      const updated = await api.updateSection(sectionKey, draft);
      setDirty(false);
      onSaved(sectionKey, updated);
      showToast({ type: "success", message: `${schema.label} saved.` });
    } catch (err) {
      showToast({ type: "error", message: err.message });
    } finally {
      setSaving(false);
    }
  }

  function handleDiscard() {
    setDraft(initialValue);
    setDirty(false);
  }

  if (!draft) return null;

  return (
    <div className="section-editor">
      <div className="section-editor__header">
        <div>
          <h2>{schema.label}</h2>
          <p>What you edit here appears live on the public website in the matching section.</p>
        </div>
        <div className="section-editor__save-bar">
          {dirty && <span className="section-editor__unsaved">Unsaved changes</span>}
          <button className="btn btn-ghost" onClick={handleDiscard} disabled={!dirty || saving}>
            Discard
          </button>
          <button className="btn btn-primary" onClick={handleSave} disabled={!dirty || saving}>
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
      </div>

      <div className="section-editor__body">
        {schema.fields.map((field) => (
          <div className="field-row" key={field.key}>
            <label>{field.label}</label>
            <FieldRenderer field={field} value={draft[field.key]} onChange={(v) => updateField(field.key, v)} />
          </div>
        ))}
      </div>
    </div>
  );
}
