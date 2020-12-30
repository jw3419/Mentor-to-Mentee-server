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
router.get('/main', mainPageController.main.get)
router.get('/signOut', myPageController.signOut.get)
router.get('/userInfoSetting/pageload', myPageController.setAccount.get)
router.post('/userInfoSetting/setAccount', myPageController.setAccount.post)
router.get('/mentorInfoSetting/pageload', myPageController.setMentor.get)
router.post('/mentorInfoSetting/setMentor', myPageController.setMentor.post)

module.exports = router;