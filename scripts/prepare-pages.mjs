import { cp, copyFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";

const repoPath = "elizaveta-barvinok.ru";
const routes = [
  "projects/yugorsky",
  "projects/variable-residential"
];

const pageLocations = ["dist", join("dist", repoPath)];

for (const location of pageLocations) {
  for (const route of routes) {
    const destination = join(location, route, "index.html");
    await mkdir(dirname(destination), { recursive: true });
    await copyFile("dist/index.html", destination);
  }
}

// GitHub serves a custom domain at the artifact root and the github.io URL
// below /<repository>. Mirror assets there so one build supports both hosts.
await cp("dist/assets", join("dist", repoPath, "assets"), { recursive: true });
await copyFile("dist/index.html", join("dist", repoPath, "index.html"));

console.log(`Prepared both Pages URLs and ${routes.length} project routes.`);
