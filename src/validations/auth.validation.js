import joi from "joi";
import { errorResponse } from "../utils/apiResponse.js";

const registerValidationSchemaJoi = joi.object({
  body: joi
    .object({
      name: joi.string().required(),
      email: joi.string().email().required(),
      password: joi.string().required(),
    })
    .required(),
});

const validateRegisterJoi = (req, res, next) => {
  const body = req.body;
  const { error, value } = registerValidationSchemaJoi.validate({ body });
  console.log(error);
  if (error)
    return errorResponse(
      res,
      `Validation error: ${error.details[0].message}`,
      error,
      422,
    );
  next();
};

const loginValidationSchemaJoi = joi.object({
  body: joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  }),
});

const validateLoginJoi = (req, res, next) => {
  const body = req.body;
  const { error, value } = loginValidationSchemaJoi.validate({ body });
  if (error)
    return errorResponse(
      res,
      `Validation error: ${error.details[0].message}`,
      error,
      422,
    );
  next();
};

export { validateRegisterJoi, validateLoginJoi };
