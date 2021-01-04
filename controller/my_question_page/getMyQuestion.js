const { mentee, mentor, qa, user } = require('../../models');
module.exports = {
  get: async (req, res) => {
    // TODO:
    // 1. req.body에서 user 이메일을 받는다.
    // 2. 멘티, 멘토 테이블에서 id를 user 이메일로 찾는다.
    // 3. 내가 받은 질문 : qa테이블에서 멘토 id로 검색
    // 4. 내가 한 질문 : qa 테이블에서 멘티 id로 검색
    // 5. {내가한질문, 내가받은질문}으로 담아서 응답.
    const sendData = {
      sentQuestion: [],
      receivedQuestion: [],
    };
    //console.log(req.query.email);
    let menteeInfo = await mentee.findOne({
      where: { menteeEmail: req.query.email },
    });
    let mentorInfo = await mentor.findOne({
      where: { mentorEmail: req.query.email },
    });
    if (!menteeInfo || !mentorInfo) {
      res.end();
    } else {
      let menteeId = menteeInfo.dataValues.id;
      let mentorId = mentorInfo.dataValues.id;
      // question : 질문 한 것
      let question = await qa.findAll({
        where: { menteeId: menteeId },
      });
      sendData.sentQuestion = [...question];
      for (let i = 0; i < question.length; i++) {
        let q = question[i].dataValues;
        let qMentor = await mentor.findOne({
          where: { id: q.mentorId },
        });
        let qUser = await user.findOne({
          where: { email: qMentor.mentorEmail },
        });
        let mentorData = qMentor.dataValues;
        let userData = qUser.dataValues;
        sendData.sentQuestion[i].dataValues.mentorDescription =
          mentorData.description;
        sendData.sentQuestion[i].dataValues.mentorCompany = mentorData.company;
        sendData.sentQuestion[i].dataValues.mentorJob = mentorData.job;
        sendData.sentQuestion[i].dataValues.mentorName = userData.username;
        sendData.sentQuestion[i].dataValues.mentorImage = userData.image;
      }
      // answer : 질문 받은 것 (= 답해줘야할 것)
      let answer = await qa.findAll({
        where: { mentorId: mentorId },
      });
      sendData.receivedQuestion = [...answer];
      for (let i = 0; i < answer.length; i++) {
        let ans = answer[i].dataValues;
        let qMentee = await mentee.findOne({
          where: { id: ans.menteeId },
        });
        let qUser = await user.findOne({
          where: { email: qMentee.menteeEmail },
        });
        let menteeData = qMentee.dataValues;
        let userData = qUser.dataValues;
        sendData.receivedQuestion[i].dataValues.menteeDescription =
          menteeData.menteeDescription;
        sendData.receivedQuestion[i].dataValues.menteeMajor = menteeData.major;
        sendData.receivedQuestion[i].dataValues.menteeGraduation =
          menteeData.graduation;
        sendData.receivedQuestion[i].dataValues.menteeGrade = menteeData.grade;
        sendData.receivedQuestion[i].dataValues.menteeName = userData.username;
        sendData.receivedQuestion[i].dataValues.menteeImage = userData.image;
      }
      res.json({
        data: {
          sentQuestion: sendData.sentQuestion,
          receivedQuestion: sendData.receivedQuestion,
        },
        message: 'Completely get the qustions and answers',
      });
    }
  },
};