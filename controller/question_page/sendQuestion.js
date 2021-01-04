const { qa, mentor, mentee } = require('../../models')

module.exports = {
    post: async (req, res) => {
        console.log(req.body)
        if (req.body.brief && req.body.question) {
            let menteeInfo = await mentee.findOne({ where: { menteeEmail: req.body.email } })
            let mentorInfo = await mentor.findOne({ where: { mentorEmail: req.body.mentorEmail } })
            let qaInfo = await qa.create({
                brief: req.body.brief,
                question: req.body.question,
                menteeId: menteeInfo.dataValues.id,
                mentorId: mentorInfo.dataValues.id
            })
            res.json({ data: qaInfo, message: "Success to ask the question" })
        } else {
            res.json({ data: null, message: "Must Fill with box" })
        }
    }
}