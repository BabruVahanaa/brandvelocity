CREATE TABLE `contactSubmissions` (
	`id` varchar(64) NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`message` text NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `contactSubmissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `velocityQuotes` (
	`id` varchar(64) NOT NULL,
	`email` varchar(320) NOT NULL,
	`websiteType` varchar(100) NOT NULL,
	`pages` varchar(50) NOT NULL,
	`features` text NOT NULL,
	`design` varchar(100) NOT NULL,
	`content` varchar(100) NOT NULL,
	`packageTier` varchar(50) NOT NULL,
	`priceRange` varchar(50) NOT NULL,
	`timeline` varchar(100) NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `velocityQuotes_id` PRIMARY KEY(`id`)
);
