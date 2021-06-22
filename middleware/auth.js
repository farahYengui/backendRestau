const jwt = require("jsonwebtoken");
const mysql = require("../mysql");

function auth(req, res, next) {
    const header = req.get('authorization')
    if (!header || !header.startsWith('Bearer ')) {
        return next(new Error('unauthorized'))
    }
    const token = header.slice(7);
    jwt.verify(token, process.env.PRIVATE_KEY, function (error, data) {
        if (error || !data || !data.cin) return next(new Error('unauthorized'));
        mysql.query("SELECT etudiant.*, liste.restaurant FROM etudiant LEFT JOIN liste ON etudiant.restaurant = liste.id WHERE cin = ?", [data.cin], function (error, results, fields) {
            if (error) return next(new Error('unauthorized'));
            console.log(results);
            req.user = results[0];
            next();
        })
    })
}

module.exports = auth;