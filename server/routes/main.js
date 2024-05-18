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

router.get('/lesson2', (req, res) => {
    const locals = {
        title: "Урок по цветам",
        styles: ["/css/test_game.css", "/css/reset.css", "/css/header.css", "/css/footer.css" ]
    }
    // res.send(Alert);
    // window.location.reload();

    res.render('test_game2', { locals });
});

router.get('/lesson_color', (req, res) => {
    const locals = {
        title: "Урок по цветам",
        styles: ["/css/reset.css", "/css/lesson color.css", "/css/header.css", "/css/footer.css" ]
    }
    // res.send(Alert);
    // window.location.reload();

    res.render('lesson_color', { locals });
});

router.get('/lesson_comp', (req, res) => {
    const locals = {
        title: "Урок по композиции",
        styles: ["/css/reset.css", "/css/lesson comp.css", "/css/header.css", "/css/footer.css" ]
    }

    res.render('lesson_comp', { locals });
});

router.get('/lesson_font', (req, res) => {
    const locals = {
        title: "Урок по шрифтам",
        styles: ["/css/reset.css", "/css/lesson font.css", "/css/header.css", "/css/footer.css" ]
    }

    res.render('lesson_font', { locals });
});

router.get('/lesson_fs', (req, res) => {
    const locals = {
        title: "Урок по фирменному стилю",
        styles: ["/css/reset.css", "/css/lesson fs.css", "/css/header.css", "/css/footer.css" ]
    }

    res.render('lesson_fs', { locals });
});

router.get('/lesson_int', (req, res) => {
    const locals = {
        title: "Урок по видам интерфейсов",
        styles: ["/css/reset.css", "/css/lesson int.css", "/css/header.css", "/css/footer.css" ]
    }

    res.render('lesson_int', { locals });
});

router.get('/lesson_logo', (req, res) => {
    const locals = {
        title: "Урок по логотипам",
        styles: ["/css/reset.css", "/css/lesson logo.css", "/css/header.css", "/css/footer.css" ]
    }

    res.render('lesson_logo', { locals });
});

router.get('/lesson_pol', (req, res) => {
    const locals = {
        title: "Урок по полиграфии",
        styles: ["/css/reset.css", "/css/lesson pol.css", "/css/header.css", "/css/footer.css" ]
    }

    res.render('lesson_pol', { locals });
});

router.get('/lesson_prototype', (req, res) => {
    const locals = {
        title: "Прототипирование",
        styles: ["/css/reset.css", "/css/lesson prototype.css", "/css/header.css", "/css/footer.css" ]
    }

    res.render('lesson_prototype', { locals });
});

router.get('/lesson_ui_ux', (req, res) => {
    const locals = {
        title: "Введение в UI/UX дизайн",
        styles: ["/css/reset.css", "/css/lesson ui_ux.css", "/css/header.css", "/css/footer.css" ]
    }

    res.render('lesson_ui_ux', { locals });
});

router.get('/drag_comp', (req, res) => {
    const locals = {
        title: "Практика по уроку композиция",
        styles: ["/css/reset.css", "/css/drag_styles.css", "/css/header.css", "/css/footer.css" ]
    }

    res.render('drag_comp', { locals });
});

router.get('/test_fonts', (req, res) => {
    const locals = {
        title: "Практика по шрифтам",
        styles: ["/css/reset.css", "/css/test_fonts.css", "/css/header.css", "/css/footer.css" ]
    }

    res.render('test_fonts', { locals });
});

router.get('/learning', authorization,  (req, res) => {
    const locals = {
        title: "Обучение",
        styles: ["/css/reset.css", "/css/learn_styles.css", "/css/header.css", "/css/footer.css" ]
    }

    res.render('learning', { locals });
});

router.get('/signin', async (req, res) => {
    const locals = {
        title: "Вход",
        styles: ["/css/reset.css", "/css/vhod_styles.css"],
        error: ""
    }
    const test = await pool.query('SELECT * FROM users');
            console.log(test)
    res.render('signin', { locals });
});

router.post('/signin', jsonParser, async (req, res) => {
    const { login, password } = req.body
    console.log(login)
    console.log(password)
    try {
        const test = await pool.query('SELECT * FROM users');
        console.log(test)
        const user = await pool.query('SELECT * FROM users WHERE login = $1', [login]);
        console.log(user)
        if (!user.rows.length) {
            console.log('User does not exist')
            locals.error = 'Invalid credentials'
            res.render('signin', locals)
            // return res.status(401).json( { message: 'Invalid credentials' } );
        } 
        else {
            const isPasswordValid = await bcrypt.compare(password, user.rows[0].hashed_password);
            
            if(!isPasswordValid) {
                console.log('Invalid password')
                locals.error = 'Invalid credentials'
                res.render('signin', locals)
                // return res.status(401).json( { message: 'Invalid credentials' } );
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