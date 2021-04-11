const express = require('express');
const router = express.Router();
const db = require('../models');
const dateFormat = require('dateformat');


//GET FAVORITES/STARRED PROFILES
router.get('/starred', async (req, res) => {
  try { 
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

    res.render('profile/starred', {users: starredUsers})
  } catch (error) {
    req.flash('error', error.message)
    res.redirect(`/`)
  }	 
});


//POST NEW FAVORITE/STAR
router.post('/addstar/:id', async (req, res) => {
  try {
    const createdStar = await db.favorites.create({
      favoritedId: req.params.id, 
      favoriterId: req.user.id,  //or currentUser.id?
    })
    res.redirect(`/profile/${req.params.id}`)
  } catch (error) {
    req.flash('error', error.message)
    res.redirect(`/profile/${req.params.id}`)
  }	 
});


//GET EDIT PROFILE FORM
router.get('/edit/:id', async (req, res) => {
  try {
    const instruments = await db.instrument.findAll()
    const genres = await db.genre.findAll()
    const collaborations = await db.collaboration.findAll()
    const cities = await db.city.findAll()
    const user = await db.user.findOne({    
      where: {id: req.user.id},
        include: [db.instrument, db.collaboration, db.genre],               
    }) 
    const userCity = await db.city.findOne({
      where: {id: user.cityId}
    })
    res.render(`profile/edit`, {user: req.user, instruments: instruments, genres: genres, cities: cities, collaborations: collaborations, userCity: userCity})
  } catch (error) {
    req.flash('error', error.message)
    res.redirect(`/profile/edit/${req.params.id}`)
  }	 
});


//POST EDIT PROFILE (to be refactored)
router.post('/edit/:id', async (req, res) => {
  try {
    let checkedInstruments = []
    let checkedCollaborations = []
    let checkedGenres = []

    const updatedUser = await db.user.update({
      isBand: req.body.isBand,
      name: req.body.name,       
      influences: req.body.influences.split(','), 
      recordingCredits: req.body.recordingCredits.split(','),
      spotifyEmbedUrl: req.body.spotifyEmbedUrl,
      soundcloudEmbedUrl: req.body.soundcloudEmbedUrl,
      youtubeEmbedUrl: req.body.youtubeEmbedUrl,
      localDraw: req.body.localDraw,
      nationalDraw: req.body.nationalDraw,
    }, {
      where: { id: req.params.id }
    })

    const foundCity = await db.city.findOne({
      where: {name: req.body.city}
    })

    const foundUser = await db.user.findOne({
      where: { id: req.params.id }
    })
      
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

    foundCity.addUser(foundUser)
    foundUser.addInstruments(checkedInstruments)
    foundUser.addCollaborations(checkedCollaborations)
    foundUser.addGenres(checkedGenres)
    
    req.flash('success', "Profile updated!")
    res.redirect(`/profile/${req.params.id}`)
  } catch (error) {
    // req.flash('error', error.message)
    req.flash('error', "PLEASE COMPLETE ALL REQUIRED FIELDS.")
    res.redirect(`/profile/edit/${req.params.id}`)
  }	 
});


// POST PROFILE PHOTO UPDATE
router.post('/addphoto/:id', function(req, res){
  if(req.files.image !== undefined){ // `image` is the field name from your form
      
    res.redirect(`/profile/${req.params.id}`); // success
  }else{
      res.send("error, no file chosen");
  }
});    


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
            where: {id: req.user.id}              
          }).then((user) => {
          res.render('profile/new', {user: req.user, instruments: instruments, genres: genres, cities: cities, collaborations: collaborations})
          })
        })
      })
    })
  })
})

//POST NEW PROFILE (to be refactored)
router.post('/new/:id', async (req, res) => {
  try {
    let checkedInstruments = []
    let checkedCollaborations = []
    let checkedGenres = []

    const updatedUser = await db.user.update({     
      name: req.body.name,       
      influences: req.body.influences.split(','), 
      recordingCredits: req.body.recordingCredits.split(','),
      spotifyEmbedUrl: req.body.spotifyEmbedUrl,
      soundcloudEmbedUrl: req.body.soundcloudEmbedUrl,
      youtubeEmbedUrl: req.body.youtubeEmbedUrl,
      localDraw: req.body.localDraw,
      nationalDraw: req.body.nationalDraw,
    }, {
      where: { id: req.params.id }
    })

    const foundCity = await db.city.findOne({
      where: {name: req.body.city}
    })

    const foundUser = await db.user.findOne({
      where: { id: req.params.id }
    })
     
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

    foundCity.addUser(foundUser)
    foundUser.addInstruments(checkedInstruments)
    foundUser.addCollaborations(checkedCollaborations)
    foundUser.addGenres(checkedGenres)
    res.redirect('/')

  } catch (error) {
    req.flash('error', error.message)
    res.redirect(`/profile/new/${req.params.id}`)
  }	 
});


//GET TESTIMONIAL FORM
router.get('/testimonial/:id', async (req, res) => {
  try {
    const foundUser = await db.user.findOne({    
      where: {id: req.params.id}
    })
    res.render('profile/testimonial', {user: foundUser})
  } catch (error) {
    req.flash('error', "PLEASE COMPLETE ALL REQUIRED FIELDS.")
    res.redirect(`/profile/${req.params.id}`)
  }	 
});

//POST NEW TESTIMONIAL
router.post('/testimonial/:id', async (req, res) => {
  try {
    const createdTestimonial = await db.testimonial.create({
      recipientId: req.params.id, 
      senderId: req.user.id,  //or currentUser.id?
      content: req.body.content
    })
    res.redirect(`/profile/${req.params.id}`)
  } catch (error) {
    req.flash('error', error.testimonial)
    res.redirect(`/profile/${req.params.id}`)
  }	 
});


//GET PROFILE BY USER ID
router.get('/:id', async (req, res) => {
  const foundTestimonials = await db.testimonial.findAll({
    where: { recipientId: req.params.id }, 
      include: [
        { model: db.user,
            as: 'sender',
        },
      ],
    order: [['createdAt', 'DESC']]
  })
  const foundUser = await db.user.findOne({    
    where: {id: req.params.id},
    include: [db.city, db.instrument, db.genre, db.collaboration]
  })
  res.render('profile/profile', {user: foundUser, testimonials: foundTestimonials, dateFormat: dateFormat})
})

module.exports = router;
