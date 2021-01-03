const { mentor } = require('../../models')
const { user } = require('../../models')

module.exports = {
    get: async (req, res) => {
        await user.findAll({
            attributes: ['username', 'email'],
            include: [
                {
                    model: mentor,
                    order: 'createdAt DESC',
                }
            ],
            limit: 20,
            where: { isMentor: true }
        }).then((userInfo) => {
            let result = userInfo.map((el) => {
                console.log(el.dataValues.mentor.dataValues)
                return {
                    email: el.dataValues.email,
                    username: el.dataValues.username,
                    image: el.dataValues.image,
                    mentorId: el.dataValues.mentor.id,
                    company: el.dataValues.mentor.company,
                    department: el.dataValues.mentor.department,
                    job: el.dataValues.mentor.job,
                    position: el.dataValues.mentor.position,
                    career: el.dataValues.mentor.career,
                    description: el.dataValues.mentor.description,                    
                    createdAt: el.dataValues.mentor.createdAt,
                }
            })
            res.status(200).json({ data: result, message: '멘토카드 보내기 완료!' })
        })
            .catch((error) => {
                console.log(error)
            })
    },


    post: async (req, res) => {
        // menteeEmial
        await qa.create({
            
        })
    }
}

/*
    brief: DataTypes.STRING,
    question: DataTypes.STRING,
    answer: DataTypes.STRING,
    mentorId: DataTypes.INTEGER,
    menteeId: DataTypes.INTEGER
    */