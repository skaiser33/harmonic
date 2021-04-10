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
              //TODO INCLUDE INSTR/GENRE/COLLABf rom USER and FILTER OUT THOSE FROM THE FINDALLS, then RUN A SEPARATE FOREACH OF CHECKED BOXES in edit.ejs...this will be a lot of if statements
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


//POST EDIT PROFILE 
router.post('/edit/:id', async (req, res) => {
  try {
    let checkedInstruments = []
    let checkedCollaborations = []
    let checkedGenres = []

    const updatedUser = await db.user.update({
      isBand: req.body.isBand,
      name: req.body.name,       
      influences: req.body.influences.split(','), //[req.body.influences],
      recordingCredits: req.body.recordingCredits.split(','),
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

    // console.log("********", foundUser.isBand, foundUser.canRecordRemotely, "********")
    foundCity.addUser(foundUser)
    //accepts array as argument
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
// router.post('/profile/addphoto/:id', async (req, res) => {
//   try {
//     const photoFile = req.FILES.get('photo-file', None)

router.post('/addphoto/:id', function(req, res){
  if(req.files.image !== undefined){ // `image` is the field name from your form
      
    res.redirect(`/profile/${req.params.id}`); // success
  }else{
      res.send("error, no file chosen");
  }
});    


// def add_photo(request, profile_id):
//   photo_file = request.FILES.get('photo-file', None)
//   if photo_file:
//     s3 = boto3.client('s3')
//     key = uuid.uuid4().hex[:6] + photo_file.name[photo_file.name.rfind('.'):]
//     try:
//       s3.upload_fileobj(photo_file, BUCKET, key)
//       url = f"{S3_BASE_URL}/{BUCKET}/{key}"
//       photo = Photo(url=url, profile_id=profile_id)
//       photo.save()
//     except:
//       print('An error occurred uploading file to S3')
//   return redirect('profile')




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
      
      name: req.body.name,       
      influences: req.body.influences.split(','), //[req.body.influences],
      recordingCredits: req.body.recordingCredits.split(','),
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

    console.log("********checkedInstruments", checkedInstruments, "********")
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

//GET TESTIMONIAL FORM
router.get('/testimonial/:id', async (req, res) => {
  try {
    const foundUser = await db.user.findOne({    
      where: {id: req.params.id}
    })
    res.render('profile/testimonial', {user: foundUser})

  } catch (error) {
    // req.flash('error', error.message)
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
      console.log("*********", createdTestimonial);
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
          // where: { recipientId: req.params.id },
          },
        ],
        order: [['createdAt', 'DESC']]
    })

  const foundUser = await db.user.findOne({    
    where: {id: req.params.id},
    include: [db.city, db.instrument, db.genre, db.collaboration]
  })
    // console.log(user.collaborations);
    res.render('profile/profile', {user: foundUser, testimonials: foundTestimonials, dateFormat: dateFormat})

})

module.exports = router;
