const RefreshToken = require('../../../models/RefreshToken');
const User = require('../../../models/User');

module.exports = async (req, res) => {
    const userId = req.body.user_id;

    const user = await User.findById(userId)

    if (!user) {
        return res.status(404).json({
            status: 'error',
            message: 'user not found'
        });
    }

    await RefreshToken.deleteOne({ user_id: userId });

    return res.json({
        status: 'success',
        message: 'refresh token deleted'
    })

}