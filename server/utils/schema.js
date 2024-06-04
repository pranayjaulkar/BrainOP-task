const joi = require("joi");

const userSchema = joi.object({
  _id: joi.allow(),
  name: joi.string().required(),
  email: joi.string().email({ minDomainSegments: 2 }).required(),
  password: joi.string().required(),
  profilePicture: joi.object({ url: joi.string().required() }),
  createdAt: joi.date().allow(),
});

module.exports = {  userSchema };
