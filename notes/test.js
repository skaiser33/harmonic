const db = require("../models");

//post new profile form ASYNC AWAIT version
router.post('/new/:id', async (req, res) => {
  try {
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

    foundCity.addUser(foundUser)
    res.redirect('/')

  } catch (error) {
    req.flash('error', error.message)
    res.redirect(`/profile/new/${req.params.id}`)
  }	 
});