const axios = require('axios');
const { user } = require('../../models');
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
require('dotenv').config();

module.exports = {
    get: async (req, res) => {

        const requestCode = req.query.code
        const clientID = process.env.GOOGLE_ID;
        const clientSecret = process.env.GOOGLE_SECRET;
        // 4. authorization code 구글 서버로 전송.
        console.log('requestCode :', requestCode);
        axios({
            method: 'post',
            url: `https://oauth2.googleapis.com/token?code=${requestCode}&client_id=${clientID}&client_secret=${clientSecret}&grant_type=authorization_code&redirect_uri=https://localhost:4000/googleCallback`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            withCredentials: true
        })
            .then(data => {
                // 5. oauth로 post 요청을 보내고, acceess token을 서버에 부여받음, oauth -> server
                console.log('id_token', data.data.id_token)
                // accesstoken 위치 data.data.id_token
                const idToken = data.data.id_token;
                let result = jwt_decode(idToken);
                return result
            }).then(data => {
                console.log('user 적기전 data', data)
                return user.findOrCreate({
                    where: {
                        email: data.email,
                        username: data.name
                    },
                    defaults: {
                        username: data.name,
                        password: 'google'
                    }
                })
            }).then((data) => {
                console.log('data 보여줘', data)
                const result = {
                    email: data[0].dataValues.email,
                    username: data[0].dataValues.username
                }

                const token = jwt.sign(result, process.env.ACCESS_SECRET, {
                    expiresIn: '24h'
                })
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'None'
                })
                res.redirect(`http:localhost:3000?token=${token}`)
            })
    }
}
