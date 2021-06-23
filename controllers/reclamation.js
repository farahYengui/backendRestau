const mysql = require("../mysql");

function reclamation (req,res,next) {
    mysql.query('UPDATE etudiant SET reclamation =? WHERE cin=?',[req.body.reclamation,req.user.cin],
                function (error,results,fields){
                    if (error) return next(error)
                    res.status(200).json({
                        success: true
                    })
                })
}

module.exports = reclamation