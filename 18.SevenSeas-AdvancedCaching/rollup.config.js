// @ts-check

const paths = [
  "pages/homePage",
  "pages/dicePage",
  "pages/treasurePage",
  "pages/common",
  "sw",
];

export default paths.map((path) => {
  const pathParts = path.split("/");
  const fileName = pathParts[pathParts.length - 1];
  return {
    input: `scripts/${path}.js`,
    output: {
      file: `public/${fileName}.js`,
      format: "iife",
    },
  };
});
