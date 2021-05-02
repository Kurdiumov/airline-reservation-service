import Joi from "@hapi/joi";

const validateRegister = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    surname: Joi.string().min(2).max(255).required(),
    email: Joi.string().email().min(6).max(255).required(),
    password: Joi.string().min(6).max(255).required()
  });

  return schema.validate(data);
};

const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().min(6).max(255).required(),
    password: Joi.string().min(6).max(255).required()
  });

  return schema.validate(data);
};

export default {
  ValidateRegister: validateRegister,
  ValidateLogin: validateLogin
};
