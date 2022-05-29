require("dotenv").config();
const CryptoJS = require("crypto-js");

class Crypto {
  constructor() {
    this.key = process.env.AES_KEY;
  }

  encrypt(text) {
    return CryptoJS.AES.encrypt(text, this.key).toString();
  }

  decrypt(text) {
    return CryptoJS.AES.decrypt(text, this.key).toString(CryptoJS.enc.Utf8);
  }

  encryptPassword(password) {
    return this.encrypt(password);
  }

  decryptPassword(password) {
    return this.decrypt(password);
  }

  encryptObject(object) {
    return this.encrypt(JSON.stringify(object));
  }

  decryptObject(object) {
    return JSON.parse(this.decrypt(object));
  }
}

module.exports = new Crypto();
