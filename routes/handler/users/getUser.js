const User = require('./../../../models/User');

module.exports = async (req, res) => {

    const id = req.params.id;
    const user = await User.findOne({ _id: id });

    if (!user) {
        return res.status(404).json({
            status: 'error',
            message: 'user not found'
        })
    }

    return res.json({
        status: 'success',
        data: user
    })
}