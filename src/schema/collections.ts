import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const collections = sqliteTable("collections", {
	id: integer("id").notNull().primaryKey({ autoIncrement: true }),
	order: integer("order").notNull(),
	name: text("name").notNull().unique(),
	number: text("number").notNull().unique(),
	is_expanded: integer("is_expanded", { mode: "boolean" })
		.notNull()
		.default(true),
});

export type SelectCollection = typeof collections.$inferSelect;
export type InsertCollection = typeof collections.$inferInsert;
