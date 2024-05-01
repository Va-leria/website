const express = require('express');
const expressLayout = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const pool = require('./db')

// import express from 'express';
// import expressLayout from 'express-ejs-layouts';

const app = express();

const PORT = 3030
const HOST = 'localhost'

app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');


app.use('/', require('./server/routes/main'));

app.listen(PORT, HOST, () => {
    console.log(`Сервер запущен: http://${HOST}:${PORT}`)
})