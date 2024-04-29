const express = require('express');
const router = express.Router();


// Routes
router.get('', (req, res) => {
    const locals = {
        title: "Графикус",
        styles: ["/css/reset.css", "/css/styles.css"]
    }

    res.render('index', { locals });
});

module.exports = router;