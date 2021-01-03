const { mentee, user } = require("../../models/")

module.exports = {
    get: async (req, res) => {
        let userInfo = await user.findOne({ attributes: ['username', 'email'], include: [{ model: mentee }], where: { email: req.query.email } })
        let menteeInfo = userInfo.dataValues.mentee.dataValues
        if (!menteeInfo) {
            res.json({ data: null, message: `this is not a mentor's account` })
        }
        else {
            res.status(200).json({ data: menteeInfo, message: 'Success to load a page' })
        }
    },
    post: async (req, res) => {
        if (!req.body.uni || !req.body.major || !req.body.graduation || !req.body.grade || !req.body.menteeDescription) {
            res.status(404).json({ data: null, message: '모든 항목을 적어주십시오.' })
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
                    res.status(200).json({ data: req.body, message: '모든 항목이 적용되었습니다.' })
                } else {
                    res.status(400).json({ message: '업데이트가 거절당했습니다.' })
                }
            })
        }
    }
}
