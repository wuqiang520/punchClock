const crypto = require('crypto');

// HMAC 算法集合
const HMAC = {

  // HMAC_SHA1 加密算法
  HmacSHA1(plainText, secret) {
    return crypto.createHmac('sha1', secret).update(plainText).digest('hex').toUpperCase(); //16进制  
  }

}

module.exports = HMAC;
