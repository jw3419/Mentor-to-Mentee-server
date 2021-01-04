const { user } = require('../../models');
module.exports = {
  post: async (req, res) => {
    const { email } = req.body;
    let userInfo = await user.findOne({
      where: { email: email },
    });
    if (userInfo) {
      userInfo.destroy();
    }
  },
};