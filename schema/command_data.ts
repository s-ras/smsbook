import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 as uuid } from "uuid";

import { commands } from "./commands";
import { parameters } from "./parameters";

export const command_data = sqliteTable("command_data", {
	id: text("id")
		.notNull()
		.primaryKey()
		.$defaultFn(() => uuid()),
	command_id: text("command_id")
		.notNull()
		.references(() => commands.id),
	param_id: text("param_id").references(() => parameters.id),
	order: integer("order").notNull().unique(),
	data: text("data"),
});

export type SelectCommandData = typeof command_data.$inferSelect;

export type InsertCommandData = typeof command_data.$inferInsert;
