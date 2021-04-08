const express = require('express');
const router = express.Router();
const db = require('../models');


//GET FAVORITES/STARRED PROFILES
router.get('/starred', async (req, res) => {
  try {
        // const starredUsers = await db.user.findAll({    
    //   include: [
    //     { model: db.favorites,
    //       as: 'favoriter',  
    //     }],  
    //   order: [['name', 'ASC']]
    // }) 
    let starredUsers = []
    const foundFavorites = await db.favorites.findAll({
      where: {favoriterId: req.user.id},
    })

    for (const favorite of foundFavorites) {
      const starredUser = await db.user.findOne({
        where: {id: favorite.favoritedId}
      })
      starredUsers.push(starredUser)
    }

      console.log(starredUsers);
      res.render('profile/starred', {users: starredUsers})
  } catch (error) {
    req.flash('error', error.message)
    res.redirect(`/`)
  }	 
});


//POST NEW FAVORITE/STAR
router.post('/addstar/:id', async (req, res) => {
  try {
    // const starredUser = await db.user.findByPk(req.params.id)
    const createdStar = await db.favorites.create({
      favoritedId: req.params.id, 
      favoriterId: req.user.id,  //or currentUser.id?
    })
    console.log("*********", createdStar);
    res.redirect(`/profile/${req.params.id}`)
  } catch (error) {
    req.flash('error', error.message)
    res.redirect(`/profile/${req.params.id}`)
  }	 
});

// router.post('/remove/:id', async (req, res) => {
//   try {
//     const foundJoke = await db.joke.findByPk(req.params.id)
//     foundJoke.likes = foundJoke.likes - 1
//     foundJoke.save()  
//     const foundUser = await db.user.findByPk(req.user.id)
//     foundUser.removeJoke(foundJoke)
//     res.redirect(`/comedian?comedian=${query.comedian}`) 
//   } catch (error) {
//     req.flash('error', error.message)
//     res.redirect(`/comedian?comedian=${query.comedian}`)
//   }	 
// });


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
    
    //CAN I REFACTOR THE FOLLOWING AS ONE FUNCTION and SUB IN? [USING VERY SIMILAR IN SEARCH]
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
