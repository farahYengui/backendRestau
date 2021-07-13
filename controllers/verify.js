const mysql = require('../mysql')

function verify(req, res, next) {
        if (req.user.code === req.body.code && req.user.solde > 0) {
                mysql.query("UPDATE etudiant SET solde=? WHERE cin=?", [req.user.solde - 1, req.user.cin],
                        function (error, results, fields) {
                                if (error) { return next(error) };
                                mysql.query("UPDATE liste SET entree=2 WHERE id=?", [req.user.restaurant],
                                        function (error, results, fields) {
                                                if (error) { return next(error) };
                                                res.status(200).json({
                                                        success: true,
                                                        balance: req.user.solde - 1
                                                })
                                        })
                        })

        } else {
                mysql.query("UPDATE liste SET entree=1 WHERE id=?", [req.user.restaurant],
                        function (error, results, fields) {
                                if (error) { return next(error) };
                                res.status(200).json({
                                        success: false,
                                        error: req.user.solde > 0 ? "Il ne s'agit pas du code de votre restaurant universitaire." : "Vous n'avez pas de solde"
                                })
                        })

        }

}

module.exports = verify