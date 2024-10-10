/** @type {import('drizzle-kit').Config} */
module.exports = {
	schema: ["./src/schema/*.ts"],
	out: "./src/drizzle",
	driver: "expo",
	dialect: "sqlite",
};
