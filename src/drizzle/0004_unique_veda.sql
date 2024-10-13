PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_journal` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`command_id` integer NOT NULL,
	`timestamp` integer NOT NULL,
	FOREIGN KEY (`command_id`) REFERENCES `commands`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_journal`("id", "command_id", "timestamp") SELECT "id", "command_id", "timestamp" FROM `journal`;--> statement-breakpoint
DROP TABLE `journal`;--> statement-breakpoint
ALTER TABLE `__new_journal` RENAME TO `journal`;--> statement-breakpoint
PRAGMA foreign_keys=ON;