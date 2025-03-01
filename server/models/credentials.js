const {User} = require("../db/Users");

const checkCredentials = async function(email, password, callback) {
    try {
        const user = await User.findOne({ email: email });
        
        if (user && user.password === password) {
            callback(user.key);
        } else {
            callback(null);
        }
    } catch (err) {
        callback(null);
    }
};



const Credential = class Credential {
    static verifyCredentials(email, password, callback) {
        checkCredentials(email, password, callback);
    }

    static async isUserRegistered(email, callback){
        try{
            const user = await User.findOne({ email: email });
            if (user) {
                callback(true);
            }
            else{
                callback(false);
            }
        }
        catch(err){
            callback(true);
        }
    }

    static async addUser(email, password, key, callback){
        try{
            const newUser = new User({email: email, password: password, key: key});
            await newUser.save();
            callback(true);
        }catch(err){
            console.log(err);
            callback(false);
        }
    }
};


module.exports = Credential;
