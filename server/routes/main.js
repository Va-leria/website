const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../../db')

require('dotenv').config()
const jwtSecret = process.env.JWT_SECRET;

const jsonParser = bodyParser.json()

const authorization = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
      res.redirect('/signin');
    }
    try {
      const data = jwt.verify(token, jwtSecret);
      req.userId = data.id;
      req.userLogin = data.login;
      return next();
    } catch {
        res.redirect('/signin');
    }
  };


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

router.get('/lk', authorization, async (req, res) => {
    const locals = {
        title: "Личный кабинет",
        styles: ["/css/reset.css", "/css/lk_styles.css", "/css/header.css", "/css/footer.css" ]
    }
    try {
        const user = await pool.query('SELECT * FROM users WHERE login = $1', [req.userLogin]);
        console.log(user)
        const data = {
            login: req.userLogin,
            username: user.rows[0].username
        }
        res.render('lk', { locals, data });
    } catch (err) {
        console.log(err)
    }
});

router.get('/lesson1', (req, res) => {
    const locals = {
        title: "Урок1",
        styles: ["/css/reset.css", "/css/vacancies_styles.css", "/css/header.css", "/css/footer.css" ]
    }

    res.render('vacancies', { locals });
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

router.post('/signin', jsonParser, async (req, res) => {
    const { login, password } = req.body

    try {
        const user = await pool.query('SELECT * FROM users WHERE login = $1', [login]);
        if (!user.rows.length) {
            console.log('User does not exist')
            return res.status(401).json( { message: 'Invalid credentials' } );
        } 
        else {
            const isPasswordValid = await bcrypt.compare(password, user.rows[0].hashed_password);
            
            if(!isPasswordValid) {
                console.log('Invalid password')
                return res.status(401).json( { message: 'Invalid credentials' } );
            }
            else {
                const token = jwt.sign({login: user.rows[0].login, userId: user.rows[0].id}, jwtSecret, {expiresIn: '1h'});
                res.cookie('access_token', token, {httpOnly: true});
                res.redirect('/')
            }
        }    
    } catch (err) {
        console.error(err)
    }
});

router.get('/login', (req, res) => {
    const locals = {
        title: "Регистрация",
        styles: ["/css/reset.css", "/css/reg_styles.css"]
    }

    res.render('login', { locals });
});

router.post('/login', jsonParser, async (req, res) => {
    const { username, login, password, email } = req.body
    const salt = bcrypt.genSaltSync(5) 
    const hashedPassword = bcrypt.hashSync(password, salt)

    try {
        // Checking of the user's existence
        const user = await pool.query('SELECT * FROM users WHERE login = $1', [login]);
        if (user.rows.length) {
            console.log('User already exist')
            return res.status(401).json( { message: 'User already exist. Please signin' } );
        }
        else { 
            const newUser = await pool.query(
                'INSERT INTO users (username, login, hashed_password, email) VALUES ($1, $2, $3, $4) RETURNING id',
                [username, login, hashedPassword, email]
            )
            const token = jwt.sign({login: login, userId: newUser.rows[0].id}, jwtSecret, {expiresIn: '1h'});
            res.cookie('access_token', token, {httpOnly: true});
            res.redirect('/')
        }
        
    } catch (err) {
        console.error(err)
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie("access_token")
    res.redirect('/')
});

module.exports = router;