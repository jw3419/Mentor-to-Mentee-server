const { user } = require('../../models')

module.exports = {
    get: async (req, res) => {
        /*
         1. 페이지 로딩할 때 GET 요청
        클라이언트의 상태에 데이터가 있다면 GET 요청은 보내지 않습니다.
        클라이언트의 상태에 데이터가 없다면 무조건 GET 요청을 보냅니다.
        만약 첫 번째 GET 요청이라면 Response의 data 객체는 비어 있을 것입니다.
<<<<<<< HEAD
        */

        await user.findOne({
            attiribute: ['username', 'email', 'mobile', 'gender'],
            where: { email: req.body.email },
        })
=======
        
        */
       
        await users.findOne({ where: req.body.email })
>>>>>>> e887793e778aad8e3e26e76042b192c1c3c83d8d
            .then((userInfo) => {
                if (userInfo) {
                    res.status(200).json({ data: userInfo, message: 'ok' })
                } else {
<<<<<<< HEAD
                    res.status(404).json({ data: null, message: '기존 계정 설정 보내기 완료' })
=======
                    res.status(404).json({ data: null, message: '' })
>>>>>>> e887793e778aad8e3e26e76042b192c1c3c83d8d
                }
            })
    },
    post: async (req, res) => {
        // TODO : 회원의 email 을 나타내주고 기존에 작성되어있으면 res에 보내주고 작성이 안되어있다면 새 작성폼 주기.
<<<<<<< HEAD
        if (!req.body.gender || !req.body.username || !req.body.mobile || !req.body.gender) {
            res.status(422).send('모든 항목을 충족해주시길 바랍니다.')
        } else {
            await user.findOne({
                where: { email: req.body.email }
=======
        if (!req.body.gender || !req.body.username || !req.body.mobile) {
            res.status(422).send('모든 항목을 충족해주시길 바랍니다.')
        } else {
            await users.findOne({
                where: { username: req.body.username }
>>>>>>> e887793e778aad8e3e26e76042b192c1c3c83d8d
            }).then((userInfo) => {
                if (userInfo) {
                    res.status(409).send()
                } else {
<<<<<<< HEAD
                    const newUser = user.create({
=======
                    const newUser = await user.create({
>>>>>>> e887793e778aad8e3e26e76042b192c1c3c83d8d
                        username: req.body.username,
                        mobile: req.body.mobile,
                        gender: req.body.gender
                    })
<<<<<<< HEAD
                    res.status(201).send({ data: newUser, message: '계정설정 완료' })
=======
                    res.status(201).send(newUser)
>>>>>>> e887793e778aad8e3e26e76042b192c1c3c83d8d
                }
            })
        }
    },
}