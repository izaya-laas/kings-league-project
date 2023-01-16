module.exports = {
  "semi": false,
  "singleQuote": true,
  "trailingComma": "none",
  printWidth: 100,
	jsxSingleQuote: true,
  useTabs: false,
  overrides: [
    {
      files: ["*.json", "*.md", "*.toml", "*.yml", "*.astro"],
      options: {
        useTabs: false
      }
    }
  ],
  endOfLine: "lf",
	"editor.defaultFormatter": "esbenp.prettier-vscode",
	"[*.astro]": {
    "editor.defaultFormatter": "astro-build.astro-vscode"
  }
}