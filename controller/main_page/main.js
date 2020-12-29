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
                    attributes: ['company', 'department', 'createdAt']
                }
            ],
            limit: 20,
            where: { isMentor: true }
        }).then((userInfo) => {
            let result = userInfo.map((el) => {
                return {
                    username: el.dataValues.username,
                    company: el.dataValues.mentor.company,
                    department: el.dataValues.mentor.department,
                    createdAt: el.dataValues.mentor.createdAt
                }
            })
            console.log(result)
            res.status(200).json({ data: result, message: '멘토카드 보내기 완료!' })
        })
            .catch((error) => {
                console.log(error)
            })
    }
}