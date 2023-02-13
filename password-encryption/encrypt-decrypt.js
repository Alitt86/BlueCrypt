const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const password = crypto.randomBytes(32).toString('hex');
const iv = crypto.randomBytes(16);

async function encrypt(text) {
  return new Promise((resolve, reject) => {
    try {
      const cipher = crypto.createCipheriv(algorithm, Buffer.from(password, 'hex'), iv);
      let encrypted = cipher.update(text, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      resolve(encrypted);
    } catch (error) {
      reject(error);
    }
  });
}

async function decrypt(encrypted) {
  return new Promise((resolve, reject) => {
    try {
      const decipher = crypto.createDecipheriv(algorithm, Buffer.from(password, 'hex'), iv);
      let decrypted = decipher.update(encrypted, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      resolve(decrypted);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  encrypt,
  decrypt
};
