const { mentor, user } = require('../../models');

module.exports = {
    get: async (req, res) => {
        let userInfo = await user.findOne({
            attributes: ['username', 'email'], include: [{ model: mentor }],
            where: { email: req.query.email, isMentor: true }
        })
        let mentorInfo = userInfo.dataValues.mentor.dataValues
        if (!mentorInfo) {
            res.status(400).json({ data: null, message: `Can't find the account` })
        } else {
            res.status(200).json({ data: mentorInfo, message: 'Completely load a page'  })
        }
    },
    post: async (req, res) => {
        let newUser = await mentor.update({
            company: req.body.company,
            department: req.body.department,
            position: req.body.position,
            job: req.body.job,
            career: req.body.career,
            description: req.body.description,
        }, { where: { mentorEmail: req.body.mentorEmail } })
        res.status(201).json({ data: req.body, message: "Completely set the user information" })
    }
}