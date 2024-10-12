import { sqliteTable, integer, primaryKey } from "drizzle-orm/sqlite-core";

import { states } from "./states";

export const state_records = sqliteTable(
	"journal",
	{
		state_id: integer("state_id")
			.notNull()
			.references(() => states.id),
		timestamp: integer("timestamp", { mode: "timestamp" }).notNull(),
	},
	table => {
		return {
			pk: primaryKey({
				columns: [table.state_id, table.timestamp],
			}),
		};
	}
);

export type SelectStateRecords = typeof state_records.$inferSelect;
export type InsertStateRecords = typeof state_records.$inferInsert;
