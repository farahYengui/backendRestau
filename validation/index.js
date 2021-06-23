const Joi = require("joi")

exports.signupSchema = Joi.object({
    cin: Joi.string().length(8).required(),
    nom: Joi.string().required(),
    prenom: Joi.string().required(),
    mdp: Joi.string().required(),
}).required()

exports.cinSchema = Joi.object({
    cin: Joi.string().length(8).required()
}).required()

exports.loginSchema = Joi.object({
    cin: Joi.string().length(8).required(),
    mdp: Joi.string().required(),
}).required()

exports.verifySchema =Joi.object ({
    code: Joi.string().length(8).required(),
}).required()

exports.menuSchema = Joi.object ({
    type: Joi.any().valid('diner','dejeuner').required()
}).required()

exports.reclSchema = Joi.object ({
    reclamation: Joi.string().required()
}).required()

exports.buySchema = Joi.object({
    type: Joi.any().valid("edinar", "master"),
    num: Joi.string().length(16).required(),
    code: Joi.string().length(8).required(),
    exp: Joi.string().length(5)
}).required()