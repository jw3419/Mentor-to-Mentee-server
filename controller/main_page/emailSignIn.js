const { user } = require('../../models')
const jwt = require('jsonwebtoken')
module.exports = {
    post: async (req, res) => {

        // console.log(req.body)
        console.log("찍혀라~~~~~~~~~~~~~~~~~~~~~~~~~~~~    :", req.body)

        await user.findOne({
            where: { email: req.body.email, password: req.body.password }
        }).then((userInfo) => {
            if (!userInfo) {
                res.status(400).json({ data: null, message: 'This is an unauthorized user.' })
            }
            else {
                delete userInfo.dataValues.password;
                const accessToken = jwt.sign(userInfo.dataValues, process.env.ACCESS_SECRET, { expiresIn: "15s" });
                const refreshToken = jwt.sign(userInfo.dataValues, process.env.REFRESH_SECRET, { expiresIn: "30d" });

                res.cookie('refreshToken', refreshToken, { httpOnly: true });
                res.json({ data: { accessToken }, message: 'ok' })
            }
        })
    }
}