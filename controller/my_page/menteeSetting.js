const { mentee, user } = require("../../models/")

module.exports = {
    get: async (req, res) => {
        let userInfo = await user.findOne({ attributes: ['username', 'email'], include: [{ model: mentee }], where: { email: req.query.email } })
        let menteeInfo = userInfo.dataValues.mentee.dataValues
        if (!menteeInfo) {
            res.json({ data: null, message: "Menteeinfo not found"})
        }
        else {
            res.status(200).json({ data: menteeInfo, message: 'Completely load a page'  })
        }
    },

    post: async (req, res) => {
        if (!req.body.uni || !req.body.major || !req.body.graduation || !req.body.grade || !req.body.menteeDescription) {
            res.status(404).json({ data: null, message: "Please fill in all the required fields" })
        } else {
            await mentee.update({
                uni: req.body.uni,
                major: req.body.major,
                graduation: req.body.graduation,
                grade: req.body.grade,
                menteeDescription: req.body.menteeDescription
            }, {
                where: { menteeEmail: req.body.menteeEmail }
            }).then((result) => {
                if (result) {
                    res.status(200).json({ data: req.body, message: 'Compeltely update the menteeinfo' })
                } else {
                    res.status(400).json({ message: "Reject to update the menteeinfo"  })
                }
            })
        }
    }
}
