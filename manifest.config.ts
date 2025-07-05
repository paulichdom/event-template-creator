import { defineManifest } from "@crxjs/vite-plugin";
import pkg from "./package.json";

export default defineManifest({
  manifest_version: 3,
  name: pkg.name,
  version: pkg.version,
  permissions: ["sidePanel", "tabs"],
  icons: {
    48: "public/logo.png",
  },
  action: {
    default_title: "Click to open panel",
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
