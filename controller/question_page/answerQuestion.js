const { qa } = require('../../models')

module.exports = {
    post: async (req, res) => {
        await qa.update({ answer: req.body.answer }, { where: { id: req.body.id } })
            .then((result) => {
                if (result[0] === 1) {
                    res.status(200).json({ message: '작성완료' })
                } else {
                    res.status(400).json({ message: '작성요청 거부' })
                }
            })
    }
}