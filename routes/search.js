const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
// const { and } = require('sequelize/types/lib/operators');
// const Op = Sequelize.Op;
const db = require('../models');

// function arrayEquals(a, b) {
//   return Array.isArray(a) &&
//     Array.isArray(b) &&
//     a.length === b.length &&
//     a.every((val, index) => val === b[index]);
// }


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


//GET INDEX OF SEARCH RESULTS
router.get('/index', async (req, res) => {
  try {

    function doesArrayInclude(arr, target){
      return arr.every(value => target.includes(value));
    }

    let filteredUsers = [], checkedGenres = [], checkedInstruments = [], checkedCollaborations = []

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

    res.render('search/index', {users: filteredUsers})
  } catch (error) {
    req.flash('error', error.message)
    res.redirect(`/search`)
  }
})




module.exports = router;
