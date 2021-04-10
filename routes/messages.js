const express = require('express');
const router = express.Router();
const db = require('../models');
const dateFormat = require('dateformat');


//GET NEW MESSAGE FORM
router.get('/new/:id', async (req, res) => {
  try {
    const foundUser = await db.user.findOne({    
      where: {id: req.params.id}
    })
    res.render('messages/new', {user: foundUser})

  } catch (error) {
    req.flash('error', error.message)
    res.redirect(`/profile/${req.params.id}`)
  }	 
});


//POST NEW MESSAGE
router.post('/new/:id', async (req, res) => {
  try {
    const createdMessage = await db.message.create({
      recipientId: req.params.id, 
      senderId: req.user.id,  //or currentUser.id?
      content: req.body.content
      })
      console.log("*********", createdMessage);
      res.redirect(`/profile/${req.params.id}`)

  } catch (error) {
      req.flash('error', error.message)
      res.redirect(`/profile/${req.params.id}`)
  }	 
});


//GET USER MESSAGES
//TODO: order by createdAt
router.get('/:id', async (req, res) => {
  try {
    const foundMessages = await db.message.findAll({
      where: { recipientId: req.params.id }, 
      
        include: [
            { model: db.user,
               as: 'sender',
            // where: { recipientId: req.params.id },
            },
          ],
          order: [['createdAt', 'DESC']]
      })
      res.render('messages/index', {messages: foundMessages, dateFormat: dateFormat})

  } catch (error) {
      req.flash('error', error.message)
      res.redirect(`/profile/${req.params.id}`)
  }	 
});


module.exports = router;
