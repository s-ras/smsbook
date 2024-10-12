import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { commands } from "./commands";
import { parameters } from "./parameters";

export const command_data = sqliteTable("command_data", {
	id: integer("id").notNull().primaryKey({ autoIncrement: true }),
	command_id: integer("state_id")
		.notNull()
		.references(() => commands.id),
	param_id: integer("param_id").references(() => parameters.id),
	order: integer("order").notNull(),
	data: text("data"),
});

export type SelectCommandData = typeof command_data.$inferSelect;

export type InsertCommandData = typeof command_data.$inferInsert;
