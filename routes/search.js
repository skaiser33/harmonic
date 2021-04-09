const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
// const { and } = require('sequelize/types/lib/operators');
// const { and } = require('sequelize/types/lib/operators');
// const Op = Sequelize.Op;
const db = require('../models');


// router.get('/saved/:id', (req, res) => {
//   res.render("/")
// });

//GET MAIN SEARCH FORM
router.get('/', (req, res) => {
  db.instrument.findAll()
  .then((instruments) => {
    db.genre.findAll()
    .then((genres) => {
      db.collaboration.findAll()
      .then((collaborations) => {
        db.city.findAll()
        .then((cities) => {
          // DO I NEED THE USER?
          // db.user.findOne({    
          //   where: {id: currentUser.id},         
          // }).then((user) => {
          res.render('search/main', {user: req.user, instruments: instruments, genres: genres, cities: cities, collaborations: collaborations})
          // })
        })
      })
    })
  })
})

//POST TO MAIN SEARCH FORM TO MODIFY
router.post('/', (req, res) => {
  localStorage.setItem("name", "tony");
  res.redirect('/')

})


//GET INDEX OF SEARCH RESULTS
router.get('/index', async (req, res) => {
  try {

    function doesArrayInclude(arr, target){
      return arr.every(value => target.includes(value));
    }

    let filteredUsers = [], checkedGenres = [], checkedInstruments = [], checkedCollaborations = []
    
    let storedSearchObject = req.query
    let storedSearchString = Object.keys(req.query).map(key => key + '=' + req.query[key]).join('&');

    typeof (req.query.genreCheck) === "string" ? checkedGenres = [req.query.genreCheck] : checkedGenres = req.query.genreCheck

    typeof (req.query.collaborationCheck) === "string" ? checkedCollaborations = [req.query.collaborationCheck] : checkedCollaborations = req.query.collaborationCheck

    typeof (req.query.instrumentCheck) === "string" ? checkedInstruments = [req.query.instrumentCheck] : checkedInstruments = req.query.instrumentCheck
    
    foundUsers = await db.user.findAll({
      include: [db.instrument, db.collaboration, db.genre],

      where: {
        isBand: req.query.isBand,
        cityId: req.query.city
        // influences: (%___%): split(",")
      },
      order: [['name', 'ASC']]
    })

    foundUsers.forEach(foundUser => {    
      let genreMatch = true 
      let collaborationMatch = true 
      let instrumentMatch = true 
      let userInstruments, userGenres, userCollaborations

      userInstruments = foundUser.instruments.map(function(instrument){
        return instrument.name
      })

      if (foundUser.genres.length) {
        userGenres = foundUser.genres.map(function(genre){
          return genre.name
        })
      } else {
        userGenres = ["Empty"]
      }

      if (foundUser.collaborations.length) {
        userCollaborations = foundUser.collaborations.map(function(collaboration){
          return collaboration.type
        })
      } else {
        userCollaborations = ["Empty"]
      }

      if (req.query.genreCheck){
        genreMatch = (doesArrayInclude(checkedGenres, userGenres))
      }  
      
      if (req.query.collaborationCheck){
        collaborationMatch = (doesArrayInclude(checkedCollaborations, userCollaborations)) 
      }

      instrumentMatch = doesArrayInclude(checkedInstruments, userInstruments)

      if (genreMatch && collaborationMatch && instrumentMatch){
        filteredUsers.push(foundUser)
      }
      
      // console.log("***************userGenres", userGenres);
      // console.log("***************checkedGenres", checkedGenres);
      // console.log("***************genreMatch", genreMatch);
      // console.log("***************userCollaborations", userCollaborations);
      // console.log("***************checkedCollaborations", checkedCollaborations);
      // console.log("***************collaborationMatch", collaborationMatch);
      // console.log("***************userInstruments", userInstruments);
      // console.log("***************checkedInstruments", checkedInstruments);
      // console.log("***************instrumentMatch", instrumentMatch);
    })  
    // console.log("***************filteredusers", filteredUsers);
    console.log("***************query", req.query);
    res.render('search/index', {users: filteredUsers, storedSearchString: storedSearchString, storedSearchObject: storedSearchObject} )
    // res.render('search/index', {users: filteredUsers})
  } catch (error) {
    req.flash('error', error.message)
    res.redirect(`/search`)
  }
})


//GET SAVED SEARCHES FOR USER
router.get('/saved/:id', async (req, res) => {
  try {
    const foundSearches = await db.search.findAll({
      where: { userId: req.params.id },       
        // include: [
        //     { model: db.user,
        //        as: 'sender',
        //     // where: { recipientId: req.params.id },
        //     },
        //   ],
          order: [['createdAt', 'DESC']]
      })
      res.render('search/saved', {searches: foundSearches})
      // res.render('search/saved')

  } catch (error) {
      req.flash('error', error.message)
      res.redirect(`/`)
  }	 
});

//POST NEW SAVED SEARCH TO USER
router.post('/savesearch', async (req, res) => {
  try {
    const createdSearch = await db.search.create({
      userId: req.user.id, 
      name: "S.F.-based Band",
      content: req.body.storedSearchString
    })
    // TODO: Toggle Save Search Button if already saved
    console.log("******content", createdSearch.content);
    req.flash('success', 'Your search has been saved');
    res.redirect(`/search/index/?${createdSearch.content}`);
  } catch (error) {
      req.flash('error', error.message)
      res.redirect(`/`)
  }	 
});

module.exports = router;

{/* <script>
    let user = <%- JSON.stringify(user) %>;
    localStorage.setItem('info', JSON.stringify({'user': user}));
  </script> */}
