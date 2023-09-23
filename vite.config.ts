import { defineConfig } from "vite";

import { fileURLToPath } from "node:url";

const filesNeedToExclude = ["src/lcd1.svg"];

const filesPathToExclude = filesNeedToExclude.map((src) => {
  return fileURLToPath(new URL(src, import.meta.url));
});

export default defineConfig({
  base: "./",
});
