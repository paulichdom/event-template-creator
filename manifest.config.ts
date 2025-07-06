import { defineManifest } from "@crxjs/vite-plugin";
import pkg from "./package.json";

export default defineManifest({
  manifest_version: 3,
  name: pkg.name,
  version: pkg.version,
  permissions: ["sidePanel", "storage", "tabs"],
  icons: {
    48: "public/logo.png",
  },
  action: {
    default_title: "Open Event Templates",
  },
  background: {
    service_worker: "src/background/main.ts",
  },
  content_scripts: [
    {
      js: ["src/content/main.tsx"],
      matches: ["https://*/*"],
    },
  ],
});
