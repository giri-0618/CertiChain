// Zero-dependency static server for the CertiChain website. Needs only Node.js 18+.
//   node server.mjs        → http://localhost:3000     (PORT=8080 node server.mjs to change)
// Optional: create a file named `.env` next to this file containing PINATA_JWT=... to pin metadata/PDFs on IPFS.
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = ["site", "out"].map((d) => path.join(here, d)).find((d) => fs.existsSync(d));
if (!root) { console.error("Website files not found (expected a ./site folder next to server.mjs)."); process.exit(1); }

const envFile = path.join(here, ".env");
if (fs.existsSync(envFile)) for (const l of fs.readFileSync(envFile, "utf8").split(/\r?\n/)) { const m = l.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/); if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, ""); }

const PORT = Number(process.env.PORT || 3000);
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "application/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".ico": "image/x-icon", ".txt": "text/plain; charset=utf-8", ".woff2": "font/woff2", ".map": "application/json" };

function locate(urlPath) {
  let u; try { u = decodeURIComponent(urlPath.split("?")[0]); } catch { return null; }
  if (u.includes("..") || u.includes("\0")) return null;
  // /verify/<any id> and /certificate/<any id> share one prebuilt page; the id is read from the URL in the browser.
  const dyn = u.match(/^\/(verify|certificate)\/([^/]+)\/?$/);
  if (dyn) return path.join(root, dyn[1], "_.html");
  for (const c of [u, u + ".html", path.join(u, "index.html")]) {
    const f = path.join(root, c);
    if (f.startsWith(root) && fs.existsSync(f) && fs.statSync(f).isFile()) return f;
  }
  return null;
}

const readBody = (req, max) => new Promise((resolve, reject) => {
  const chunks = []; let n = 0;
  req.on("data", (c) => { n += c.length; if (n > max) { reject(new Error("too large")); req.destroy(); } else chunks.push(c); });
  req.on("end", () => resolve(Buffer.concat(chunks))); req.on("error", reject);
});
const json = (res, code, obj) => { res.writeHead(code, { "content-type": "application/json" }); res.end(JSON.stringify(obj)); };

// Same behaviour as the original Next.js route: 501 when no Pinata JWT → client falls back to an on-chain data: URI.
async function ipfs(req, res) {
  const jwt = process.env.PINATA_JWT;
  if (!jwt) return json(res, 501, { error: "IPFS pinning not configured" });
  try {
    const type = req.headers["content-type"] || "";
    const body = await readBody(req, 11 * 1024 * 1024);
    if (type.includes("application/json")) {
      const m = JSON.parse(body.toString("utf8"));
      if (m?.schema !== "certichain/1" || typeof m.verificationId !== "string") return json(res, 400, { error: "Invalid metadata" });
      const r = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", { method: "POST", headers: { Authorization: `Bearer ${jwt}`, "content-type": "application/json" }, body: JSON.stringify({ pinataContent: m, pinataMetadata: { name: `certichain-${m.verificationId}` } }) });
      if (!r.ok) return json(res, 502, { error: await r.text() });
      return json(res, 200, { uri: `ipfs://${(await r.json()).IpfsHash}` });
    }
    const fd = await new Request("http://x/", { method: "POST", headers: { "content-type": type }, body }).formData();
    const file = fd.get("file");
    if (!(file instanceof File) || file.type !== "application/pdf" || file.size > 10 * 1024 * 1024) return json(res, 400, { error: "PDF up to 10 MB only" });
    const out = new FormData(); out.append("file", file);
    const r = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", { method: "POST", headers: { Authorization: `Bearer ${jwt}` }, body: out });
    if (!r.ok) return json(res, 502, { error: await r.text() });
    return json(res, 200, { uri: `ipfs://${(await r.json()).IpfsHash}` });
  } catch (e) { return json(res, 500, { error: String(e.message || e) }); }
}

http.createServer(async (req, res) => {
  const url = req.url || "/";
  if (url.startsWith("/api/ipfs")) return req.method === "POST" ? ipfs(req, res) : json(res, 405, { error: "POST only" });
  if (req.method !== "GET" && req.method !== "HEAD") return json(res, 405, { error: "Method not allowed" });
  const file = locate(url);
  const headers = { "x-content-type-options": "nosniff", "referrer-policy": "no-referrer" };
  if (!file) {
    const nf = path.join(root, "404.html");
    res.writeHead(404, { ...headers, "content-type": TYPES[".html"] });
    return res.end(fs.existsSync(nf) ? fs.readFileSync(nf) : "Not found");
  }
  const ext = path.extname(file);
  const cache = file.includes(`${path.sep}_next${path.sep}static${path.sep}`) ? "public, max-age=31536000, immutable" : "no-cache";
  res.writeHead(200, { ...headers, "content-type": TYPES[ext] || "application/octet-stream", "cache-control": cache });
  if (req.method === "HEAD") return res.end();
  fs.createReadStream(file).pipe(res);
}).listen(PORT, () => {
  console.log(`\n  CertiChain is running → http://localhost:${PORT}\n  Press Ctrl+C to stop.\n`);
});
