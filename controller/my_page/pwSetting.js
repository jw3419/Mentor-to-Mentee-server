const { user } = require("../../models")

module.exports = {
    post: async (req, res) => {
        const { currentPassword, newPassword, passwordConfirm, email } = req.body;
        if (newPassword !== passwordConfirm) {
            return res.status(400).json({ message: '새로운 비밀번호가 일치하지않습니다.' });
        }
        await user.findOne({
            where: { email: email }
        }).then(async (result) => {
            if (!result) {
                return res.status(404).json({
                    message: '없는 계정입니다.'
                });
            }
            if (result.dataValues.password === currentPassword) {
                await user.update({ password: newPassword }, { where: { email: req.body.email } })
                res.status(204).json({ message: '비밀번호가 변경 되었습니다.' })
            } else {
                res.status(404).json({ message: '비밀번호가 일치하지 않습니다.' })
            }
        })
    }
}
