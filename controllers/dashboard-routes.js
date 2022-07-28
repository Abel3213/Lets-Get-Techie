const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, Vote } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
  console.log(req.session);
  console.log('======================');
  User.findOne({
    where: {
      // use the ID from the session
      id: req.session.user_id
    },
    attributes: [
      'id',
      'user_name',
      'email'
    ]
  })
    .then(dbUserData => {
      // serialize data before passing to template
      // const posts = dbPostData.map(post => post.get({ plain: true }));
      console.log(dbUserData);
      const user = dbUserData.get({ plain: true });
      res.render('dashboard', { user, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});



module.exports = router;