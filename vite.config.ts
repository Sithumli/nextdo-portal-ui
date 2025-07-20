import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env variables as is.
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
    server: {
      port: 5173, 
      open: true, 
      cors: true,
    },
    build: {
      sourcemap: true, 
      outDir: "dist", 
    },
    preview: {
      port: 4173,
      open: true,
    },
    optimizeDeps: {
      include: ["react", "react-dom"],
    },
  };
});
