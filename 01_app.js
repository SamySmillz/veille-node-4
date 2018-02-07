const express = require('express');
const app = express();
let compteur=0;
console.log('initialise compteur = ' + compteur);

app.get('/', (req, res) => {
  console.log('incrémente compteur dans la route = ' + compteur++);
   res.send('<h1>Vive Express</h1>');
})

const server = app.listen(8081, () => {
   let host = server.address().address
   let port = server.address().port
   
   console.log("Le serveur Express écoute http://%s:%s", host, port)
})