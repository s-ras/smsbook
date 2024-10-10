/** @type {import("prettier").Config} */
const config = {
	printWidth: 80,
	proseWrap: "always",
	tabWidth: 4,
	useTabs: true,
	trailingComma: "es5",
	bracketSpacing: true,
	semi: true,
	quoteProps: "consistent",
	bracketSameLine: false,
	arrowParens: "avoid",
	parser: "typescript",
	singleAttributePerLine: true,
	htmlWhitespaceSensitivity: "strict",
	overrides: [
		{
			files: "*.html",
			options: {
				parser: "html",
			},
		},
	],
};

module.exports = config;
