DROP TABLE IF EXISTS tasks;

CREATE TABLE tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  description TEXT,
  completion_datetime DATETIME
);

INSERT INTO tasks (title, description)
VALUES ('Buy milk', 'Buy milk from the store'),
       ('Buy eggs', 'Buy eggs from the store'),
       ('Buy bread', 'Buy bread from the store');
