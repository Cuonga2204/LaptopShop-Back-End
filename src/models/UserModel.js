const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
    {
        name: { type: String },
        email: { type: String, required: true },
        password: { type: String, required: true },
        role: { type: String, default: 'user', require: true },
        avatar: { type: String, },
        phone: { type: Number },
    },
    {
        timestamps: true
    }
);
const User = mongoose.model("User", userSchema);
module.exports = User;