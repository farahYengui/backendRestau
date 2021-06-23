const mysql = require("../mysql");

function buy(req, res, next) {
    mysql.query("UPDATE etudiant SET solde=? WHERE cin=?", [req.user.solde+5,req.user.cin],
    function (error,results,fields){
    if (error) { return next(error)};
    res.status(200).json({
        success: true,
        balance: req.user.solde+5
    })
    })
}

module.exports = buy