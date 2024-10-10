import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { v4 as uuid } from "uuid";

export const collections = sqliteTable("collections", {
	id: text("id")
		.notNull()
		.primaryKey()
		.$defaultFn(() => uuid()),
	order: integer("order").notNull().unique(),
	name: text("name").notNull().unique(),
	number: text("number").notNull().unique(),
});

export type SelectCollection = typeof collections.$inferSelect;
export type InsertCollection = typeof collections.$inferInsert;
