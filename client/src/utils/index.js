import joi from "joi";

export const signUpSchema = joi.object({
  name: joi.string().required(),
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .required(),
  password: joi
    .string()
    .custom((value, helper) => {
      const specialChars = "!@#$%^&*()-_=+|{};:/?.>`~";
      const numbers = "0123456789";
      let containsSpChars = false;
      let containsNo = false;
      if (value.length < 8) {
        return helper.message("Password must be at least 8 characters long");
      }

      for (let i = 0; i < value.length; i++) {
        if (specialChars.includes(value[i])) {
          containsSpChars = true;
        }
      }
      for (let i = 0; i < value.length; i++) {
        if (numbers.includes(value[i])) {
          containsNo = true;
        }
      }

      if (!containsSpChars) {
        return helper.message(
          "Password must contain at least one special character"
        );
      }
      if (!containsNo) {
        return helper.message("Password must contain at least one number");
      }
      return true;
    })
    .required(),
  confirmPassword: joi.string().required(),
  profilePicture: joi.object({ url: joi.string().required() }),
});
export const loginSchema = joi
  .object({
    email: joi
      .string()
      .email({ tlds: { allow: false } })
      .required(),
    password: joi.string().required(),
  })
  .unknown();
