import { JSONFilePreset } from "lowdb/node";
import path from "path";
import { fileURLToPath } from "url";
import { defaultContent } from "./defaultContent.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbFile = path.join(__dirname, "..", "data", "db.json");

// Shape of the persisted database. `content` is the entire editable
// website content object; `meta` tracks bookkeeping like last-updated time.
const defaultData = {
  content: defaultContent,
  meta: {
    updatedAt: null
  }
};

export const dbPromise = JSONFilePreset(dbFile, defaultData);

export async function getContent() {
  const db = await dbPromise;
  return db.data.content;
}

// Shallow-merges `patch` into the section named `section` (e.g. "hero", "founders").
// Sections are always replaced as a whole object from the admin editor, which
// keeps this simple and avoids partial/inconsistent nested merges.
export async function updateSection(section, patch) {
  const db = await dbPromise;
  if (!(section in db.data.content)) {
    throw new Error(`Unknown content section: ${section}`);
  }
  db.data.content[section] = patch;
  db.data.meta.updatedAt = new Date().toISOString();
  await db.write();
  return db.data.content[section];
}

export async function replaceAllContent(newContent) {
  const db = await dbPromise;
  db.data.content = newContent;
  db.data.meta.updatedAt = new Date().toISOString();
  await db.write();
  return db.data.content;
}
