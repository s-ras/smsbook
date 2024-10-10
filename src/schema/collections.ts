import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const collections = sqliteTable("collections", {
	id: integer("id").notNull().primaryKey({ autoIncrement: true }),
	order: integer("order").notNull().unique(),
	name: text("name").notNull().unique(),
	number: text("number").notNull().unique(),
});

export type SelectCollection = typeof collections.$inferSelect;
export type InsertCollection = typeof collections.$inferInsert;
