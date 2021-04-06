const express = require('express');
const router = express.Router();
const db = require('../models');

//get new profile form
router.get('/new/:id', (req, res) => {
  db.instrument.findAll()
  .then((instruments) => {
    db.genre.findAll()
    .then((genres) => {
      db.city.findAll()
      .then((cities) => {
        db.user.findOne({    
          where: {id: req.user.id},         
        }).then((user) => {
        res.render('profile/new', {user: req.user, instruments: instruments, genres: genres, cities: cities})
        })
      })
    })
  })
})

//post new profile form
router.post('/new/:id', (req, res) => {
  db.user.update({
    isBand: false, //TODO value from radio form?
    name: req.body.name,       
    influences: [req.body.influences],
    recordingCredits: [req.body.recordingCredits],
    canRecordRemotely: false, //TODO value from radio form?
    spotifyEmbedUrl: req.body.spotifyEmbedUrl,
    soundcloudEmbedUrl: req.body.soundcloudEmbedUrl,
    youtubeEmbedUrl: req.body.youtubeEmbedUrl,
    localDraw: req.body.localDraw,
    nationalDraw: req.body.nationalDraw,
    //TODO: associate city, instruments, genres, collaboration
  }, {
    where: { id: req.params.id }
    // [note: the ‘user’ argument does not return the user data, just the number of rows updated]
  }).then(function(user) {
    console.log("********", user, "********");
    res.redirect('/');
  }).catch(error => {
    // FLASH
    req.flash('error', error.message);
    res.redirect(`/profile/new/${req.params.id}`);
    // res.redirect(`/profile/new/${user.id}`);
  });
});

//get new profile form
router.get('/:id', (req, res) => {
  db.user.findOne({    
    where: {id: req.params.id},
    include: [db.city, db.instrument, db.genre, db.collaboration]
  }).then((user) => {
    // console.log(user.instruments[0].name);
    res.render('profile/profile', {user: user})
  })
})

module.exports = router;
