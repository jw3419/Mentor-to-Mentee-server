const axios = require('axios');
module.exports = {
    get: async (req, res) => {
        const code = req.query.code;
        const state = req.query.state;
        const client_id = 'jzmv9M17ZktTLYgIxIfb';
        const client_secret = 'vznusBv6zf';
        const redirectURI = encodeURI("https://localhost:4000/naverCallback");
        const api_url = `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirectURI}&code=${code}&state=${state}`;

        let tokenInfo = await axios.get(api_url);

        if (!tokenInfo) {
            res.json({ data: null, message: "Fail to get information of token" })
        }
        else {
            let accessToken = tokenInfo.data.access_token;
            let refreshToken = tokenInfo.data.refresh_token;
            console.log(JSON.stringify({ accessToken }))

            res.cookie('accessToken', accessToken, { httpOnly: true });
            req.session.save(() => {
                req.session.refreshToken = refreshToken
            })
            res.redirect('http://localhost:3000/?')

            // res.json({ data: { accessToken }, message: 'Success to Sign In' })
        }
        // let options = {
        //     url: api_url,
        //     headers: { 'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret }
        // };
        // request.get(options, function (error, response, body) {
        //     if (!error && response.statusCode == 200) {
        //         res.writeHead(200, { 'Content-Type': 'text/json;charset=utf-8' });
        //         res.end(body);
        //     } else {
        //         res.status(response.statusCode).end();
        //         console.log('error = ' + response.statusCode);
        //     }
        // });
    }
}