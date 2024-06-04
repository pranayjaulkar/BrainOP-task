const joi = require("joi");

const userSchema = joi.object({
  _id: joi.allow(),
  name: joi.string().required(),
  email: joi.string().email({ minDomainSegments: 2 }).required(),
  password: joi.string().required(),
  profilePicture: joi.object({ url: joi.string().required() }),
  createdAt: joi.date().allow(),
});

const postSchema = joi
  .object({
    _id: joi.allow(),
    title: joi.string().min(1).max(50).required(),
    content: joi.string().min(1).required(),
    images: joi
      .array()
      .items(joi.object({ url: joi.string().required() }))
      .min(1),
    author: joi.allow(),
    createdAt: joi.allow(),
  })
  .unknown();
module.exports = { postSchema, userSchema };
