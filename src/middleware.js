const Joi = require('joi');

async function validateUser(req, res, next) {
  const schema = Joi.object({
    // eslint-disable-next-line newline-per-chained-call
    email: Joi.string().trim().email().lowercase().required(),
    // eslint-disable-next-line newline-per-chained-call
    password: Joi.string().trim().min(5).max(10).required(),
  });

  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    console.log('schema.validateAsync error ===', error);
    res.status(400).json(error.details);
  }
}

module.exports = {
  validateUser,
};
