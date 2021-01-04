const { user } = require('../../models')

module.exports = {
    get: async (req, res) => {
        await user.findOne({ attiribute: ['username', 'email', 'mobile', 'gender', 'image'], where: { email: req.query.email } })
            .then((userInfo) => {
                if (userInfo) {
                    res.status(200).json({ data: userInfo, message: 'not found the user information'  })
                } else {
                    res.status(404).json({ data: null, message: 'Completely get the existed user information' })
                }
            })
    },
    post: async (req, res) => {
        if (!req.body.email || !req.body.username || !req.body.mobile || !req.body.gender) {
            res.status(422).json({message : "Please fill in all the required fields" })
        } else {
            let newUser = await user.update({
                email: req.body.email,
                username: req.body.username,
                mobile: req.body.mobile,
                gender: req.body.gender,
                image: req.body.image
            }, { where: { email: req.body.email } })
            res.status(201).json({ data: req.body, message: "Completely set the user information" })
        }
    },
}