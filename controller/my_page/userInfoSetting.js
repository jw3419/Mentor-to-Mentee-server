const { user } = require('../../models')

module.exports = {
    get: async (req, res) => {
        /*
         1. 페이지 로딩할 때 GET 요청
        클라이언트의 상태에 데이터가 있다면 GET 요청은 보내지 않습니다.
        클라이언트의 상태에 데이터가 없다면 무조건 GET 요청을 보냅니다.
        만약 첫 번째 GET 요청이라면 Response의 data 객체는 비어 있을 것입니다.
        */
       
        await user.findOne({
            attiribute: ['username', 'email', 'mobile', 'gender'],
            where: { email: req.query.email },
        })
            .then((userInfo) => {
                if (userInfo) {
                    res.status(200).json({ data: userInfo, message: 'ok' })
                } else {
                    res.status(404).json({ data: null, message: '기존 계정 설정 보내기 완료' })
                }
            })
    },
    post: async (req, res) => {
        // TODO : 회원의 email 을 나타내주고 기존에 작성되어있으면 res에 보내주고 작성이 안되어있다면 새 작성폼 주기.
        
        if (!req.body.gender || !req.body.username || !req.body.mobile || !req.body.gender) {
            res.status(422).send('모든 항목을 충족해주시길 바랍니다.')
        } else {
            let newUser = await user.update({
                email: req.body.email,
                username: req.body.username,
                mobile: req.body.mobile,
                gender: req.body.gender
            },
            {
                where: {email: req.body.email}
            })

            res.status(201).json({data: req.body, message: "Succes to set the user information"})
        }
    },
}