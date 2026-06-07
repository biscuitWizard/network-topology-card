import esbuild from "esbuild";

const watch = process.argv.includes("--watch");
const serve = process.argv.includes("--serve");

/** @type {import('esbuild').BuildOptions} */
const options = {
  entryPoints: ["src/network-topology-card.ts"],
  bundle: true,
  outfile: "dist/network-topology-card.js",
  format: "esm",
  target: "es2021",
  sourcemap: true,
  minify: !watch,
  legalComments: "none",
  loader: {
    ".svg": "text",
  },
};

if (serve) {
  // Dev mode: build the bundle into dev/ and serve the harness directory.
  const ctx = await esbuild.context({
    ...options,
    outfile: "dev/network-topology-card.js",
    minify: false,
  });
  await ctx.watch();
  const { host, port } = await ctx.serve({ servedir: "dev", host: "127.0.0.1", port: 8123 });
  console.log(`Dev harness serving at http://${host}:${port}/`);
} else if (watch) {
  const ctx = await esbuild.context(options);
  await ctx.watch();
  console.log("Watching for changes...");
} else {
  await esbuild.build(options);
  console.log("Built dist/network-topology-card.js");
}
