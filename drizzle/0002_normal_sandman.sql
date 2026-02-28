CREATE TABLE `blogPosts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`excerpt` text,
	`content` text NOT NULL,
	`category` varchar(100) NOT NULL,
	`author` varchar(255) NOT NULL,
	`imageUrl` text,
	`published` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `blogPosts_id` PRIMARY KEY(`id`),
	CONSTRAINT `blogPosts_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `caseStudies` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`industry` varchar(100) NOT NULL,
	`challenge` text NOT NULL,
	`solution` text NOT NULL,
	`results` text NOT NULL,
	`imageUrl` text,
	`clientName` varchar(255),
	`published` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `caseStudies_id` PRIMARY KEY(`id`),
	CONSTRAINT `caseStudies_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `testimonials` (
	`id` int AUTO_INCREMENT NOT NULL,
	`clientName` varchar(255) NOT NULL,
	`clientTitle` varchar(255),
	`company` varchar(255),
	`content` text NOT NULL,
	`rating` int NOT NULL DEFAULT 5,
	`imageUrl` text,
	`published` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `testimonials_id` PRIMARY KEY(`id`)
);
