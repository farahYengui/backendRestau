const mysql = require('../mysql')
const jwt = require("jsonwebtoken");

function signinController(req, res, next) {
    
            mysql.query('SELECT etudiant.restaurant, etudiant.solde, etudiant.nom, etudiant.prenom,etudiant.inscription, etudiant.mdp, liste.restaurant FROM etudiant INNER JOIN liste ON etudiant.restaurant=liste.id WHERE cin=? ',[req.body.cin],
            function (error,results,fields) {
                if (error) { return next(error)};
                if (!results.length) { return next(new Error("Aucun étudiant ne correspond au numéro de CIN entrée."))}
                if (req.body.mdp!==results[0].mdp) {return next (new Error ("Mot de passe incorrect"))}
                jwt.sign({ cin: req.body.cin }, process.env.PRIVATE_KEY, function (err, token) {
                    if (err) return next(err);
                    res.status(200).json({
                        token: token,
                        restaurant: results[0].restaurant,
                        nom: req.body.nom ,
                        prenom: req.body.prenom,
                        solde: results[0].solde,

                    })
                });
            })
         
}

module.exports = signinController