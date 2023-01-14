export default {
  "semi": false,
  "singleQuote": true,
  "trailingComma": "none",
  printWidth: 100,
  jsxSingleQuote: true,
  useTabs: false,
  overrides: [
    {
      files: ["*.json", "~.md", "*.toml", "*.yml"],
      options: {
        useTabs: false
      }
    }
  ],
  endOfLine: "lf"
}