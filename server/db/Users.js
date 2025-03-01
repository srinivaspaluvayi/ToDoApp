const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    key: { type: String, required: true, unique: true }
}, { versionKey: false });


const User = mongoose.model('Users', userSchema);

exports.User = User;