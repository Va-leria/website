const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../../db');
// const kerning = require('../../static/js/kerning');


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
      req.userId = data.userId;
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

router.get('/vacancies', authorization, (req, res) => {
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
        const userProgress = await pool.query('SELECT * FROM user_task WHERE user_id = $1', [req.userId]);
        let index
        const dict_progress = {}
        for (index = 0; index < userProgress.rows.length; ++index) {
            dict_progress[userProgress.rows[index].task_id] = userProgress.rows[index].progress
        }
        const data = {
            login: req.userLogin,
            username: user.rows[0].username,
        }
        const progress = {
            designBasics: {
                kerningPractice: dict_progress['3'],
                compositionPractice: dict_progress['2'],
                colorCircle: dict_progress['4']
            },
            graphicDesign: {
                logoPractice: dict_progress['1'],
                fsPractice: dict_progress['5'],
                polygraphPractice: dict_progress['6'],
            },
            uiUxDesign: {
                uiUxIntroduction: dict_progress['7'],
                prototypePractice: dict_progress['8'],
                interfacePractice: dict_progress['9']
            }
        }
        res.render('lk', { locals, data, progress });
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

    res.render('kerning', { locals });
});

router.get('/lesson_color', (req, res) => {
    const locals = {
        title: "Урок по цветам",
        styles: ["/css/reset.css", "/css/lesson color.css", "/css/header.css", "/css/footer.css" ]
    }

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

router.post('/drag_comp', authorization, jsonParser, async  (req, res) => {
    const dragCompProgress = await pool.query('SELECT * FROM user_task WHERE user_id = $1 AND task_id = 2', [req.userId]);
    if (dragCompProgress.rows[0].progress < req.body.score) {
        await pool.query(
            'UPDATE user_task SET progress = $1 WHERE user_id = $2 AND task_id = 2',
            [req.body.score, req.userId]
        )
    }
});

router.get('/drag_comp', (req, res) => {
    const locals = {
        title: "Практика по уроку композиция",
        styles: ["/css/reset.css", "/css/drag_styles.css", "/css/header.css", "/css/footer.css" ]
    }

    res.render('drag_comp', { locals });
});

router.get('/drag_comp_2', (req, res) => {
    const locals = {
        title: "Практика по уроку композиция",
        styles: ["/css/reset.css", "/css/drag_styles.css", "/css/header.css", "/css/footer.css" ]
    }

    res.render('drag_comp_2', { locals });
});

router.get('/drag_comp_3', (req, res) => {
    const locals = {
        title: "Практика по уроку композиция",
        styles: ["/css/reset.css", "/css/drag_3.css", "/css/header.css", "/css/footer.css" ]
    }

    res.render('drag_comp_3', { locals });
});

router.get('/int_game', (req, res) => {
    const locals = {
        title: "Практика по видам интерфейсов",
        styles: ["/css/reset.css", "/css/int_game.css", "/css/header.css", "/css/footer.css" ]
    }

    res.render('int_game', { locals });
});

router.get('/int_game_2', (req, res) => {
    const locals = {
        title: "Практика по видам интерфейсов",
        styles: ["/css/reset.css", "/css/int_game.css", "/css/header.css", "/css/footer.css" ]
    }

    res.render('int_game_2', { locals });
});

router.post('/interface_practice', authorization, jsonParser, async  (req, res) => {
    const interfaceProgress = await pool.query('SELECT * FROM user_task WHERE user_id = $1 AND task_id = 9', [req.userId]);
    if (interfaceProgress.rows[0].progress < req.body.score) {
        await pool.query(
            'UPDATE user_task SET progress = $1 WHERE user_id = $2 AND task_id = 9',
            [req.body.score, req.userId]
        )
    }
});

router.get('/ui_ux', (req, res) => {
    const locals = {
        title: "Практика по введению в UI/UX дизайн",
        styles: ["/css/reset.css", "/css/drag_ui_ux.css", "/css/header.css", "/css/footer.css" ]
    }

    res.render('ui_ux', { locals });
});

router.get('/ui_ux_2', (req, res) => {
    const locals = {
        title: "Практика по введению в UI/UX дизайн",
        styles: ["/css/reset.css", "/css/drag_ui_ux_2.css", "/css/header.css", "/css/footer.css" ]
    }

    res.render('ui_ux_2', { locals });
});

router.get('/ui_ux_3', (req, res) => {
    const locals = {
        title: "Практика по введению в UI/UX дизайн",
        styles: ["/css/reset.css", "/css/drag_ui_ux_2.css", "/css/header.css", "/css/footer.css" ]
    }

    res.render('ui_ux_3', { locals });
});

router.post('/ui_ux', authorization, jsonParser, async  (req, res) => {
    const uiUxProgress = await pool.query('SELECT * FROM user_task WHERE user_id = $1 AND task_id = 7', [req.userId]);
    if (uiUxProgress.rows[0].progress < req.body.score) {
        await pool.query(
            'UPDATE user_task SET progress = $1 WHERE user_id = $2 AND task_id = 7',
            [req.body.score, req.userId]
        )
    }
});

router.get('/fs_practice', (req, res) => {
    const locals = {
        title: "Практика по фирменному стилю",
        styles: ["/css/reset.css", "/css/fonts.css", "/css/header.css", "/css/footer.css" ]
    }

    res.render('fs_practice', { locals });
});

router.post('/fs_practice', authorization, jsonParser, async (req, res) => {
    await pool.query(
        'UPDATE user_task SET progress = $1 WHERE user_id = $2 AND task_id = 5',
        [req.body.score, req.userId]
    )
});

router.get('/logo_practice', (req, res) => {
    const locals = {
        title: "Практика по шрифтам",
        styles: ["/css/reset.css", "/css/fonts.css", "/css/header.css", "/css/footer.css" ]
    }

    res.render('logo_practice', { locals });
});

router.get('/game_color', (req, res) => {
    const locals = {
        title: "Практика по цветовому кругу",
        styles: ["/css/reset.css", "/css/game_color.css", "/css/header.css", "/css/footer.css" ]
    }

    res.render('game_color', { locals });
});

router.post('/game_color', authorization, jsonParser, async  (req, res) => {
    const colorGameProgress = await pool.query('SELECT * FROM user_task WHERE user_id = $1 AND task_id = 4', [req.userId]);
    if (colorGameProgress.rows[0].progress < req.body.score+1) {
        await pool.query(
            'UPDATE user_task SET progress = $1 WHERE user_id = $2 AND task_id = 4',
            [req.body.score+1, req.userId]
        )
    }
});

router.get('/polygraph_practice', (req, res) => {
    const locals = {
        title: "Практика по уроку полиграфия",
        styles: ["/css/reset.css", "/css/fonts.css", "/css/header.css", "/css/footer.css" ]
    }

    res.render('polygraph_practice', { locals });
});

router.post('/polygraph_practice', authorization, jsonParser, async (req, res) => {
    await pool.query(
        'UPDATE user_task SET progress = $1 WHERE user_id = $2 AND task_id = 6',
        [req.body.score, req.userId]
    )
});

router.get('/test_prot', (req, res) => {
    const locals = {
        title: "Практика по уроку прототипирование",
        styles: ["/css/reset.css", "/css/fonts.css", "/css/header.css", "/css/footer.css" ]
    }

    res.render('test_prot', { locals });
});

router.post('/prototype_practice', authorization, jsonParser, async (req, res) => {
    await pool.query(
        'UPDATE user_task SET progress = $1 WHERE user_id = $2 AND task_id = 8',
        [req.body.score, req.userId]
    )
})

router.post('/logo_practice', authorization, jsonParser, async (req, res) => {
    await pool.query(
        'UPDATE user_task SET progress = $1 WHERE user_id = $2 AND task_id = 1',
        [req.body.score, req.userId]
    )
})
router.get('/kerning', (req, res) => {
    const locals = {
        title: "Практика по уроку композиция",
        styles: ["/css/reset.css", "/css/kerning.css", "/css/header.css", "/css/footer.css" ]
    }

    res.render('kerning', { locals });
});

router.post('/kerning', authorization, jsonParser, async  (req, res) => {
    const kerningProgress = await pool.query('SELECT * FROM user_task WHERE user_id = $1 AND task_id = 3', [req.userId]);
    if (kerningProgress.rows[0].progress < req.body.maxScore) {
        let score = req.body.currentIndex + 1
        if (kerningProgress.rows[0].progress < score) {
            await pool.query(
                'UPDATE user_task SET progress = $1 WHERE user_id = $2 AND task_id = 3',
                [score, req.userId]
            )
        }
    }
});

router.get('/learning', authorization,  (req, res) => {
    const locals = {
        title: "Обучение",
        styles: ["/css/reset.css", "/css/learn_styles.css", "/css/header.css", "/css/footer.css" ]
    }

    res.render('learning', { locals });
});

router.get('/signin', (req, res) => {
    const locals = {
        title: "Вход",
        styles: ["/css/reset.css", "/css/vhod_styles.css"],
        error: ""
    }
    res.render('signin', { locals });
});

router.post('/signin', jsonParser, async (req, res) => {
    const { login, password } = req.body
    const locals = {
        title: "Вход",
        styles: ["/css/reset.css", "/css/vhod_styles.css"],
        error: ""
    }
    try {
        const user = await pool.query('SELECT * FROM users WHERE login = $1', [login]);
        if (!user.rows.length) {
            locals.error = 'Invalid credentials'
            res.render('signin', locals)
            // return res.status(401).json( { message: 'Invalid credentials' } );
        } 
        else {
            const isPasswordValid = await bcrypt.compare(password, user.rows[0].hashed_password);
            
            if(!isPasswordValid) {
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

    const locals = {
        title: "Регистрация",
        styles: ["/css/reset.css", "/css/reg_styles.css"],
        error: ""
    }

    try {
        // Checking of the user's existence
        const user = await pool.query('SELECT * FROM users WHERE login = $1', [login]);
        if (user.rows.length) {
            locals.error = "User already exist. Please signin"
            res.render('login', locals)
        }
        else { 
            if (!username) {
                locals.error = "Поле 'Имя Фамилия' не может быть пустым"
                res.render('login', locals)
            }
            else if (!login) {
                locals.error = "Поле 'Логин' не может быть пустым"
                res.render('login', locals)
            }
            else if (!password) {
                locals.error = "Поле 'Пароль' не может быть пустым"
                res.render('login', locals)
            }
            else if (!email) {
                locals.error = "Поле 'Email' не может быть пустым"
                res.render('login', locals)
            }
            else {
                const newUser = await pool.query(
                    'INSERT INTO users (username, login, hashed_password, email) VALUES ($1, $2, $3, $4) RETURNING id',
                    [username, login, hashedPassword, email]
                )
                const tasks = await pool.query('SELECT * FROM tasks')
                let index
                for (index = 0; index < tasks.rows.length; ++index) {
                    await pool.query(
                        'INSERT INTO user_task (user_id, task_id) VALUES ($1, $2)',
                        [newUser.rows[0].id, tasks.rows[index].id]
                    )
                }
                const token = jwt.sign({login: login, userId: newUser.rows[0].id}, jwtSecret, {expiresIn: '1h'});
                res.cookie('access_token', token, {httpOnly: true});
                res.redirect('/')
            }
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