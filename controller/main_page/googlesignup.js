const axios = require('axios');
const user = require('../../models');
require('dotenv').config();

module.exports = {
  post: async (req, res) => {
    let { token } = req.body;
    await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`);
    if (status === 200 && result.azp === process.env.google_client_id) {
      await user.create({
      }).then((userInfo) => {
        if (userInfo) {
          user.create({
            email: userInfo.email,
          })
          res.status(201).send();
        } else {
          res.status(500).send();
        }
      })
      console.log(result.sub)
    } else {
      res.status(400).send('올바르지 않은 접근입니다.');
    }
  }
}