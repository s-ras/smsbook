import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 as uuid } from "uuid";

import { collections } from "./collections";

export const commands = sqliteTable("collections", {
	id: text("id")
		.notNull()
		.primaryKey()
		.$defaultFn(() => uuid()),
	name: text("name").notNull().unique(),
	collection_id: text("collection_id")
		.notNull()
		.references(() => collections.id),
});

export type SelectCommands = typeof commands.$inferSelect;

export type InsertCommands = typeof commands.$inferInsert;
