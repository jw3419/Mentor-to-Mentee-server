const { mentee, mentor, qa, user } = require('../../models');

module.exports = {
  get: async (req, res) => {
    
    let menteeInfo = await user.findAll({
      attributes: ['username', 'image'],
      include: [{
        model: mentee,
        include: [{
          model: qa
        }],
      }],
      where: { email: req.query.email }
    })
    let sentQuestion = menteeInfo[0].dataValues.mentee.dataValues.qas.map((el) => {
      return {
        id: el.dataValues.id,
        brief: el.dataValues.brief,
        question: el.dataValues.question,
        answer: el.dataValues.answer,
        mentorId: el.dataValues.mentorId,
        menteeId: el.dataValues.menteeId,
        createdAt: el.dataValues.createdAt,
        updatedAt: el.dataValues.updatedAt,
        menteeName: menteeInfo[0].dataValues.username,
        menteeImage: menteeInfo[0].dataValues.image,
        menteeDescription: menteeInfo[0].dataValues.mentee.dataValues.menteeDescription,
        menteeMajor: menteeInfo[0].dataValues.mentee.dataValues.major,
        menteeGraduation: menteeInfo[0].dataValues.mentee.dataValues.graduation,
        menteeGrade: menteeInfo[0].dataValues.mentee.dataValues.grade,
      }
    })


    let mentorInfo = await user.findAll({
      attributes: ['username', 'image'],
      include: [{
        model: mentor,
        include: [{
          model: qa
        }],
      }],
      where: { email: req.query.email, isMentor: true }
    })
    
    let receivedQuestion = mentorInfo[0].dataValues.mentor.dataValues.qas.map((el) => {
      return {
        id: el.dataValues.id,
        brief: el.dataValues.brief,
        question: el.dataValues.question,
        answer: el.dataValues.answer,
        mentorId: el.dataValues.mentorId,
        menteeId: el.dataValues.menteeId,
        createdAt: el.dataValues.createdAt,
        updatedAt: el.dataValues.updatedAt,
        mentorName: menteeInfo[0].dataValues.username,
        mentorImage: menteeInfo[0].dataValues.image,
        mentorDescription: mentorInfo[0].dataValues.mentor.description,
        mentorCompany: mentorInfo[0].dataValues.mentor.company,
        mentorJob: mentorInfo[0].dataValues.mentor.job,
      }
    })

    // console.log()




    if (!menteeInfo || !mentorInfo) {
      res.status(400).json({ message: '질문 불러오기가 실패하였습니다' })
    } else {
      res.status(200).json({
        data: {
          sentQuestion: sentQuestion,
          receivedQuestion: receivedQuestion,
        },
        message: 'Success to get qustions and answers'
      })
    }
  },
};