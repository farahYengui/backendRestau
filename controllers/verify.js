function verify(req, res, next) {
        if (req.user.code === req.body.code) {
                mysql.query("UPDATE etudiant SET solde=? WHERE cin=?", [req.user.solde - 1, req.user.cin],
                        function (error, results, fields) {
                                if (error) { return next(error) };
                                mysql.query("UPDATE liste SET entree=2 WHERE restaurant=?", [req.user.restaurant],
                                        function (error, results, fields) {
                                                if (error) { return next(error) };
                                                res.status(200).json({
                                                        success: true
                                                })
                                        })
                        })

        } else {
                mysql.query("UPDATE liste SET entree=1 WHERE restaurant=?", [req.user.restaurant],
                        function (error, results, fields) {
                                if (error) { return next(error) };
                                res.status(200).json({
                                        success: false
                                })
                        })

        }

}

module.exports = verify