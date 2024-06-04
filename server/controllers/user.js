const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const saltRounds = process.env.SALT_ROUNDS || 10;
const { createAndAddCookie, createToken } = require("../utils/index.js");

/**
 * Handles user login.
 *
 * @param {Object} req - The request object containing the user's email and password.
 * @param {Object} res - The response object to send back to the client.
 * @returns {void}
 */
module.exports.login = async (req, res) => {
  let userData = req.body;
  let user = await User.findOne({ email: userData.email });
  //if user exists then sign in else return user not signed up

  if (user) {
    // compare given password to password hash
    const match = await bcrypt.compare(userData.password, user.password);
    if (!match) {
      return res.status(403).json({ error: "INCORRECT_EMAIL_OR_PASSWORD" });
    }
    // create JWT token
    const jsonWebToken = createToken(user);
    // add token to cookie
    createAndAddCookie(res, jsonWebToken);
    res.status(200).json(user);
  } else {
    return res.status(404).json({ error: "USER_NOT_FOUND" });
  }
};

/**
 * Handles user login.
 *
 * @param {Object} req - The request object containing the user's email and password.
 * @param {Object} res - The response object to send back to the client.
 * @returns {void}
 */
module.exports.signUp = async (req, res) => {
  let userData = req.body;
  const foundUser = await User.findOne({ email: userData.email });
  //if user already exists then return error response
  if (foundUser) {
    return res.status(400).json({ error: "USER_ALREADY_EXISTS" });
  } else {
    // hash password with bcrypt
    const password = await bcrypt.hash(userData.password, saltRounds);
    // create new user
    const newUser = new User({ ...userData, password });
    // save user to database
    let user = await newUser.save();
    // create JWT token
    const jsonWebToken = createToken(user);
    // add token to cookie
    createAndAddCookie(res, jsonWebToken);
    res.status(200).json(user);
  }
};

/**
 * Handles user login.
 *
 * @param {Object} req - The request object containing the user's email and password.
 * @param {Object} res - The response object to send back to the client.
 * @returns {void}
 */

module.exports.logout = async (req, res) => {
  // Clear the JWT cookie by setting its value to an empty string and expiration date to the past.
  createAndAddCookie(res, "", new Date(Date.now()));

  // Send a 200 OK response to the client.
  res.status(200).send();
};

/**
 * Handles user login.
 *
 * @param {Object} req - The request object containing the user's email and password.
 * @param {Object} res - The response object to send back to the client.
 * @returns {void}
 */
module.exports.getUser = async (req, res) => {
  // get user from database
  const user = await User.findById(req.userId);
  // create JWT token to refresh token expiry date
  // this way the user never gets logged out if he continuously visits the website
  const jsonWebToken = createToken(user);
  // add token to cookie
  createAndAddCookie(res, jsonWebToken);
  // send user to client
  res.status(200).json(user);
};
