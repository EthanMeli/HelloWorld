const Joi = require('joi');

const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: 'Validation error',
        details: error.details.map(detail => detail.message)
      });
    }
    next();
  };
};

const schemas = {
  register: Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).required(),
    activeLanguage: Joi.string().valid('fr', 'de').required()
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),

  updateProfile: Joi.object({
    username: Joi.string().min(3).max(30),
    activeLanguage: Joi.string().valid('fr', 'de')
  }),

  createDeck: Joi.object({
    name: Joi.string().min(1).max(100).required(),
    description: Joi.string().allow(''),
    language: Joi.string().valid('fr', 'de').required()
  }),

  createCard: Joi.object({
    front: Joi.string().required(),
    back: Joi.string().required(),
    hint: Joi.string().allow(''),
    difficulty: Joi.number().integer().min(1).max(5)
  }),

  reviewCard: Joi.object({
    rating: Joi.number().integer().min(0).max(5).required()
  })
};

module.exports = {
  validateRequest,
  schemas
};
