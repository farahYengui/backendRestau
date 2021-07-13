const mysql = require('../mysql')
const jwt = require("jsonwebtoken");

function signinController(req, res, next) {
    
            mysql.query('SELECT etudiant.restaurant, etudiant.solde, etudiant.nom, etudiant.prenom,etudiant.inscription, etudiant.mdp, liste.restaurant FROM etudiant INNER JOIN liste ON etudiant.restaurant=liste.id WHERE cin=? ',[req.body.cin],
            function (error,results,fields) {
                if (error) { return next(error)};
                if (!results.length) { return res.status(200).json({error: "Aucun étudiant ne correspond au numéro de CIN entrée."})}
                if (!results[0].inscription) { return res.status(200).json({ error: "Etudiant non inscrit"})} 
                if (req.body.mdp!==results[0].mdp) {return res.status(200).json({error: "Mot de passe incorrect"})}
                jwt.sign({ cin: req.body.cin }, process.env.PRIVATE_KEY, function (err, token) {
                    if (err) return next(err);
                    res.status(200).json({
                        token: token,
                        restaurant: results[0].restaurant,
                        nom: results[0].nom ,
                        prenom: results[0].prenom,
                        solde: results[0].solde,

                    })
                });
            })
         
}

module.exports = signinController