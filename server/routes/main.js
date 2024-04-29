const express = require('express');
const router = express.Router();


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
        // styles: ["/css/vacancies_styles.css"]

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

router.get('/signout', (req, res) => {
    const locals = {
        title: "Регистрация",
        styles: ["/css/reset.css", "/css/reg_styles.css"]
    }

    res.render('signin', { locals });
});

module.exports = router;