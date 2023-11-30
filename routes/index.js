const express = require('express')
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

//Welcome Pge
router.get('/', forwardAuthenticated,(req, res) => res.render('Welcome'));


router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

module.exports = router;