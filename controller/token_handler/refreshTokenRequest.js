const jwt = require('jsonwebtoken');
const { user } = require('../../models');
require('dotenv').config();

module.exports = {
    get: async (req, res) => {
        let refreshToken = req.cookies.refreshToken;
        let refreshTokenData;

        if (!refreshToken) {
            res.json({ data: null, message: "refresh token not found." });
        } else {
            try {
                refreshTokenData = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
            }
            catch (e) {
                refreshTokenData = null;
            }
        }
        if (!refreshTokenData) {
            res.json({ data: null, message: "invalid refresh token." });
        } else {
            let userInfo = await user.findOne({ where: { email: refreshTokenData.email } });
            delete userInfo.dataValues.password;
            const accessToken = jwt.sign(userInfo.dataValues, process.env.ACCESS_SECRET, { expiresIn: "30m" });
            res.json({ data: { accessToken, userInfo: userInfo.dataValues }, message: "ok" })
        }
    }
}