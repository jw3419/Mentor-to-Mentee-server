module.exports = {
    // 1. 클라이언트에서 accssToken을 헤더에 담아서 accessTokenHandler 요청을 보낸다.
    // 2. 응답으로 받은 정보에 유저정보가 없으면, refresh 리퀘스트요청을 보낸다.
    // 2. 응답으로 유저 정보가 온다. (여기서 유저 정보가 안오면 그냥 시마이)
    // 3. 응답정보의 유저이메일과 state안에 유저이메일이 같은지 확인한다.
    // 4. 같으면 logout 요청을 보낸다.
    // 5. refresh 토큰을 쿠키에서 지운다.
    // 6. access 토큰은 null 값으로 클라이언트로 전송
    // 7. 클라이언트에서는 스테이트 안에 isLogin을 false로, access 토큰을 응답으로 받은 것을 넣는다.

    get: async (req, res) => {
        console.log("REFRESH TOKEN : ", req.cookies)
        delete req.cookies.refreshToken;
        res.status(200).json({data: {accessToken: null}, message: 'Success to sign out'})
    }
}