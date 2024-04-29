const express = require('express');
const expressLayout = require('express-ejs-layouts');

const app = express();

const PORT = 3030
const HOST = 'localhost'

app.use(express.static('static'));

// Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');


app.use('/', require('./server/routes/main'));

app.listen(PORT, HOST, () => {
    console.log(`Сервер запущен: http://${HOST}:${PORT}`)
})