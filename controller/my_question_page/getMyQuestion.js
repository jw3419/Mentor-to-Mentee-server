const { mentee, mentor, qa } = require('../../models')
module.exports = {
    get: async (req, res) => {
        // TODO:
        // 1. req.body에서 user 이메일을 받는다.
        // 2. 멘티, 멘토 테이블에서 id를 user 이메일로 찾는다.
        // 3. 내가 받은 질문 : qa테이블에서 멘토 id로 검색
        // 4. 내가 한 질문 : qa 테이블에서 멘티 id로 검색
        // 5. {내가한질문, 내가받은질문}으로 담아서 응답.
        let menteeInfo = await mentee.findOne({
            where: { menteeEmail: req.query.email}
        })
        let mentorInfo = await mentor.findOne({
            where: { mentorEmail: req.query.email}
        })
        let menteeId = menteeInfo.dataValues.id;
        let mentorId = mentorInfo.dataValues.id;

        // question : 질문 한 것
        let question = await qa.findAll({
            where: { menteeId: menteeId }
        })
        // answer : 질문 받은 것 (= 답해줘야할 것)
        let answer = await qa.findAll({
            where: { mentorId: mentorId }
        })

        res.json({data: {question: question, answer: answer}, message: "Success to get Qustions and Answers"})

    }
}