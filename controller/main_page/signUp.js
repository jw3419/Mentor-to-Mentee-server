const {user, mentee} = require('../../models')
module.exports = {

    post: async (req, res) => {
        if(req.body.username && req.body.email && req.body.password){
            let userInfo = await user.create({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                isMentor: false
            })
            let menteeInfo = await mentee.create({
                menteeEmail: req.body.email
            })
            res.status(201).json({data: null, message: 'Success Sign Up'});
        }
        else{
            res.status(401).json({data:null, message: "Fail to Sign Up"})
        }

    }
}