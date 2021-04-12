const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require('../models');
const dateFormat = require('dateformat');


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
          res.render('search/main', {user: req.user, instruments: instruments, genres: genres, cities: cities, collaborations: collaborations})
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


//GET INDEX OF SEARCH RESULTS (to be refactored)
router.get('/index', async (req, res) => {
  try {
    let filteredUsers = [], checkedGenres = [], checkedInstruments = [], checkedCollaborations = []    
    let storedSearchObject = req.query
    let storedSearchString = Object.keys(req.query).map(key => key + '=' + req.query[key]).join('&');

    function doesArrayInclude(arr, target){
      return arr.every(value => target.includes(value));
    }
    
    typeof (req.query.genreCheck) === "string" ? checkedGenres = [req.query.genreCheck] : checkedGenres = req.query.genreCheck

    typeof (req.query.collaborationCheck) === "string" ? checkedCollaborations = [req.query.collaborationCheck] : checkedCollaborations = req.query.collaborationCheck

    typeof (req.query.instrumentCheck) === "string" ? checkedInstruments = [req.query.instrumentCheck] : checkedInstruments = req.query.instrumentCheck
    
    foundUsers = await db.user.findAll({
      include: [db.instrument, db.collaboration, db.genre],
      where: {
        isBand: req.query.isBand,
        cityId: req.query.city,
        [Op.not]: [{ id: req.user.id }],
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
      
    })  
    res.render('search/index', {users: filteredUsers, storedSearchString: storedSearchString, storedSearchObject: storedSearchObject} )
  } catch (error) {
    req.flash('error', "PLEASE COMPLETE ALL REQUIRED FIELDS.")
    res.redirect(`/search`)
  }
})


//GET SAVED SEARCHES FOR USER
router.get('/saved/:id', async (req, res) => {
  try {
    const foundSearches = await db.search.findAll({
      where: { userId: req.params.id },       
      order: [['createdAt', 'DESC']]
    })
    res.render('search/saved', {searches: foundSearches, dateFormat: dateFormat})
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
      name: "Your Saved Search",
      content: req.body.storedSearchString
    })
    
    req.flash('success', 'Your search has been saved');
    res.redirect(`/search/index/?${createdSearch.content}`);
  } catch (error) {
      req.flash('error', error.message)
      res.redirect(`/`)
  }	 
});


module.exports = router;

