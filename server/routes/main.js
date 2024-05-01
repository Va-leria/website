const express = require('express');
const router = express.Router();
// const popup = require('popups');
var bodyParser = require('body-parser')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../../db')


var jsonParser = bodyParser.json()


// Routes
router.get('', (req, res) => {
    const locals = {
        title: "Графикус",
        styles: ["/css/reset.css", "/css/styles.css", "/css/header.css", "/css/footer.css" ]
    }

    res.render('index', { locals });
});

router.get('/rules', (req, res) => {
    const locals = {
        title: "Правила",
        styles: ["/css/reset.css", "/css/rules_styles.css", "/css/header.css", "/css/footer.css" ]
    }

    res.render('rules', { locals });
});

router.get('/vacancies', (req, res) => {
    const locals = {
        title: "Вакансии",
        styles: ["/css/reset.css", "/css/vacancies_styles.css", "/css/header.css", "/css/footer.css" ]
    }

    res.render('vacancies', { locals });
});

router.get('/lk', (req, res) => {
    const locals = {
        title: "Личный кабинет",
        styles: ["/css/reset.css", "/css/lk_styles.css", "/css/header.css", "/css/footer.css" ]
    }

    res.render('lk', { locals });
});

router.get('/learning', (req, res) => {
    const locals = {
        title: "Обучение",
        styles: ["/css/reset.css", "/css/learn_styles.css", "/css/header.css", "/css/footer.css" ]
    }

    res.render('learning', { locals });
});

router.get('/signin', (req, res) => {
    const locals = {
        title: "Вход",
        styles: ["/css/reset.css", "/css/vhod_styles.css"]
    }

    res.render('signin', { locals });
});

router.get('/registration', (req, res) => {
    const locals = {
        title: "Регистрация",
        styles: ["/css/reset.css", "/css/reg_styles.css"]
    }

    res.render('registration', { locals });
});

router.get('/signin_test', (req, res) => {
    const locals = {
        title: "Вход",
        styles: ["/css/reset.css", "/css/vhod_styles.css"]
    }

    res.render('signin_test', { locals });
});

router.post('/signin_test', jsonParser, async (req, res) => {
    var url = req.body;
    try {
        const users = await pool.query('SELECT * FROM users')
        console.log(users)
    } catch (err) {
        console.error(err)
    }
    
    console.log(Object.assign({}, ...[Object.entries(url)[0], Object.entries(url)[1]].map(([k, v]) => ({[k]: v}))))
    const token = jwt.sign({
        email: 'fvffs',
        userId: 5
     }, 'yourSecretKey', {
        expiresIn: '1h', // Token expiration time
     });

     // Set the token as an HTTP-only cookie
     res.cookie('token', token, {
        httpOnly: true
     });
    var x = 5
    if (x < 4) {
        res.redirect('/');
      } else {
        res.redirect('/');
        // popup.alert({
        //     content: 'Hello!'
        // });
      }
});

module.exports = router;