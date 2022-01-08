const Joi = require("@hapi/joi");

// regester validation

const regesterValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(4).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

// login validation
const loginValidation = (data) => {
    const schema = Joi.object({
      email: Joi.string().min(4).required().email(),
      password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
  };

module.exports.regesterValidation = regesterValidation
module.exports.loginValidation = loginValidation
