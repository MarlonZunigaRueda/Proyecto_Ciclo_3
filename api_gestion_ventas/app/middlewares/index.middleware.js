const authJwt = require("./auth.jwt.middleware");
const verifySignUp = require("./verify.singup.middleware");

module.exports = {
    authJwt,
    verifySignUp
};