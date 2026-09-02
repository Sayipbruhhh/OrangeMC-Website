import ImageUploader from "./ImageUploader";
import { newId } from "../idGen";
import "./FieldRenderer.css";

// Renders a single field (text/textarea/number/boolean/select/image/list/stringList)
// for whatever object currently holds it, and calls onChange with the updated value.
export default function FieldRenderer({ field, value, onChange }) {
  switch (field.type) {
    case "text":
      return (
        <input
          className="field-input"
          type="text"
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
        />
      );

    case "textarea":
      return (
        <textarea
          className="field-input field-textarea"
          rows={3}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
        />
      );

    case "number":
      return (
        <input
          className="field-input"
          type="number"
          value={value ?? 0}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      );

    case "boolean":
      return (
        <label className="field-toggle">
          <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} />
          <span className="field-toggle__track">
            <span className="field-toggle__thumb" />
          </span>
        </label>
      );

    case "select":
      return (
        <select className="field-input" value={value ?? ""} onChange={(e) => onChange(e.target.value)}>
          {field.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      );

    case "image":
      return <ImageUploader value={value} onChange={onChange} />;

    case "stringList":
      return <StringListField value={value || []} onChange={onChange} />;

    case "list":
      return <ListField field={field} value={value || []} onChange={onChange} />;

    default:
      return null;
  }
}

function StringListField({ value, onChange }) {
  function updateAt(i, newVal) {
    const next = [...value];
    next[i] = newVal;
    onChange(next);
  }
  function removeAt(i) {
    onChange(value.filter((_, idx) => idx !== i));
  }
  function add() {
    onChange([...value, ""]);
  }

  return (
    <div className="string-list">
      {value.map((v, i) => (
        <div key={i} className="string-list__row">
          <input className="field-input" value={v} onChange={(e) => updateAt(i, e.target.value)} />
          <button type="button" className="btn btn-ghost string-list__remove" onClick={() => removeAt(i)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" className="btn btn-secondary string-list__add" onClick={add}>
        + Add item
      </button>
    </div>
  );
}

function ListField({ field, value, onChange }) {
  function updateItem(i, patch) {
    const next = [...value];
    next[i] = { ...next[i], ...patch };
    onChange(next);
  }
  function removeItem(i) {
    onChange(value.filter((_, idx) => idx !== i));
  }
  function moveItem(i, dir) {
    const j = i + dir;
    if (j < 0 || j >= value.length) return;
    const next = [...value];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  }
  function addItem() {
    const base = field.newItem ? field.newItem() : {};
    onChange([...value, { id: newId(field.key), ...base }]);
  }

  return (
    <div className="list-field">
      {value.map((item, i) => (
        <details key={item.id || i} className="list-field__item" open={value.length <= 3}>
          <summary>
            <span>{field.itemLabel ? field.itemLabel(item) : `Item ${i + 1}`}</span>
            <span className="list-field__item-actions">
              <button type="button" onClick={(e) => { e.preventDefault(); moveItem(i, -1); }} disabled={i === 0}>
                ↑
              </button>
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); moveItem(i, 1); }}
                disabled={i === value.length - 1}
              >
                ↓
              </button>
              <button
                type="button"
                className="list-field__delete"
                onClick={(e) => { e.preventDefault(); removeItem(i); }}
              >
                Delete
              </button>
            </span>
          </summary>
          <div className="list-field__item-body">
            {field.itemFields.map((sub) => (
              <div className="field-row" key={sub.key}>
                <label>{sub.label}</label>
                <FieldRenderer
                  field={sub}
                  value={item[sub.key]}
                  onChange={(v) => updateItem(i, { [sub.key]: v })}
                />
              </div>
            ))}
          </div>
        </details>
      ))}
      <button type="button" className="btn btn-secondary" onClick={addItem}>
        + Add {field.label?.replace(/s$/, "") || "item"}
      </button>
    </div>
  );
}
