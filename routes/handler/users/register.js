const User = require("../../../models/User");
const Validator = require("fastest-validator");
const bcrypt = require('bcrypt');
const v = new Validator();

module.exports = async (req, res) => {
    const schema = {
        name: 'string|empty:false',
        email: 'email|empty:false',
        password: 'string|min:4',
    }
    const validate = v.validate(req.body, schema);
    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        });
    }

    const user = await User.findOne({ email: req.body.email });

    if (user) {
        return res.status(409).json({
            status: 'error',
            message: 'email already exist'
        });
    }

    const password = await bcrypt.hash(req.body.password, 10);
    const { name, email, phoneNumber, avatar } = req.body;

    const createdUser = await User.create({ name: name, email: email, password: password, phoneNumber: phoneNumber, avatar: avatar });

    return res.json({
        status: 'success',
        data: {
            id: createdUser.id
        }
    })
}