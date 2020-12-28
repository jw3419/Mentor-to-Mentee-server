const express = require('express');
const router = express.Router();
const { 
    mainPageController, 
    // myPageController, 
    // myQuestPageController, 
    // questPageController 
} = require('../controller')

// router.post('/emailSignIn', mainPageController.emailSignIn.post)
router.post('/emailSignIn', mainPageController.emailSignIn.post)


module.exports = router;