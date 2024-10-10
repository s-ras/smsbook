CREATE TABLE `collections` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`order` integer NOT NULL,
	`name` text NOT NULL,
	`number` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `collections_order_unique` ON `collections` (`order`);--> statement-breakpoint
CREATE UNIQUE INDEX `collections_name_unique` ON `collections` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `collections_number_unique` ON `collections` (`number`);--> statement-breakpoint
CREATE TABLE `command_data` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`command_id` integer NOT NULL,
	`param_id` integer,
	`order` integer NOT NULL,
	`data` text,
	FOREIGN KEY (`command_id`) REFERENCES `commands`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`param_id`) REFERENCES `parameters`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `command_data_order_unique` ON `command_data` (`order`);--> statement-breakpoint
CREATE TABLE `commands` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`collection_id` integer NOT NULL,
	FOREIGN KEY (`collection_id`) REFERENCES `collections`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `commands_name_unique` ON `commands` (`name`);--> statement-breakpoint
CREATE TABLE `journal` (
	`command_id` integer NOT NULL,
	`timestamp` integer NOT NULL,
	PRIMARY KEY(`command_id`, `timestamp`),
	FOREIGN KEY (`command_id`) REFERENCES `commands`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `parameters` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`label` text NOT NULL,
	`value` text NOT NULL,
	`collection_id` integer NOT NULL,
	FOREIGN KEY (`collection_id`) REFERENCES `collections`(`id`) ON UPDATE no action ON DELETE no action
);
