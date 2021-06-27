const mysql = require('../mysql')

function note (req, res, next) {
    if (req.body.type==='dejeuner'){
    if ((req.body.note ? 1 : 2) === req.user.notedej) return next(new Error("déjà noté"))
    mysql.query('UPDATE etudiant SET notedej=? WHERE cin=? ',
        [req.body.note ? 1 : 2 , req.user.cin],
        function (error, results, fields) {
            if (error) {
                return next(error)
            }
            mysql.query(`UPDATE liste SET jaimedej=?, jedetestedej=? WHERE id = ?`,
            [req.body.note ? req.user.jaimedej+1 : (req.user.notedej === 0 ? req.user.jaimedej : req.user.jaimedej -1), 
            (!req.body.note) ? req.user.jedetestedej+1 : (req.user.notedej === 0 ? req.user.jedetestedej : req.user.jedetestedej -1),
            req.user.restaurant],
            function (error, results, fields) {
                if (error) {
                    return next(error)
                }
                res.status(200).json({
                    success: true
                })
            })
        })
        }else if (req.body.type==='diner'){
            if ((req.body.note ? 1 : 2) === req.user.notediner) return next(new Error("déjà noté"))
            mysql.query('UPDATE etudiant SET notediner=? WHERE cin=? ',
        [req.body.note ? 1 : 2 , req.user.cin],
        function (error, results, fields) {
            if (error) {
                return next(error)
            }
            mysql.query(`UPDATE liste SET jaimediner=?, jedetestediner=? WHERE id = ?`,
            [req.body.note ? req.user.jaimediner+1 : (req.user.notediner === 0 ? req.user.jaimediner : req.user.jaimediner -1), 
            (!req.body.note) ? req.user.jedetestediner+1 : (req.user.notediner === 0 ? req.user.jedetestediner : req.user.jedetestediner -1),
            req.user.restaurant],
            function (error, results, fields) {
                if (error) {
                    return next(error)
                }
                res.status(200).json({
                    success: true
                })
            })
        })

        } else {
         return next(new Error('invalide'))
        }
}

module.exports = note