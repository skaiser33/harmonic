const express = require('express');
const router = express.Router();
const passport = require('../config/ppConfig')
const db = require('../models');
const bcrypt = require('bcrypt')

router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

router.post('/signup', (req, res) => {
  db.user.findOrCreate({
    where: { email: req.body.email },
    defaults: {
      name: req.body.name,
      password: req.body.password,
      isBand: req.body.isBand,
      profilePhotoUrl: "https://i.imgur.com/OcnPNEf.jpg"
    }
  }).then(([user, created]) => {
    if (created) {
      // FLASH
      passport.authenticate('local', {
        successRedirect: `/profile/new/${user.id}`,
        successFlash: 'Account created and logged in'
      })(req, res);
    } else {
      // FLASH
      req.flash('error', 'Email already exists');
      res.redirect('/auth/signup');
    }
  }).catch(error => {
    // FLASH
    req.flash('error', error.message);
    res.redirect('/auth/signup');
  });
});

router.get('/login', (req, res) => {
  res.render('auth/login');
});

// FLASH
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  failureFlash: 'Invalid username and/or password',
  successFlash: 'You have logged in!',
}), 
(req, res) => {
  db.user.update({
    lastActive: new Date(), 
    where: {id: req.user.id}
  }).then((user) => {
    console.log('success');
  })
});

router.post('/changepw', function (req, res) {       
  const oldPassword = req.body.oldpassword;
  const updatedPassword = req.body.updatedpassword;
  if (bcrypt.compareSync(oldPassword, req.user.password)) {
    db.user.findOne({
      where: { id: req.user.id }
    }).then((user) => {
      let hash = bcrypt.hashSync(updatedPassword, 12);
      user.update({
        password: hash
      })
      req.flash('success','You have successfully updated your password!');
      res.redirect(`/profile/${req.user.id}`);
    })
  } else {
    req.flash('error','Update failed due to incorrect password.');
    res.redirect(`/profile/${req.user.id}`);
  };
});

router.get('/delete', (req, res) => {
  res.render('auth/delete')
});

router.post('/delete', function (req, res) {
  const userPassword = req.body.password;
  if (bcrypt.compareSync(userPassword, req.user.password)) {
    db.user.destroy({
      where: { id: req.user.id }
    }).then(function (db) {   
      req.logout();
      req.flash('success', 'You have deleted your account and logged out');
      res.redirect('/');
    });
  } else {
    req.flash('error','Delete unsuccessful due to incorrect password.');
    res.redirect('/');
  };
});

router.get('/logout', (req, res) => {
  // .logut() is added to the req object by passport
  req.logout();
  // FLASH
  req.flash('success', 'You have logged out');
  res.redirect('/');
});

module.exports = router;
