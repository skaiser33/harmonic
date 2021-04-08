const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
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

//TODO:  HOW DO I SEARCH THROUGH ARRAYS?
//GET INDEX OF SEARCH RESULTS
router.get('/index', async (req, res) => {
  // console.log(req.query.instrumentCheck)
  const doesArrayInclude = (arr, target) => target.every(v => arr.includes(v));
  // let checkedInstruments = []
  // let checkedCollaborations = []
  // let checkedGenres = []
  let filteredUsers = []
  let userInstruments, userGenres, userCollaborations

        //CAN I REFACTOR THE FOLLOWING AS ONE FUNCTION and SUB IN? [USING VERY SIMILAR IN SEARCH]
  // adds each checked instrument from form to checkedInstruments array
  // for (const instrument of req.query.instrumentCheck) {
  //   const checkedInstrument = await db.instrument.findOne({
  //     where: {name: instrument}
  //   })
  //   checkedInstruments.push(checkedInstrument)
  // }

  // // adds each checked collaboration from form to checkedcollaborations array
  // if (req.body.collaborationCheck) {
  //   for (const collaboration of req.query.collaborationCheck) {
  //     const checkedCollaboration = await db.collaboration.findOne({
  //       where: {type: collaboration}
  //     })
  //     checkedCollaborations.push(checkedCollaboration)
  //   }  
  // }

  // // adds each checked collaboration from form to checkedcollaborations array
  // if (req.body.genreCheck) {
  //   for (const genre of req.query.genreCheck) {
  //     const checkedGenre = await db.genre.findOne({
  //       where: {name: genre}
  //     })
  //     checkedGenres.push(checkedGenre)
  //   }
  // }
  
  foundUsers = await db.user.findAll({
    include: [db.instrument, db.collaboration, db.genre],

    //   { model: db.instrument,
    //     where: {
    //       // [Op.and]: [{ name: "Drums" }, { name: "Cello" }]},
    //         // name: {[Op.and]: ["Drums", "Cello"]}}
    //       name: ["Drums", "Cello"] },
    //   },
    //   // { model: db.collaboration,
    //   //   where: { type: "Shows" },
    //   // },
    //   // { model: db.genre,
    //   //   where: { name: "Experimental" },
    //   // },
    // ],  
    where: {
      isBand: false, //req.query.isBand,
      // cityId: req.query.city
      //influences (%___%): split(",")
    },
    order: [['name', 'ASC']]
    // include: [db.city, db.instrument, db.genre, db.collaboration]
  })

  //iterate through foundUsers
    
    //iterate through checkedInstrument + genres + collabs (if length)


        //
    //let userInstruments = []
    //if all user
    foundUsers.forEach(foundUser => {    
      userInstruments = foundUser.instruments.map(function(instrument){
        return instrument.name
      })
      if (foundUser.genres.length) {
        userGenres = foundUser.genres.map(function(genre){
          return genre.name
        })
      }
      if (foundUser.collaborations.length) {
        userCollaborations = foundUser.collaborations.map(function(collaboration){
          return collaboration.type
        })
      }
      if ((doesArrayInclude(userInstruments, req.query.instrumentCheck)) 
        //THESE GUYS GOTTA BE IN CONDITIONALS TO SEE IF THEY EXIST, SHOULD I SET A VARIABLE THAT GETS BUMPED TO FALSE IF ANY OF THEM DON'T MATCH UP
        && (doesArrayInclude(userGenres, req.query.genreCheck))
        && (doesArrayInclude(userCollaborations, req.query.collaborationCheck)) 
      ){
        filteredUsers.push(foundUser)
        }
    });  

    // console.log('*************userGenres', found);
    console.log('*************queryGenres', req.query.genreCheck);
    console.log('*************queryGenres', req.query.collaborationCheck);
    // console.log('*************', req.query.instrumentCheck);
    console.log("***************filteredusers", filteredUsers);
    // console.log("***************checkedinstr", checkedInstruments);
    // console.log("***************", doesArrayInclude(foundsUsers[0].instruments, checkedInstruments));

    // console.log("***************", doesArrayInclude(["Drums", "Bass", "Cats"], ["Drums", "Cello"]));
    // console.log("***************founduserinstr", foundUsers[0].instruments);
    // res.render('search/index', {users: filteredUsers})
  })


module.exports = router;
