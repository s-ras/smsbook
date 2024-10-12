import { sqliteTable, integer, primaryKey } from "drizzle-orm/sqlite-core";

import { commands } from "./commands";

export const journal = sqliteTable(
	"journal",
	{
		command_id: integer("state_id")
			.notNull()
			.references(() => commands.id),
		timestamp: integer("timestamp", { mode: "timestamp" }).notNull(),
	},
	table => {
		return {
			pk: primaryKey({
				columns: [table.command_id, table.timestamp],
			}),
		};
	}
);

export type SelectJournal = typeof journal.$inferSelect;
export type InsertJournal = typeof journal.$inferInsert;
