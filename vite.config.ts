/// <reference types="vitest" />
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true, // < ==
  },
  plugins: [
    //checker({ typescript: true }),
    // You can also disable type checking when running testing with Vitest
    //!process.env.VITEST ? checker({ typescript: true }) : undefined,
  ],
});
