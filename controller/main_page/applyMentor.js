const { mentor } = require('../../models')
const { user } = require('../../models')
module.exports = {
    post: async (req, res) => {
        if (req.body.mentorEmail && req.body.company && req.body.department && req.body.position && req.body.job) {
            let mentorInfo = await mentor.create({
                mentorEmail: req.body.mentorEmail,
                company: req.body.company,
                department: req.body.department,
                position: req.body.position,
                job: req.body.job
            })
            await user.update({ isMentor: true }, { where: { email: req.body.mentorEmail } });
            res.status(201).json({ data: mentorInfo, message: 'Applying mentor completed'  });
        } else {
            res.status(401).json({ data: null, message: "Fail to apply mentor" })
        }
    }
}