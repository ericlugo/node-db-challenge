# Generated Using [DBDiagrams](https://dbdiagram.io/)

```SQL
CREATE TABLE `projects`
(
  `project_id` int PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `description` varchar(255),
  `completed` bool DEFAULT 0
);

CREATE TABLE `resources`
(
  `resource_id` int PRIMARY KEY,
  `name` varchar(255) UNIQUE NOT NULL,
  `description` varchar(255)
);

CREATE TABLE `tasks`
(
  `task_id` int PRIMARY KEY,
  `description` varchar(255) NOT NULL,
  `note` varchar(255),
  `completed` bool DEFAULT 0,
  `project_id` int NOT NULL COMMENT '
      [foreign key]
      ref = many-to-one'
);

CREATE TABLE `project_resource`
(
  `id` int PRIMARY KEY,
  `project_id` int NOT NULL,
  `resource_id` int NOT NULL
);

ALTER TABLE `tasks` ADD FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`);

ALTER TABLE `project_resource` ADD FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`);

ALTER TABLE `project_resource` ADD FOREIGN KEY (`resource_id`) REFERENCES `resources` (`resource_id`);
```