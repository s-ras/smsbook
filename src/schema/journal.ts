import { sqliteTable, integer } from "drizzle-orm/sqlite-core";

import { commands } from "./commands";

export const journal = sqliteTable("journal", {
	id: integer("id").notNull().primaryKey({ autoIncrement: true }),
	command_id: integer("command_id")
		.notNull()
		.references(() => commands.id),
	timestamp: integer("timestamp", { mode: "timestamp" }).notNull(),
});

export type SelectJournal = typeof journal.$inferSelect;
export type InsertJournal = typeof journal.$inferInsert;
