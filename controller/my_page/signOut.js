module.exports = {
    get: async (req, res) => {
        delete req.cookies.refreshToken;
        res.status(200).json({ data: { accessToken: null }, message: 'Success to sign out' })
    }
}
