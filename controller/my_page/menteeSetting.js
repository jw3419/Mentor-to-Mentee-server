const mentee = require("../../models/mentee")


module.exports = {
    post: async (req, res) => {
        console.log(req.body)

        if (req.body.email || req.body.uni || req.body.major || req.body.graduation || req.body.grade || req.body.menteeDescription) {
            res.status(404).json({ data: null, message: '모든 항목을 적어주십시오.' })
        } else {
            await mentee.create({
                uni: req.body.uni,
                major: req.body.major,
                graduation: req.body.graduation,
                grade: req.body.grade,
                menteeDescription: req.body.menteeDescription
            }).then((result) => {
                res.status(200).json({data : result, message: '모든 항목이 적용되었습니다.'})
            })
        }
    }
}



/*

menteeEmail: DataTypes.STRING,
uni: DataTypes.STRING,
major: DataTypes.STRING,
graduation: DataTypes.BOOLEAN,
grade: DataTypes.STRING,
menteeDescription: DataTypes.STRING

*/