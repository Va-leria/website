const express = require('express');
const expressLayout = require('express-ejs-layouts');
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const pool = require('./db')

const app = express();

const PORT = 3030
const HOST = 'localhost'

app.use(express.static('static')); // подключает статику

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main'); // вызывает главный шаблон
app.set('view engine', 'ejs');


app.use('/', require('./server/routes/main')); // подключаем файл для урлов 

app.listen(PORT, HOST, () => {
    console.log(`Сервер запущен: http://${HOST}:${PORT}`)
})