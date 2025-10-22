ALTER TABLE `users` ADD `googleId` text(255);--> statement-breakpoint
CREATE UNIQUE INDEX `users_googleId_unique` ON `users` (`googleId`);--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `password`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `salt`;