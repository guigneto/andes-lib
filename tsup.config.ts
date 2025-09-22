/*
This configuration generates CommonJS and ES module builds,
As well as TypeScript declaration files.
*/ 

import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  clean: true,
  format: ["cjs", "esm"],
  dts: true,
});