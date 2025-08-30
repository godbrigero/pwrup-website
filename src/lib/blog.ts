import "server-only";
import fs from "node:fs";
import path from "node:path";

export type DiscoveredPost = {
  title: string;
  description: string;
  date: string;
  href: string;
};

function isDirectory(absolutePath: string): boolean {
  try {
    return fs.statSync(absolutePath).isDirectory();
  } catch {
    return false;
  }
}

function walkDirectories(rootDir: string): string[] {
  const found: string[] = [];

  for (const entry of fs.readdirSync(rootDir)) {
    const absolute = path.join(rootDir, entry);
    if (isDirectory(absolute)) {
      found.push(...walkDirectories(absolute));
    } else if (entry.toLowerCase() === "page.mdx") {
      found.push(absolute);
    }
  }

  return found;
}

// Only parse the specific format:
// # Title
//
// ## By Author
//
// ## YYYY-MM-DD
//
// Description (first non-heading paragraph after the above)
function parseBlogFormat(raw: string): {
  title: string;
  description: string;
  date: string;
} {
  const lines = raw.split(/\r?\n/);
  let i = 0;

  // Find first non-empty line that starts with "# "
  while (i < lines.length && lines[i].trim() === "") i++;
  if (i >= lines.length || !lines[i].trim().startsWith("# ")) {
    throw new Error("Invalid blog post format: missing title");
  }
  const title = lines[i].replace(/^#\s+/, "").trim();
  i++;

  // Find next non-empty line that starts with "## " (author)
  while (i < lines.length && lines[i].trim() === "") i++;
  if (i >= lines.length || !lines[i].trim().startsWith("## ")) {
    throw new Error("Invalid blog post format: missing author");
  }
  // Optionally, you could extract the author here if needed
  i++;

  // Find next non-empty line that starts with "## " (date)
  while (i < lines.length && lines[i].trim() === "") i++;
  if (i >= lines.length || !lines[i].trim().startsWith("## ")) {
    throw new Error("Invalid blog post format: missing date");
  }
  const date = lines[i].replace(/^##\s+/, "").trim();
  i++;

  // Find first non-empty, non-heading line as description
  let description = "";
  while (i < lines.length) {
    const line = lines[i].trim();
    if (line && !line.startsWith("#")) {
      description = line;
      break;
    }
    i++;
  }

  return { title, description, date };
}

function toHrefFromAbsolute(absoluteFilePath: string): string {
  // Convert .../src/app/blog/content/2025/hello/page.mdx -> /blog/content/2025/hello
  const appDir = path.join(process.cwd(), "src", "app");
  const relativeFromApp = path.relative(appDir, absoluteFilePath);
  const withoutPage = relativeFromApp.replace(/\/page\.mdx$/i, "");
  return "/" + withoutPage.split(path.sep).join("/");
}

export function discoverPosts(): DiscoveredPost[] {
  const contentRoot = path.join(process.cwd(), "src", "app", "blog", "content");
  if (!isDirectory(contentRoot)) return [];

  const pageFiles = walkDirectories(contentRoot);
  const posts: DiscoveredPost[] = [];

  for (const filePath of pageFiles) {
    const raw = fs.readFileSync(filePath, "utf8");
    let title = "";
    let description = "";
    let date = "";
    try {
      const parsed = parseBlogFormat(raw);
      title = parsed.title;
      description = parsed.description;
      date = parsed.date;
    } catch (e) {
      // If the format is invalid, skip this file
      continue;
    }
    const href = toHrefFromAbsolute(filePath);

    posts.push({ title, description, date, href });
  }

  // Sort by date desc, with empty dates at the bottom
  posts.sort((a, b) => {
    const da = Date.parse(a.date || "");
    const db = Date.parse(b.date || "");
    if (isNaN(da) && isNaN(db)) return a.title.localeCompare(b.title);
    if (isNaN(da)) return 1;
    if (isNaN(db)) return -1;
    return db - da;
  });

  return posts;
}
