
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY || 'secret';


const generateToken = (user) => {
  const data = {
    time: Date(),
    username: user.username,
  };
  const token = jwt.sign(data, secretKey, { expiresIn: '1h' });
  return token;
};

const decodeToken = (token) => {
  const decoded = jwt.verify(token, secretKey, (err, decoded) => {
    return err ? false : decoded;
  });
  return decoded;
};



module.exports = { generateToken, decodeToken };