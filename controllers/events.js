const router = require('express').Router();
const sequelize = require('../config/connection');

router.get('/', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/events');
        return;
    }

    res.render('events');
});

module.exports = router;
