CREATE DATABASE graficus;

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