const { mentor } = require('../../models')

module.exports = {
    post: async (req, res) => {
        // 토큰으로 현재 로그인 되어있는 유저의 이메일을 가져와야 한다.
        let mentorInfo = await mentor.findOne({
            where: {}
        })
    }
}