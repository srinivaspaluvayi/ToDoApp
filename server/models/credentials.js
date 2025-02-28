const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    Key: { type: String, required: true, unique: true }
});

const User = mongoose.model('Users', userSchema);

const checkCredentials = async function(email, password, callback) {
    try {

        const user = await User.findOne({ email: email });
        
        if (user && user.password === password) {
            callback(true);
        } else {
            callback(false);
        }
    } catch (err) {
        console.log(err);
        callback(false);
    }
};



const Credential = class Credential {
    static verifyCredentials(email, password, callback) {
        checkCredentials(email, password, callback);
    }
};


module.exports = Credential;
