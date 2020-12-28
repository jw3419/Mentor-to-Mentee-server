const axios = require('axios');
const User = require('../../models').user; 
require('dotenv').config();

module.exports = {
    post: async (req, res) => {
        let { token } = req.body;
        let { data: result, status } = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`);
        if (status === 200 && result.azp === process.env.google_client_id) {
            let userInfo = await users.findOne({
                where: {
                    username: result.sub
                }
            });
            if (userInfo) {
                req.session.email = { username: userInfo.username }
                res.status(200).json({});
            } else {
                res.status(200).json({});
            }
        } else {
            res.status(400).send({});
        }
    }
}
