const { mentor } = require('../../models')
const { user } = require('../../models')
module.exports = {
    post: async (req, res) => {
        // 토큰으로 현재 로그인 되어있는 유저의 이메일을 가져와야 한다.
        console.log(req.body)
        if(req.body.mentorEmail && req.body.company && req.body.department && req.body.position && req.body.job){
            let mentorInfo = await mentor.create({
                mentorEmail: req.body.mentorEmail,
                company: req.body.company,
                department: req.body.department,
                position: req.body.position,
                job: req.body.job
            })
            await user.update({ isMentor: true }, {
                where: {
                  email: req.body.mentorEmail
                }
              });
            res.status(201).json({data: mentorInfo, message: 'Success to apply mentor'});
        }
        else{
            res.status(401).json({data:null, message: "Fail to apply mentor"})
        }
    }
}