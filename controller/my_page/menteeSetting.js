const { mentee, user } = require("../../models/")

module.exports = {
    get: async (req, res) => {
        console.log(req.query.email)
        /*
         1. 페이지 로딩할 때 GET 요청
         2. 클라이언트에서 state.userInfo.email을 params로 담아서 요청
         3. user테이블과 mentee테이블을 조인하여 멘토 데이터 가져옴
        */
        let userInfo = await user.findOne({
            attributes: ['username', 'email'],
            include: [
                {
                    model: mentee,
                }
            ],
            where: { email: req.query.email }
        })
        console.log('userInfo.datavalues      1234123 : ',userInfo)
        let menteeInfo = userInfo.dataValues.mentee.dataValues

        if (!menteeInfo) {
            res.json({ data: null, message: `this is not a mentor's account` })
        }
        else {
            res.status(200).json({ data: menteeInfo, message: 'Success to load a page' })
        }
    },
    post: async (req, res) => {
        console.log(req.body)
        if (!req.body.uni || !req.body.major || !req.body.graduation || !req.body.grade || !req.body.menteeDescription) {
            res.status(404).json({ data: null, message: '모든 항목을 적어주십시오.' })
        } else {
            // let menteeFinder = await mentee.findOne({where:{email : req.body.email}})
            // console.log('qwer',menteeFinder)
            await mentee.update({
                uni: req.body.uni,
                major: req.body.major,
                graduation: req.body.graduation,
                grade: req.body.grade,
                menteeDescription: req.body.menteeDescription
            }, {
                where: { menteeEmail: req.body.menteeEmail }
            }).then((result) => {
                res.status(200).json({ data: result, message: '모든 항목이 적용되었습니다.' })
            })
        }
    }
}
