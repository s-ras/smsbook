/** @type {import('drizzle-kit').Config} */
module.exports = {
	schema: ["./schema/*.ts"],
	out: "./drizzle",
	driver: "expo",
	dialect: "sqlite",
};
