const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "jwtsecret";

/**
 * Creates a JSON Web Token (JWT) for the given user.
 *
 * @param {Object} user - The user object containing the user's ID.
 * @returns {string} - The generated JWT.
 *
 * @throws Will throw an error if the JWT_SECRET environment variable is not set.
 *
 */
module.exports.createToken = (user) => {
  //create jsonwebtoken
  const jsonWebToken = jwt.sign(
    {
      id: user.id,
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
  return jsonWebToken;
};

/**
 * Creates a cookie with the user's JWT and adds it to the response.
 *
 * @param {Object} res - The response object to which the cookie will be added.
 * @param {string} jsonWebToken - The JSON Web Token (JWT) to be stored in the cookie.
 * @param {Date} expiresIn - The expiration date of the cookie. Default is 7 days from the current date.
 * @returns {Object} - The response object with the added cookie.
 *
 */
module.exports.createAndAddCookie = (
  res,
  jsonWebToken,
  expiresIn = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
) => {
  return res.cookie("userId", jsonWebToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresIn,
  });
};
