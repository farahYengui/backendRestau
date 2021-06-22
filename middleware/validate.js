function validate (field,schema) {
    return (req,res,next) => {
        const resultat= schema.validate(req[field])
        if (resultat.error) {
            return next(resultat.error)
        }
        req[field]= resultat.value
         next();
    }
}
module.exports = validate