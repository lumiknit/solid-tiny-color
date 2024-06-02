import withSolid from "rollup-preset-solid";
import terser from "@rollup/plugin-terser";
import { visualizer } from "rollup-plugin-visualizer";

export default withSolid({
  targets: ["esm", "cjs"],
  plugins: [
		terser(),
		visualizer(),
	],
  input: 'src/index.ts'
});
