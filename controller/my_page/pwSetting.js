const { user } = require("../../models")

module.exports = {
    post: async (req, res) => {
        const { currentPassword, newPassword, passwordConfirm, email } = req.body;
        if (newPassword !== passwordConfirm) {
            return res.status(400).json({ message: "Password not matched" });
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
                res.status(201).json({ message: "Password changed" })
            } else {
                res.status(404).json({ message: "Unexpected error" })
            }
        })
    }
}
