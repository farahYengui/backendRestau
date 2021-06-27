function menu (req, res, next) {
   
        res.status(200).json({
            dejeuner: req.user.dejeuner,
            diner: req.user.diner,
            notedej: req.user.notedej,
            notediner: req.user.notediner,
           
        })
    
}

module.exports = menu