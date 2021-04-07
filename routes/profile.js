const express = require('express');
const router = express.Router();
const db = require('../models');

//get new profile form
router.get('/new/:id', (req, res) => {
  db.instrument.findAll()
  .then((instruments) => {
    db.genre.findAll()
    .then((genres) => {
      db.collaboration.findAll()
      .then((collaborations) => {
        db.city.findAll()
        .then((cities) => {
          db.user.findOne({    
            where: {id: req.user.id},         
          }).then((user) => {
          res.render('profile/new', {user: req.user, instruments: instruments, genres: genres, cities: cities, collaborations: collaborations})
          })
        })
      })
    })
  })
})

//post new profile form ASYNC AWAIT version
router.post('/new/:id', async (req, res) => {
  try {

    let checkedInstruments = []
    let checkedCollaborations = []
    let checkedGenres = []
    // let influenceList
    // let creditsList

    // if (req.body.influences) {
    //   influenceList = req.body.influences 
    // }

    // if (req.body.recordingCredits) {
    //   creditsList = req.body.recordingCredits 
    // }

    const updatedUser = await db.user.update({
      isBand: req.body.isBand,
      name: req.body.name,       
      influences: [req.body.influences],
      recordingCredits: [req.body.recordingCredits],
      canRecordRemotely: req.body.canRecordRemotely, 
      spotifyEmbedUrl: req.body.spotifyEmbedUrl,
      soundcloudEmbedUrl: req.body.soundcloudEmbedUrl,
      youtubeEmbedUrl: req.body.youtubeEmbedUrl,
      localDraw: req.body.localDraw,
      nationalDraw: req.body.nationalDraw,
    }, {
      where: { id: req.params.id }
      // [note: the ‘user’ argument does not return the user data, just the number of rows updated]
    })

    const foundCity = await db.city.findOne({
      where: {name: req.body.city}
    })

    const foundUser = await db.user.findOne({
      where: { id: req.params.id }
    })
    
    //CAN I REFACTOR THE FOLLOWING AS ONE FUNCTION and SUB IN?
    // adds each checked instrument from form to checkedInstruments array
    for (const instrument of req.body.instrumentCheck) {
      const checkedInstrument = await db.instrument.findOne({
        where: {name: instrument}
      })
      checkedInstruments.push(checkedInstrument)
    }

    // adds each checked collaboration from form to checkedcollaborations array
    for (const collaboration of req.body.collaborationCheck) {
      const checkedCollaboration = await db.collaboration.findOne({
        where: {type: collaboration}
      })
      checkedCollaborations.push(checkedCollaboration)
    }

    // adds each checked collaboration from form to checkedcollaborations array
    if (req.body.genreCheck) {
      for (const genre of req.body.genreCheck) {
        const checkedGenre = await db.genre.findOne({
          where: {name: genre}
        })
        checkedGenres.push(checkedGenre)
      }
    }

    console.log("********", foundUser.isBand, foundUser.canRecordRemotely, "********")
    foundCity.addUser(foundUser)
    //accepts array as argument
    foundUser.addInstruments(checkedInstruments)
    foundUser.addCollaborations(checkedCollaborations)
    foundUser.addGenres(checkedGenres)
    
    res.redirect('/')

  } catch (error) {
    req.flash('error', error.message)
    res.redirect(`/profile/new/${req.params.id}`)
  }	 
});

// //post new profile form .THEN
// router.post('/new/:id', (req, res) => {
//   db.user.update({
//     isBand: false, //TODO value from radio form?
//     name: req.body.name,       
//     influences: [req.body.influences],
//     recordingCredits: [req.body.recordingCredits],
//     canRecordRemotely: false, //TODO value from radio form?
//     spotifyEmbedUrl: req.body.spotifyEmbedUrl,
//     soundcloudEmbedUrl: req.body.soundcloudEmbedUrl,
//     youtubeEmbedUrl: req.body.youtubeEmbedUrl,
//     localDraw: req.body.localDraw,
//     nationalDraw: req.body.nationalDraw,
//     //TODO: associate instruments, genres, collaboration
//     //TODO value from radio form?
//   }, {
//     where: { id: req.params.id }
//     // [note: the ‘user’ argument does not return the user data, just the number of rows updated]
//   }).then(function(updated) {
//     db.city.findOne({
//       where: {name: req.body.city}
//   }).then(function(city) {
//     db.user.findOne({
//       where: { id: req.params.id }
//   }).then(function(user) {
//     city.addUser(user)
//     // console.log("********", user.cityId, "********");
//     res.redirect('/');
//   }).catch(error => {
//     // FLASH
//     req.flash('error', error.message);
//     res.redirect(`/profile/new/${req.params.id}`);
//     // res.redirect(`/profile/new/${user.id}`);
//   });
// });
// });
// });



//get profile by user id
router.get('/:id', (req, res) => {
  db.user.findOne({    
    where: {id: req.params.id},
    include: [db.city, db.instrument, db.genre, db.collaboration]
  }).then((user) => {
    // console.log(user.collaborations);
    res.render('profile/profile', {user: user})
  })
})

module.exports = router;
