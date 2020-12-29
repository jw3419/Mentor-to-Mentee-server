const jwt = require('jsonwebtoken');
const { user } = require('../../models');

module.exports = {
  // TODO: urclass의 가이드를 참고하여 GET /accesstokenrequest 구현에 필요한 로직을 작성하세요.
  // access-token이 있는지 확인하고, 있으면 token에 저장된 정보 반환, 없으면 access-token이 만료되었다는 내용 응답
  get: async (req, res) => {
    console.log("ACCESS TOKEN : ", req.headers.authorization)
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
    console.log("토큰에 담긴 유저정보 : ", accessTokenData)
    if (!accessTokenData) {
      res.json({ data: null, message: "invalid access token." })
    }
    else {
      let userInfo = await user.findOne({
        where: { email: accessTokenData.email }
      })
      console.log("디비에서 가져온 유저정보 : ", userInfo)

      delete userInfo.dataValues.password;
      res.status(200).json({ data: userInfo.dataValues, message: "ok" })
    }
  }
};
