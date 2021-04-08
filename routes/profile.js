const express = require('express');
const router = express.Router();
const db = require('../models');

//GET NEW PROFILE FORM
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

//POST NEW PROFILE 
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

//GET NEW MESSAGE FORM
router.get('/messages/new/:id', async (req, res) => {
  try {
    const foundUser = await db.user.findOne({    
      where: {id: req.params.id}
    })
    res.render('profile/newmessage', {user: foundUser})

  } catch (error) {
    req.flash('error', error.message)
    res.redirect(`/profile/${req.params.id}`)
  }	 
});


//POST NEW MESSAGE
router.post('/messages/new/:id', async (req, res) => {
  try {


    const createdMessage = await db.message.create({
      recipientId: req.params.id, 
      senderId: req.user.id,  //or currentUser.id?
      content: req.body.content
      })
      console.log("*********", createdMessage);
      // res.render('profile/messages', {user: foundUser}, {messages: foundMessages})
      res.redirect(`/profile/${req.params.id}`)

  } catch (error) {
      req.flash('error', error.message)
      res.redirect(`/profile/${req.params.id}`)
  }	 
});



//GET USER MESSAGES
//TODO: order by createdAt
router.get('/messages/:id', async (req, res) => {
  try {
    // const foundUser = await db.user.findOne({    
    //   where: {id: req.params.id},
    //   // include: [
    //   //   { model: db.message,
    //   //   // where: { recipientId: req.params.id },
    //   //   },
    //   // ]
    // })

    const foundMessages = await db.message.findAll({
      where: { recipientId: req.params.id }, 
        include: [
            { model: db.user,
               as: 'sender',
            // where: { recipientId: req.params.id },
            },
          ]
      })
      // console.log("*********",foundMessages[0].sender);
      // res.render('profile/messages', {user: foundUser}, {messages: foundMessages})
      res.render('profile/messages', {messages: foundMessages})

  } catch (error) {
      req.flash('error', error.message)
      res.redirect(`/profile/${req.params.id}`)
  }	 
});


//GET PROFILE BY USER ID
router.get('/:id', (req, res) => {
  db.user.findOne({    
    where: {id: req.params.id},
    include: [db.city, db.instrument, db.genre, db.collaboration]
  }).then((foundUser) => {
    // console.log(user.collaborations);
    res.render('profile/profile', {user: foundUser})
  })
})

module.exports = router;
