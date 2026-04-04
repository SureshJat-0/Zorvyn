import joi from "joi";
import { errorResponse } from "../utils/apiResponse.js";

const transactionValidateSchemaJoi = joi.object({
  body: joi
    .object({
      amount: joi.number().required(),
      type: joi.string().valid("income", "expense").required(),
      category: joi.string().required(),
      date: joi.date().required(),
      description: joi.string().required(),
    })
    .required(),
});

const validateTransactionJoi = (req, res, next) => {
  const body = req.body;
  const { error, value } = transactionValidateSchemaJoi.validate({ body });
  if (error)
    return errorResponse(
      res,
      `Validation error: ${error.details[0].message}`,
      error,
      422,
    );
  next();
};

const transactionUpdateValidationSchemaJoi = joi.object({
  body: joi.object({
    amount: joi.number(),
    type: joi.string().valid("income", "expense"),
    category: joi.string(),
    date: joi.date(),
    description: joi.string(),
  }),
});

const validateTransactionUpdateJoi = (req, res, next) => {
  const body = req.body;
  const { error, value } = transactionUpdateValidationSchemaJoi.validate({
    body,
  });
  if (error)
    return errorResponse(
      res,
      `Validation error: ${error.details[0].message}`,
      error,
      422,
    );
  next();
};

export { validateTransactionJoi, validateTransactionUpdateJoi };
