const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.static('public'));
let identifiant = 3;

const transforme_en_tableau = (tableau) => {



    let chaine = '<head><meta charset="UTF-8"><link rel="stylesheet" type="text/css" href="/css/style.css"></head><table><tr><th>Prénom</th><th>Nom de famille</th><th>Téléphone</th><th>Courriel</th><th>Id</th></tr>';
    for (elm of tableau) {
        chaine += '<tr>';
        for (p in elm) {
            chaine += '<td>' + elm[p] + '</td>';
        }
        chaine += '</tr>';

    }

    chaine += '</table>'
    return chaine;
}

app.get('/formulaire', (req, res) => {
    console.log(__dirname);
    res.sendFile(__dirname + "/public/html/" + "01-forme.html");
})

app.get('/', (req, res) => {
    console.log('accueil')
    res.end('<h1>Accueil</h1>')
})

app.get('/traiter_get', (req, res) => {
    // Preparer l'output en format JSON

    console.log('la route /traiter_get')
    identifiant++;

    // on utilise l'objet req.query pour récupérer les données GET
    reponse = {
        prenom: req.query.prenom,
        nom: req.query.nom,
        telephone: req.query.telephone,
        courriel: req.query.courriel,
        id: identifiant
    };
    console.log(reponse);
    fs.appendFile('public/data/membres.txt', ',' + JSON.stringify(reponse), (err) => {
        if (err) throw err;
        console.log('Sauvegardé');
    });
    res.end(JSON.stringify(reponse));
    //tu sauvegardes dans le fichier membres.txt 
})

app.get('/membres', (req, res) => {
    fs.readFile(__dirname + "/public/data/" + "membres.txt", 'utf8', (err, data) => {
        if (err) {
            return console.error(err);
        }
        console.log(data);
        res.end(transforme_en_tableau(JSON.parse('[' + data + ']')));
    });
})

let server = app.listen(8081, function() {
    let host = server.address().address
    let port = server.address().port

    console.log("Exemple l'application écoute sur http://%s:%s", host, port)

})  