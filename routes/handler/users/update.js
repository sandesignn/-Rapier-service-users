const User = require('../../../models/User');
const bcrypt = require('bcrypt');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {
    const shcema = {
        name: 'string|empty:false',
        email: 'email|empty:false',
        password: 'string|min:6',
        avatar: 'string|optional'
    }

    const validate = v.validate(req.body, shcema);

    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        });
    }

    const id = req.params.id;

    const user = await User.findById(id);

    if (!user) {
        return res.status(404).json({
            status: 'error',
            message: 'user not found'
        });
    }

    const email = req.body.email;

    if (email) {
        const checkEmail = await User.findOne({ email: email });

        if (checkEmail && email !== user.email) {
            return res.status(404).json({
                status: 'error',
                message: 'email already exist'
            });
        }
    }

    const password = await bcrypt.hash(req.body.password, 10);

    const {
        name, avatar
    } = req.body;

    await user.updateOne({
        name,
        email,
        password,
        avatar
    });

    return res.json({
        status: 'success',
        data: {
            id: user.id,
            email,
            name,
            avatar
        }
    })

}