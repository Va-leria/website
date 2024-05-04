CREATE DATABASE graficus;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR (255),
    login VARCHAR (255) UNIQUE,
    hashed_password VARCHAR (255),
    email VARCHAR (255) UNIQUE
);