import { copyFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";

const routes = [
  "projects/yugorsky",
  "projects/variable-residential"
];

for (const route of routes) {
  const destination = join("dist", route, "index.html");
  await mkdir(dirname(destination), { recursive: true });
  await copyFile("dist/index.html", destination);
}

console.log(`Prepared ${routes.length} GitHub Pages project routes.`);
