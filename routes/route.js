const express = require('express');
const router = express.Router();
const { 
    mainPageController, 
    myPageController, 
    // myQuestPageController, 
    // questPageController
    tokenController 
} = require('../controller')

// router.post('/emailSignIn', mainPageController.emailSignIn.post)
router.post('/emailSignIn', mainPageController.emailSignIn.post)
router.post('/emailSignUp', mainPageController.emailSignUp.post)
router.post('/applyMentor', mainPageController.applyMentor.post)
router.get('/accessTokenHandler', tokenController.accessTokenHandler.get)
router.get('/refreshTokenHandler', tokenController.refreshTokenHandler.get)


// router.post('/password', myPageController.password.post)
router.get('/main', mainPageController.main.get) 

router.post('/imageUpload', myPageController.imgUpload.uploadImageToS3)
module.exports = router;