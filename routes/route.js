const express = require('express');
const router = express.Router();
const { 
    mainPageController, 
    // myPageController, 
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
<<<<<<< HEAD

router.get('/main', mainPageController.main.get)

=======
>>>>>>> e887793e778aad8e3e26e76042b192c1c3c83d8d
module.exports = router;