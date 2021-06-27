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

exports.noteSchema = Joi.object({
    note: Joi.boolean().required(),
    type: Joi.any().valid('dejeuner','diner').required(),
}).required()

exports.reclSchema = Joi.object ({
    reclamation: Joi.string().required()
}).required()

exports.buySchema = Joi.object({
    type: Joi.any().valid("Carte e-Dinar", "Carte bancaire"),
    num: Joi.string().length(16).required(),
    code: Joi.string().required(),
    exp: Joi.string().length(5)
}).required()