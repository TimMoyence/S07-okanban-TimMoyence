require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require("express-session");
const cors = require('cors');
const app = express();
const router = require('./app/router.js');

app.use(express.json());

app.use(cors({
    origin: '*', // avec cette configuration (ou pas de configuration du tout), on autorise l'acces à nos ressources depuis n'importe quelle origine
    /*
    Pour autoriser seulement les requêtes depuis les domaines http://127.0.0.1:5501, http://127.0.0.1:5500 et http://www.monsite.com on utiliserait la configuration ci-dessous :
    origin: ['http://127.0.0.1:5501', 'http://127.0.0.1:5500', 'http://www.monsite.com'],

    Note, en production, il est conseillé de règler finement notre politique de CORS.
    */
}));

app.use(express.static("dist"));
// pour réagir aux formulaires, on rajoute ce middleware
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 60 * 60 * 10000 * 24,
    },
  })
);

app.use(router);


app.set('port', process.env.PORT || 5000);
app.set('base_url', process.env.BASE_URL + ':' + app.get('port'));


app.listen(app.get('port'), () => {
        console.log(`Listening on ${process.env.BASE_URL
    }:${process.env.PORT}`);
});
