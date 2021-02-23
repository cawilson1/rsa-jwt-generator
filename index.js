const jwt = require("jsonwebtoken");
const fs = require("fs");
const { promisify } = require("util");
const privateKey = fs.readFileSync("./keys/private-key.pem");
const publicKey = fs.readFileSync("./keys/public-key.pem");

const signJWT = promisify(jwt.sign);
const verifyJWT = promisify(jwt.verify);

signJWT({ foo: "bar", exp: Math.floor(Date.now() / 1000) + 12 }, privateKey, {
  algorithm: "RS256"
})
  .then(token => {
    console.log(token);
    return token;
  })
  .then(token => verifyJWT(token, publicKey))
  .then(decodedToken => console.log(decodedToken))
  .catch(err => console.log(err));
