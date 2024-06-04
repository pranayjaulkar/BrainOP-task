const jwt = require("jsonwebtoken");
const customError = require("../utils/error.js");
const { userSchema } = require("../utils/schema");
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Middleware function to check if a user is logged in.
 * Extracts JWT token from cookie, verifies it, and attaches user ID to the request object.
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function in the stack
 *
 * @returns {void}
 */
module.exports.isLoggedIn = (req, res, next) => {
  try {
    if (req.cookies.userId) {
      // extract JWT token from cookie
      const jsonWebToken = req.cookies.userId;
      // verify JWT token
      const jsonWebTokenData = jwt.verify(jsonWebToken, JWT_SECRET);
      //check if user ID exists
      if (jsonWebTokenData?.id) {
        // attach user ID to the request object
        req.userId = jsonWebTokenData.id;
      } else {
        // if user ID does not exist, return 401 error
        return res.status(400).json({ error: "INVALID_JWT" });
      }
    } else {
      // if JWT token does not exist, return 401 error
      return res.status(400).json({ error: "JWT_NOT_FOUND" });
    }
    // call the next middleware function
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "TOKEN_EXPIRED" });
    } else {
      next({ ...error, at: "/middleware/index.js" });
    }
  }
};

/**
 * Middleware function to validate user data.
 * Uses the userSchema to validate the request body.
 * Throws a custom error if validation fails.
 *
 * @param {Object} req - The request object containing the user data to be validated.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function in the stack.
 *
 * @throws {customError} Throws a custom error if validation fails.
 *
 * @returns {void}
 */

module.exports.validateUser = async (req, res, next) => {
  try {
    // Validate the request body
    const { error } = userSchema.validate(req.body);
    if (error) {
      // if validation error throw customError
      throw new customError(error, 400);
    }
    next();
  } catch (error) {
    // if any other error throw customError
    next({ ...error, at: "/middleware/index.js" });
  }
};
