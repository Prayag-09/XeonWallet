/** @type {import("eslint").Linter.Config} */
module.exports = {
	// Ignore patterns ensure ESLint doesn't process certain directories unnecessarily
	ignorePatterns: ['apps/**', 'packages/**'],

	// Extends your shared ESLint configuration
	extends: ['@repo/eslint-config/library.js'],

	parser: '@typescript-eslint/parser', // Use TypeScript parser
	parserOptions: {
		// Enable parsing TypeScript projects
		project: './tsconfig.json', // Ensure this points to the root `tsconfig.json` file
		tsconfigRootDir: __dirname, // Resolve relative paths from the root directory
	},
};
