const jwt = require('jsonwebtoken');
const { user } = require('../../models');
require('dotenv').config();
module.exports = {
  // TODO: urclass의 가이드를 참고하여 GET /accesstokenrequest 구현에 필요한 로직을 작성하세요.
  // access-token이 있는지 확인하고, 있으면 token에 저장된 정보 반환, 없으면 access-token이 만료되었다는 내용 응답
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
    }
    else {
      let userInfo = await user.findOne({
        where: { email: accessTokenData.email }
      })

      delete userInfo.dataValues.password;
      res.status(200).json({ data: userInfo.dataValues, message: "ok" })
    }
  }
};
