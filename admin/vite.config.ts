import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  // Served at the root of its own subdomain (admin.heistbrokerage.com).
  // Override with VITE_BASE if hosting under a sub-path.
  base: process.env.VITE_BASE || "/",
  server: { port: 5173 },
});
