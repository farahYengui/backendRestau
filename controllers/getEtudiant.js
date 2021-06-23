const mysql = require('../mysql')

function getEtudiantController(req, res, next) {
    mysql.query('SELECT e.ville, e.faculte, e.inscription, l.restaurant FROM etudiant e INNER JOIN liste l ON e.restaurant = l.id WHERE e.cin=?', [req.params.cin],
        function (error, results, fields) {
            if (error) {
                return res.status(200).json({ error: "Aucun étudiant ne correspond au numéro de CIN entré." })
            }
            if (results[0].inscription === 1) {
                return res.status(200).json({error: "L'étudiant est déjà inscrit."})
            }
            res.status(200).json({
                restaurant: results[0].restaurant,
                city: results[0].ville,
                university: results[0].faculte
            })
        })
}

module.exports = getEtudiantController;