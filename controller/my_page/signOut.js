
module.exports = {
    get: async (req, res) => {
        if(req.cookies.naverAccessToken) res.clearCookie('naverAccessToken');
        if(req.cookies.naverRefreshToken) res.clearCookie('naverRefreshToken');
        if(req.cookies.refreshToken) res.clearCookie('refreshToken');
        console.log(req.cookies)
        res.status(200).json({data: {accessToken: null}, message: 'sign out completed'})
    }
}
