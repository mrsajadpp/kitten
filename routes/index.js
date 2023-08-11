var express = require('express');
var router = express.Router();

function ifLogIn (req, res, next) {
  if(req.session.user) {
    if(req.session.user.logged) {
      next();
    } else {
      res.redirect('/login')
    }
  } else {
    res.redirect('/login')
  }
}

function notLogIn (req, res, next) {
  if(req.session.user) {
    if(req.session.user.logged) {
      res.redirect('/')
    } else {
      next();
    }
  } else {
    next();
  }
}

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('home', { title: 'Kitten - Indian Social Media', page: 'home' });
});

router.get('/messages', (req, res, next) => {
  res.render('messages', { title: 'Messages - Kitten', page: 'messages' });
});

router.get('/notifications', (req, res, next) => {
  res.render('notifications', { title: 'Notifications - Kitten', page: 'notifications' });
})

router.get('/profile', ifLogIn, (req, res, next) => {
  res.render('profile', { title: req.session.user.username + ' - Kitten', page: 'user', user: req.session.user });
})

router.get('/login', notLogIn, (req, res, next) => {
  res.render('login', { title: 'Login - Kitten', page: 'nohead' })
})

router.get('/signup', notLogIn, (req, res, next) => {
  res.render('signup', { title: 'SignUp - Kitten', page: 'nohead' })
})

module.exports = router;
