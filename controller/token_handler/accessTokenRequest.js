const jwt = require('jsonwebtoken');
const { user } = require('../../models');
require('dotenv').config();

module.exports = {
  get: async (req, res) => {
    const authorization = req.headers.authorization;
    let accessTokenData;
    if (authorization) {
      let token = authorization.split(" ")[1];
      try {
        accessTokenData = jwt.verify(token, process.env.ACCESS_SECRET)
      }
      catch (e) {
        accessTokenData = null;
      }
    }
    if (!accessTokenData) {
      res.json({ data: null, message: "invalid access token." })
    } else {
      let userInfo = await user.findOne({
        where: { email: accessTokenData.email }
      })
      delete userInfo.dataValues.password;
      res.status(200).json({ data: userInfo.dataValues, message: "ok" })
    }
  }
};
