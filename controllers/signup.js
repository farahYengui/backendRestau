const mysql = require('../mysql')
const jwt = require("jsonwebtoken");

function signupController(req, res, next) {
    mysql.query('UPDATE etudiant SET nom=?, prenom=?, mdp=?, inscription=1 WHERE cin=? AND inscription=0',
        [req.body.nom, req.body.prenom, req.body.mdp, req.body.cin],
        function (error, results, fields) {
            if (error) {
                return next(error)
            }
            if (!results.affectedRows) {
                return next(new Error("cin non trouvé ou étudiant déjâ inscrit"))
            }
            mysql.query('SELECT etudiant.restaurant, etudiant.solde, liste.restaurant FROM etudiant INNER JOIN liste ON etudiant.restaurant=liste.id WHERE cin=?',[req.body.cin],
            function (error,results,fields) {
                if (error) { return next(error)};
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
           
        })
}

module.exports = signupController