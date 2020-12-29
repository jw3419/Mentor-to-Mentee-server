const {user} = require('../../models')
module.exports = {

    post: async (req, res) => {
        console.log(req.body)
        if(req.body.username && req.body.email && req.body.password){
            let userInfo = await user.create({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                isMentor: false
            })
            res.status(201).json({data: userInfo, message: 'Success Sign Up'});
        }
        else{
            res.status(401).json({data:null, message: "Fail to Sign Up"})
        }

    }
}