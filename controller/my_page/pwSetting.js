const { user } = require("../../models/user")

module.exports = {
    // TODO : 현재 비밀번호, 새로운 비밀번호, 새로운 비밀번호 확인 을 클라이언트에서 받는다.
    // 현재비밀번호가 req.body.email에서 추출해온 비밀번호가 맞는지 확인한다.
    // 새로운 비밀번호와 새로운비밀번호 확인 이 맞는지 확인한다.
    // 새로운 비밀번호가 일치한다면, 비밀번호를 저장한다.


    post: async (req, res) => {
        const { currentPassword, newPassword, passwordConfirm } = req.body;
        console.log('password: ', currentPassword, newPassword, passwordConfirm);

        // 새로운 비밀번호와 새로운비밀번호 확인 일치 여부
        if (password !== passwordConfirm) {
            return res.status(400).json({
                message: '새로운 비밀번호가 일치하지않습니다.'
            });
        }
        // 일치한다면 => req.body.email 로 db내에 비밀번호를 갖고온다.
        // 유저정보를 갖고온다 email과 일치하지않으면 없는 계정임을 보내준다. 
        await user.findByPk(req.body.email).then((result) => {
            if (!result) {
                return res.status(404).json({
                    message: '없는 계정입니다.'
                });
            }
            // db내의 비밀번호가 현재 비밀번호와 일치한다면
            if (result.dataValues.password === currentPassword) {
                await user.update({ password: newPassword }, { where: { email: req.body.email } })
                res.status(204).json({ message: '비밀번호가 변경 되었습니다.' })
            } else {
                //db내의 비밀번호와 현재 비밀번호가 일치하지않을때 비밀번호가 일치하지않습니다 를 보내준다.
                res.status(404).json({ message: '비밀번호가 일치하지 않습니다.' })
            }
        })
    }
}