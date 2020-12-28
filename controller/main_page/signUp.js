const {user} = require('../../models')
module.exports = {
    get: async (req, res) => {
        let userInfo = await user.findOne({
            where: {email: req.body.email}
        })

        if(!userInfo){
            res.json({data: null, message: 'This email is available.'})
        }
        else{
            res.json({data: null, message: 'This email already exists. Use something difference.'})
        }
    },

    post: async (req, res) => {
        if(req.body.username && req.body.email && req.body.password){
            
        }
    }
}