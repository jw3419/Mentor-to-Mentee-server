const axios = require('axios');
require('dotenv').config();
const { user, mentee } = require('../../models');
const menteeSetting = require('../my_page/menteeSetting');
module.exports = {
    get: async (req, res) => {
        const redirectURI = encodeURI("https://localhost:4000/naverCallback");
        const api_url = `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${process.env.NAVER_CLIENT_ID}&client_secret=${process.env.NAVER_CLIENT_SECRET}&redirect_uri=${redirectURI}&code=${req.query.code}&state=${req.query.state}`;

        let tokenInfo = await axios.get(api_url);

        if (!tokenInfo) {
            res.json({ data: null, message: "Fail to get information of token" })
        }
        else {
            let naverAccessToken = tokenInfo.data.access_token;
            let naverRefreshToken = tokenInfo.data.refresh_token;

            res.cookie('naverAccessToken', naverAccessToken, { httpOnly: true, secure: true });
            res.cookie('naverRefreshToken', naverRefreshToken, { httpOnly: true, secure: true });

            res.redirect('http://localhost:3000/')
            // res.json({ data: accessToken, message: 'ok' })
        }
    },
    isAuthorized: (req,res) => {
        console.log("현재 남아있는 쿠키: ",req.cookies)
        if(req.cookies.naverAccessToken){
            res.json({data: { accessToken: req.cookies.naverAccessToken }, message: "naver"})
        }
        
        if(req.cookies.refreshToken){
            res.json({data: { accessToken: req.cookies.refreshToken }, message: "local"})
        }
    },

    getUserInfo: async (req, res) => {
        if (!req.cookies.naverAccessToken) {
            if (!req.cookies.naverRefreshToken) {
                res.json({ data: null, message: 'Unathorized user' });
            }
            else {
                const redirectURI = encodeURI("https://localhost:4000/naverCallback");
                const api_url = `https://nid.naver.com/oauth2.0/token?grant_type=refresh_token&client_id=${process.env.NAVER_CLIENT_ID}&client_secret=${process.env.NAVER_CLIENT_SECRET}&redirect_uri=${redirectURI}&refresh_token=${req.cookies.naverRefreshToken}`;
                let tokenInfo = await axios.get(api_url);
                let naverAccessToken = tokenInfo.data.access_token;
                let naverRefreshToken = tokenInfo.data.refresh_token;

                res.cookie('naverAccessToken', naverAccessToken, { httpOnly: true, secure: true });
                res.cookie('naverRefreshToken', naverRefreshToken, { httpOnly: true, secure: true });

                res.json()
            }
        }
        else {
            // TODO:
            // 1. 네이버 토큰으로 유저정보요청
            // 2. 네이버 유저정보로 회원가입 진행
            // 3. 테이블에서는 유저이메일이 있는지 확인
            // 4. 없으면 유저정보를 유저테이블에 insert
            // 5. 있으면 테이블에 있는 유저정보 그대로 클라이언트에 리턴
            let naverUser = await axios.get('https://openapi.naver.com/v1/nid/me', {
                headers: {
                    Authorization: `Bearer ${req.cookies.naverAccessToken}`
                }
            })

            let userInfo = await user.findOne({
                where: {
                    email: naverUser.data.response.email
                }
            })

            if (!userInfo) {
                let newUser = await user.create({
                    email: naverUser.data.response.email,
                    username: naverUser.data.response.name,
                    password: '1234',
                    isMentor: false
                })
                let menteeUser = await mentee.create({
                    menteeEmail: naverUser.data.response.email
                })
                delete newUser.dataValues.password
                res.json({ data: newUser, message: "Success to naver sign in" })
            }
            else {
                res.json({ data: userInfo, message: "Success to naver sign in" })
            }
        }
    }
}