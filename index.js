require('dotenv').config()
const express = require('express')
const { signupSchema } = require('./validation')
const validate = require('./middleware/validate')
const auth = require('./middleware/auth')
const signupController = require('./controllers/signup')
const mysql = require('./mysql');

const app = express()

app.use(express.json());

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
//     success: boolean
//     data: {
//          restaurant: String,
//          city: String,
//          university: String
//      }
//     }


//signin:

//     POST /signin
//      body: {cin: String , password: String}
//     {
//      token: String
//     }


//App:

//     POST /verify
//      body:{code: String}
//     {
//      success: boolean
//     }

//     GET /menu?type=[diner||dejeuner]
//     {
//     menu: String
//     }



// /etudiant/me
//     POST /reclamation
//     {
//     success: boolean
//     }

//     GET /balance
//     {
//     balance: number
//     }

//     POST /buy?type=[edinar||master]
//      body: {num: number,code: number}
//     {
//      success: boolean
//      balance: number
//     }

app.get("/testauth", auth, (req, res, next) => {
    res.status(200).json("ok");
})

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