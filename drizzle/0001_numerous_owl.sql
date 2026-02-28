CREATE TABLE `chat_messages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sessionId` varchar(64) NOT NULL,
	`role` enum('user','assistant') NOT NULL,
	`content` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `chat_messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `contact_submissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(50),
	`company` varchar(255),
	`service` varchar(100),
	`message` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `contact_submissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `documents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`category` enum('whitepaper','case_study','research','training','report','other') NOT NULL DEFAULT 'other',
	`fileUrl` text NOT NULL,
	`fileKey` varchar(500) NOT NULL,
	`fileName` varchar(255) NOT NULL,
	`fileSize` int,
	`mimeType` varchar(100),
	`isPublic` boolean NOT NULL DEFAULT true,
	`uploadedBy` varchar(64),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `documents_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `media_items` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`platform` enum('youtube','facebook','tiktok','vimeo','other') NOT NULL DEFAULT 'youtube',
	`embedUrl` text NOT NULL,
	`thumbnailUrl` text,
	`category` enum('podcast','tutorial','webinar','talk','other') NOT NULL DEFAULT 'other',
	`isPublished` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `media_items_id` PRIMARY KEY(`id`)
);
