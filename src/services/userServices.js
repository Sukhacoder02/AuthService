
const { users } = require('../database/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const hashingUtils = require('./../utils/hashingUtils');
// require jwtUtils
const jwtUtils = require('./../utils/jwtUtils');
// require HttpError
const HttpError = require('../utils/HttpError');

const userServices = {
  'createUser': async (userDetails) => {
    const hashedPassword = await hashingUtils.encryptPassword(userDetails.password);
    userDetails.password = hashedPassword;
    const createdUser = await users.create(userDetails);
    return createdUser;
  },
  'loginUser': async (email, password) => {
    const gotUser = await users.findOne({
      where: {
        email
      }
    });
    if (!gotUser) {
      throw new HttpError(404, 'User doesn\'t exists');
    }
    const validPassword = await hashingUtils.comparePassword(password, gotUser.password);
    if (!validPassword) {
      throw new HttpError(401, 'Invalid Password');
    }
    const token = jwtUtils.generateToken(gotUser);
    return token;

  },
  'validateToken': async (token) => {
    const decodedToken = jwtUtils.decodeToken(token);
    if (!decodedToken) {
      throw new HttpError(401, 'Invalid Token');
    }
    const username = decodedToken.username;
    const user = await users.findOne({
      where: {
        username
      },
      attributes: [
        'id',
        'name',
        'username',
        'email'
      ]
    });
    return user;
  }
};
module.exports = userServices;