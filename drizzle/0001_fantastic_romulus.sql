CREATE TABLE `aggregator_logs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`lastRunAt` timestamp NOT NULL DEFAULT (now()),
	`status` enum('success','failed','partial') NOT NULL,
	`itemsCollected` int DEFAULT 0,
	`errorMessage` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `aggregator_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `ai_events` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`eventType` enum('conference','workshop','webinar','hackathon','meetup','summit') NOT NULL,
	`location` varchar(255),
	`startDate` timestamp NOT NULL,
	`endDate` timestamp,
	`url` varchar(500),
	`source` varchar(100) NOT NULL,
	`featured` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `ai_events_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `ai_grants` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`amount` varchar(100),
	`deadline` timestamp,
	`url` varchar(500),
	`source` varchar(100) NOT NULL,
	`featured` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `ai_grants_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `ai_resources` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`resourceType` enum('course','tutorial','book','dataset','tool','framework','library') NOT NULL,
	`url` varchar(500),
	`source` varchar(100) NOT NULL,
	`featured` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `ai_resources_id` PRIMARY KEY(`id`)
);
