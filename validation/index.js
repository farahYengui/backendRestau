const Joi = require("joi")

exports.signupSchema = Joi.object({
    cin: Joi.string().length(8).required(),
    nom: Joi.string().required(),
    prenom: Joi.string().required(),
    mdp: Joi.string().required(),
}).required()
