const { mentor, user } = require('../../models');

module.exports = {
    get: async (req, res) => {
        console.log(req.query.email)
        /*
         1. 페이지 로딩할 때 GET 요청
         2. 클라이언트에서 state.userInfo.email을 params로 담아서 요청
         3. user테이블과 mentor테이블을 조인하여 멘토 데이터 가져옴
        */
        let userInfo = await user.findOne({
            attributes: ['username', 'email'],
            include: [
                {
                    model: mentor
                }
            ],
            where: { email: req.query.email, isMentor: true }
        })
        let mentorInfo = userInfo.dataValues.mentor.dataValues

        if (!mentorInfo) {
            res.json({ data: null, message: `this is not a mentor's account` })
        }
        else {
            res.status(200).json({ data: mentorInfo, message: 'Success to load a page' })
        }
    },
    post: async (req, res) => {
        // TODO :
        // 1. req.body.mentorEmail이 멘토 테이블에 있기만하면 update 시켜주면 된다.
        console.log(req.body)
        let newUser = await mentor.update({
            career: req.body.career,
            description: req.body.description
        },
        {
            where: { mentorEmail: req.body.mentorEmail } 
        })
        
        res.status(201).json({ data: req.body, message: "Succes to set the user information" })
    }
}