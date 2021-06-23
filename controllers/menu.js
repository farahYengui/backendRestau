function menu (req, res, next) {
    if (req.query.type === 'dejeuner'){
        res.status(200).json({
            menu: req.user.dejeuner
        })
    }
    else {
            res.status(200).json({
                menu: req.user.diner
            })   
    }
}

module.exports = menu