const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    key: { type: String, required: true, unique: true }
});

const User = mongoose.model('Users', userSchema);

const checkCredentials = async function(email, password, callback) {
    try {

        const user = await User.findOne({ email: email });
        
        if (user && user.password === password) {
            callback(user.key);
        } else {
            callback(null);
        }
    } catch (err) {
        console.log(err);
        callback(null);
    }
};



const Credential = class Credential {
    static verifyCredentials(email, password, callback) {
        checkCredentials(email, password, callback);
    }
};


module.exports = Credential;
