const { user } = require('../../models')

module.exports = {
    get: async (req, res) => {
        await user.findOne({ attiribute: ['username', 'email', 'mobile', 'gender', 'image'], where: { email: req.query.email } })
            .then((userInfo) => {
                if (userInfo) {
                    res.status(200).json({ data: userInfo, message: 'ok' })
                } else {
                    res.status(404).json({ data: null, message: '기존 계정 설정 보내기 완료' })
                }
            })
    },
    post: async (req, res) => {
        if (!req.body.email || !req.body.username || !req.body.mobile || !req.body.gender) {
            res.status(422).send('모든 항목을 충족해주시길 바랍니다.')
        } else {
            let newUser = await user.update({
                email: req.body.email,
                username: req.body.username,
                mobile: req.body.mobile,
                gender: req.body.gender,
                image: req.body.image
            }, { where: { email: req.body.email } })
            res.status(201).json({ data: req.body, message: "Succes to set the user information" })
        }
    },
}