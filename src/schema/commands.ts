import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { collections } from "./collections";

export const commands = sqliteTable("commands", {
	id: integer("id").notNull().primaryKey({ autoIncrement: true }),
	name: text("name").notNull().unique(),
	collection_id: integer("collection_id")
		.notNull()
		.references(() => collections.id),
});

export type SelectCommands = typeof commands.$inferSelect;

export type InsertCommands = typeof commands.$inferInsert;
