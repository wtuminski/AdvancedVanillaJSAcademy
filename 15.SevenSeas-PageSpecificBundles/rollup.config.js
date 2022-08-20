const pages = ["home", "dice", "treasure"];

export default pages.map((page) => ({
  input: `scripts/pages/${page}Page.js`,
  output: {
    file: `public/${page}Page.js`,
    format: "iife",
  },
}));
