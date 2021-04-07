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

    // req.body.instrumentCheck.forEach(function(instrument) {
    //   console.log("*********", instrument, "*********",);
    // })

    
    // let checkedInstruments = []
    //create array of checked instruments
    //create array of checked collaborations
    //create array of checked genres

    //checkedInstruments.forEach(function(instrument) {
      //db.instrument.findOne({
        // where: {name: instrument}
        // }).then(function(foundInstrument) 
        // foundUser.addInstrument(foundInstrument)
    let checkedInstruments = []

    const updatedUser = await db.user.update({
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
      //TODO: associate instruments, genres, collaboration
      //TODO value from radio form?
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
    

    //attempt with for of 
    for (const instrument of req.body.instrumentCheck) {
      const checkedInstrument = await db.instrument.findOne({
        where: {name: instrument}
      })
      checkedInstruments.push(checkedInstrument)
    }

    // req.body.instrumentCheck.forEach(async function(instrument) {
    //   let checkedInstrument = await db.instrument.findOne({
    //     where: {name: instrument}
    //   })
    //   console.log("*********", checkedInstrument, "*********",);
    //   checkedInstruments.push("yo")
    // })    

    // attempt with forEach and async await
    // req.body.instrumentCheck.forEach(async function(instrument) {
    //   let checkedInstrument = await db.instrument.findOne({
    //     where: {name: instrument}
    //   })
    //   console.log("*********", checkedInstrument, "*********",);
    //   checkedInstruments.push("yo")
    // // })    
    
    //attempting with forEach and .then
    // req.body.instrumentCheck.forEach(function(instrument) {
    //   db.instrument.findOne({
    //     where: {name: instrument}
    //   }).then(function(checkedInstrument) {
    //     checkedInstruments.push(checkedInstrument)
    //   })
    //   // console.log("*********", checkedInstrument, "*********",);
    //   // checkedInstruments.push("yo")
    // })    
    
    //attempt with map method
    // await Promise.all(req.body.instrumentCheck.map(async function(instrument) {
    //   let checkedInstruments = await db.instrument.findOne({
    //     where: {name: instrument}
    //   })
    //   
    // }))       
    
    
    

      // console.log("*********", instrument, "*********",);

    //accepts array as argument
    console.log("*********", checkedInstruments, "*********",);
    foundUser.addInstruments(checkedInstruments)
    foundCity.addUser(foundUser)
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
