CREATE TABLE tasks (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`completion_at` integer
);

INSERT INTO tasks (title, description)
VALUES ('Buy milk', 'Buy milk from the store'),
       ('Buy eggs', 'Buy eggs from the store'),
       ('Buy bread', 'Buy bread from the store');
