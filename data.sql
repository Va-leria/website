CREATE DATABASE graficus;

DROP TABLE user_task;
DROP TABLE users;
DROP TABLE tasks;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR (255),
    login VARCHAR (255) UNIQUE,
    hashed_password VARCHAR (255),
    email VARCHAR (255) UNIQUE
);


CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    task_name VARCHAR (255)
);

CREATE TABLE IF NOT EXISTS user_task (
    id        BIGSERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users,
    task_id   INTEGER NOT NULL REFERENCES tasks,
    progress INTEGER DEFAULT 0,
    UNIQUE (user_id, task_id)
);

INSERT INTO tasks (task_name) VALUES ('logo_practice');
INSERT INTO tasks (task_name) VALUES ('drag_comp');
INSERT INTO tasks (task_name) VALUES ('kerning');
INSERT INTO tasks (task_name) VALUES ('color');