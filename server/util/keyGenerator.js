const crypto = require("crypto");

const randomKeyGen =  function (email, password) {
    const hash = crypto.createHash("sha256");
    hash.update(email + password); 
    return hash.digest("hex"); 
}

exports.randomKeyGen = randomKeyGen;