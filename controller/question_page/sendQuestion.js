const { qa, mentor, mentee } = require('../../models')
module.exports = {
    post: async (req, res) => {
        // TODO:
        // 1. 멘티테이블에서 reqest로 받은 유저이메일과 같은 데이터를 추출
        // 2. brief, question, mentorId, menteeId를 qas 테이블에 insert
        if (req.body.brief && req.body.question) {
            console.log("리퀘스트 바디 : ", req.body)
            let menteeInfo = await mentee.findOne({
                where: {
                    menteeEmail: req.body.email
                }
            })
            let mentorInfo = await mentor.findOne({
                where: {
                    mentorEmail: req.body.mentorEmail
                }
            })
            console.log("멘티정보 : ", menteeInfo.dataValues)
            console.log("멘토정보 : ", mentorInfo.dataValues)

            let qaInfo = await qa.create({
                brief: req.body.brief,
                question: req.body.question,
                menteeId: menteeInfo.dataValues.id,
                mentorId: mentorInfo.dataValues.id
            })

            res.json({ data: qaInfo, message: "Success to ask the question" })
        }
        else{
            res.json({data: null, message: "Must Fill with box"})
        }

    }
}