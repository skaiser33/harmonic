http://localhost:3000/search/index/?isBand=false&city=Chicago&instrumentCheck=Keyboards&collaborationCheck=Tours&genreCheck=Country&genres=&influences=Bowie%2C+Beatles

  <div class="container">
  <form method="get" action="../messages/new/<%= user.id %>">
    <input type="submit" value="Message <%= user.name %>" />
  </form>
  
  <form method="post" action="../search/savesearch/<%= storedSearchString %>">
    <input type="submit" value="Save This Search"/>
  </form>

foundUsers = await db.user.findAll({
    include: [db.instrument, db.collaboration, db.genre],

 
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
      let genreMatch = true 
      let collaborationMatch = true 
      let isntrMatch = true 

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
        genreMatch = (doesArrayInclude(userGenres, req.query.genreCheck))
    
      
      if (req.query.collaborationCheck){
        collaborationMatch = (doesArrayInclude(userCollaborations, req.query.collaborationCheck)) 
      }

      isntrumentMatch = doesArrayInclude(userInstruments, req.query.instrumentCheck)

      if (genreMatch && collaborationMatch && isntrMatch){
        filteredUsers.push(foundUser)
      }
    });  

    // console.log('*************userGenres', found);
    // console.log('*************queryGenres', req.query.genreCheck);
    // console.log('*************queryGenres', req.query.collaborationCheck);
    // console.log('*************', req.query.instrumentCheck);
    console.log("***************filteredusers", filteredUsers);
    // console.log("***************checkedinstr", checkedInstruments);
    // console.log("***************", doesArrayInclude(foundsUsers[0].instruments, checkedInstruments));

    // console.log("***************", doesArrayInclude(["Drums", "Bass", "Cats"], ["Drums", "Cello"]));
    // console.log("***************founduserinstr", foundUsers[0].instruments);
    // res.render('search/index', {users: filteredUsers})
  })