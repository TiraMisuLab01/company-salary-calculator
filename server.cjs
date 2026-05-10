const http = require("http");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const PORT = 8080;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

const staticDir = path.join(__dirname, "dist");

function serve(reqPath, res) {
  let filePath = path.join(staticDir, reqPath === "/" ? "index.html" : reqPath);

  try {
    if (fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, "index.html");
    }
  } catch (e) {
    filePath = path.join(staticDir, "index.html");
  }

  try {
    const data = fs.readFileSync(filePath);
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
    res.end(data);
  } catch (e) {
    res.writeHead(404);
    res.end("Not Found");
  }
}

const server = http.createServer((req, res) => {
  const parsed = require("url").parse(req.url);
  serve(parsed.pathname, res);
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`
  ┌─────────────────────────────────────────┐
  │   岚图薪资分析工具 v1.0                  │
  │                                         │
  │   打开浏览器访问:                        │
  │   http://127.0.0.1:${PORT}                  │
  │                                         │
  │   按 Ctrl+C 停止服务                     │
  └─────────────────────────────────────────┘
  `);

  const cmd = process.platform === "win32"
    ? `start http://127.0.0.1:${PORT}`
    : `open http://127.0.0.1:${PORT}`;
  exec(cmd);
});
