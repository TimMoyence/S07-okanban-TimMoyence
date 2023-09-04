require('dotenv').config();
const path = require('path');
const express = require('express');
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

    TOPO pour mise en place de la politique de CORS sur un serveur express :

    1 - installer le module cors :
    npm install cors

    2 - require le module (dans le point d'entrée) :
    const cors = require('cors'); 

    3 - brancher le middleware cors sur notre application express :
    app.use(cors());
    */
}));

// pour réagir aux formulaires, on rajoute ce middleware
app.use(express.urlencoded({ extended: true }));


app.use(router);


app.set('port', process.env.PORT || 5000);
app.set('base_url', process.env.BASE_URL + ':' + app.get('port'));


app.listen(app.get('port'), () => {
        console.log(`Listening on ${process.env.BASE_URL
    }:${process.env.PORT}`);
});
