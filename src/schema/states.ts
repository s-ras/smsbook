import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { collections } from "./collections";

export const states = sqliteTable("states", {
	id: integer("id").notNull().primaryKey({ autoIncrement: true }),
	name: text("name").notNull(),
	color: text("color").notNull(),
	pattern: text("pattern").notNull(),
	collection_id: integer("collection_id")
		.notNull()
		.references(() => collections.id),
});

export type SelectStates = typeof states.$inferSelect;

export type InsertStates = typeof states.$inferInsert;
