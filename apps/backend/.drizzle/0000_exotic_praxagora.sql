CREATE TABLE `records` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`ownerId` integer NOT NULL,
	`highscore` integer NOT NULL,
	`totalResets` integer NOT NULL,
	`totalClicks` integer NOT NULL,
	`average` real NOT NULL,
	`averageWeight` integer NOT NULL,
	`createdAt` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	`updatedAt` integer DEFAULT (strftime('%s', 'now')) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `records_ownerId_unique` ON `records` (`ownerId`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text(255) NOT NULL,
	`name` text(255),
	`password` text NOT NULL,
	`salt` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_name_unique` ON `users` (`name`);