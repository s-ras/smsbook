import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 as uuid } from "uuid";

import { collections } from "./collections";

export const parameters = sqliteTable("parameters", {
	id: text("id")
		.notNull()
		.primaryKey()
		.$defaultFn(() => uuid()),
	label: text("label").notNull(),
	value: text("value").notNull(),
	collection_id: text("collection_id")
		.notNull()
		.references(() => collections.id),
});

export type SelectParameters = typeof parameters.$inferSelect;
export type InsertParameters = typeof parameters.$inferInsert;
