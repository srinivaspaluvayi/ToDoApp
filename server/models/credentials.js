
const checkCredentials =  function(email, password, callback){
    const eId = "abc@gmail.com";
    const pwd = "1234";
    console.log(email, password);
    if(email===eId && password===pwd){
        callback(true);
    }
    else{
        callback(false);
    }
}
const Credential = class Credential{
    static verifyCredentials(email, password, callback) {
        checkCredentials(email, password, callback);
    }
}

module.exports = Credential;