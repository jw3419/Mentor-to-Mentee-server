const express = require('express');
const router = express.Router();
const {
    mainPageController,
    myPageController,
    myQuestPageController,
    questPageController,
    tokenController
} = require('../controller');

// Main Page API
router.get('/naverCallback', mainPageController.naverCallback.get)
router.get('/getNaverUserInfo', mainPageController.naverCallback.getUserInfo)
router.get('/isAuth', mainPageController.naverCallback.isAuthorized)
router.post('/emailSignIn', mainPageController.emailSignIn.post)
router.post('/emailSignUp', mainPageController.emailSignUp.post)
router.post('/applyMentor', mainPageController.applyMentor.post)
router.get('/main', mainPageController.main.get)
// Token Handler API
router.get('/accessTokenHandler', tokenController.accessTokenHandler.get)
router.get('/refreshTokenHandler', tokenController.refreshTokenHandler.get)
// User Modal & My Page API
router.post('/setPassword', myPageController.setPassword.post)
router.get('/signOut', myPageController.signOut.get)
router.post('/imageUpload', myPageController.imgUpload.uploadImageToS3)
router.get('/userInfoSetting/pageload', myPageController.setAccount.get)
router.post('/userInfoSetting/setAccount', myPageController.setAccount.post)
router.get('/mentorInfoSetting/pageload', myPageController.setMentor.get)
router.post('/mentorInfoSetting/setMentor', myPageController.setMentor.post)
router.get('/menteeInfoSetting/pageload', myPageController.setMentee.get)
router.post('/menteeInfoSetting/setMentee', myPageController.setMentee.post)
// Question Page API 생성
router.post('/askQuestion', questPageController.sendQ.post)
router.post('/answerQuestion', questPageController.answerQuestion.post)
router.get('/getQuestion', myQuestPageController.getMyQuestion.get)

module.exports = router;