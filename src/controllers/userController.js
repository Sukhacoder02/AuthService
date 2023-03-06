
const userServices = require('../services/userServices');
// require jsonwebtoken
const jwt = require('jsonwebtoken');
const HttpError = require('../utils/HttpError');
// require jwtUtils
const jwtUtils = require('../utils/jwtUtils');



const createUser = async (req, res) => {
  const createdUser = await userServices.createUser(req.body);
  res.status(201).json(createdUser);
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await userServices.loginUser(email, password);
    res.status(200).json({ token });
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.code).json(error.message);
    }
    else {
      console.log(error);
      res.status(500).json('Internal server error');
    }
  }
};
const validateToken = async (req, res) => {
  try {
    const { token } = req.headers;
    console.log(token);
    const user = await userServices.validateToken(token);
    res.status(200).json(user);
  } catch (err) {
    if (err instanceof HttpError) {
      res.status(err.code).json(err.message);
    }
    else {
      console.log(err);
      res.status(500).json('Internal server error');
    }
  }

};
module.exports = { createUser, loginUser, validateToken };