module.exports = {
  semi: false,
  singleQuote: true,
  trailingComma: 'none',
  printWidth: 100,
  jsxSingleQuote: true,
  useTabs: false,
  overrides: [
    {
      files: ['*.astro', '*.json', '*.md', '*.toml', '*.yml'],
      options: {
        useTabs: false
      }
    }
  ],
  endOfLine: 'lf',
  'editor.defaultFormatter': 'esbenp.prettier-vscode',
  '[*.astro]': {
    'editor.defaultFormatter': 'astro-build.astro-vscode'
  }
}
