const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const refreshTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
    },
    user_id: {
        type: ObjectId,
        ref: 'users'
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('refresh_token', refreshTokenSchema);
