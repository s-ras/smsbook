import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { collections } from "./collections";

export const parameters = sqliteTable("parameters", {
	id: integer("id").notNull().primaryKey({ autoIncrement: true }),
	label: text("label").notNull(),
	value: text("value").notNull(),
	collection_id: integer("collection_id")
		.notNull()
		.references(() => collections.id),
});

export type SelectParameters = typeof parameters.$inferSelect;
export type InsertParameters = typeof parameters.$inferInsert;
