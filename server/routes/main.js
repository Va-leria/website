const express = require('express');
const router = express.Router();


// Routes
router.get('', (req, res) => {
    const locals = {
        title: "Графикус"
    }

    res.render('index', { locals });
});

module.exports = router;