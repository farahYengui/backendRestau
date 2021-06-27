require('dotenv').config()
const express = require('express')
const { signupSchema,
        cinSchema, 
        loginSchema,
        verifySchema,
        reclSchema,
        buySchema,
        noteSchema,
        } = require('./validation')
const validate = require('./middleware/validate')
const auth = require('./middleware/auth')
const signupController = require('./controllers/signup')
const getEtudiantController = require('./controllers/getEtudiant')
const verifyController = require('./controllers/verify')
const menuController = require('./controllers/menu')
const noteController = require('./controllers/note')
const reclController = require('./controllers/reclamation')
const mysql = require('./mysql');
const signinController = require('./controllers/signin')
const buyController = require('./controllers/buy')
const morgan = require('morgan')

const app = express()

app.use(express.json());
app.use(morgan("dev"))
// GET POST PUT PATCH DELETE

//signup:

//  /
//     POST /signup
//     body: { cin: String, nom: String, prenom: String, mdp: String }
//     {
//     token: String
//     }

app.post("/signup", validate("body", signupSchema), signupController)


//     GET /etudiant/:cin
//     
//     {
//     data: {
//          restaurant: String,
//          city: String,
//          university: String
//      }
//     }

app.get("/etudiant/:cin", validate("params",cinSchema), getEtudiantController )

//signin:

//     POST /signin
//      body: {cin: String , password: String}
//     {
//      token: String
//      restaurant : String
//      nom: String
//      prenom: String
//     }
app.post("/signin", validate ("body",loginSchema),signinController)

//App:

//     POST /verify
//      body:{code: String}
//     {
//      success: boolean
//     }

app.post ("/verify", validate ("body", verifySchema),auth , verifyController)

//     GET /menu?type=[diner||dejeuner]
//     {
//     menu: String
//     }

app.get ("/menu",  auth, menuController)
app.post("/note", validate("body", noteSchema), auth, noteController)
// /etudiant/me
//     POST /reclamation
//     {
//     success: boolean
//     }

app.post ("/reclamation", validate ("body", reclSchema), auth, reclController )

//     POST /buy
//      body: {type: edinar|master, num: String,code: number, exp: String?}
//     {
//      success: boolean
//      balance: number
//     }

app.post("/buy", validate("body", buySchema), auth, buyController);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        message: err.message
    })
});

mysql.connect();

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})