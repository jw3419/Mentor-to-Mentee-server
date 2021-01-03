const { user } = require('../../models')

module.exports = {
    get: async (req, res) => {
        await user.findOne({ attiribute: ['username', 'email', 'mobile', 'gender'], where: { email: req.body.email } })
            .then((userInfo) => {
                if (userInfo) {
                    res.status(200).json({ data: userInfo, message: 'ok' })
                } else {
                    res.status(404).json({ data: null, message: '기존 계정 설정 보내기 완료' })
                }
            })
    },
    post: async (req, res) => {
        if (!req.body.gender || !req.body.username || !req.body.mobile || !req.body.gender) {
            res.status(422).send('모든 항목을 충족해주시길 바랍니다.')
        } else {
            await user.findOne({ where: { email: req.body.email } })
                .then((userInfo) => {
                    if (userInfo) {
                        res.status(409).send()
                    } else {
                        const newUser = user.create({
                            username: req.body.username,
                            mobile: req.body.mobile,
                            gender: req.body.gender,
                            image: req.body.image
                        })
                        res.status(201).send({ data: newUser, message: '계정설정 완료' })
                    }
                })
        }
    },
}