const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
    {
        name: { type: String },
        email: { type: String, required: true },
        password: { type: String, requiredd: true },
        isAdmin: { type: Boolean, default: false, require: true },
        imageUrl: { type: String, },
        phone: { type: Number },
    },
    {
        timestamps: true
    }
);
const User = mongoose.model("User", userSchema);
module.exports = User;