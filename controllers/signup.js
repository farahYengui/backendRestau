const mysql = require('../mysql')
const jwt = require("jsonwebtoken");

function signupController(req, res, next) {
    mysql.query('UPDATE etudiant SET nom=?, prenom=?, mdp=?, inscription=? WHERE cin=?',
        [req.body.nom, req.body.prenom, req.body.mdp, 1, req.body.cin],
        function (error, results, fields) {
            if (error) {
                return next(error)
            }
            jwt.sign({ cin: req.body.cin }, process.env.PRIVATE_KEY, function (err, token) {
                if (err) return next(err);
                res.status(200).json({
                    token
                })
            });
        })
}

module.exports = signupController