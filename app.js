//Paquete Express
const express = require('express');
const app = express();

//Paquete body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Paquete Mongoose
const mongoose = require('mongoose');

//Importemos y usemos el app de Express
app.use(require('./controladorJugadores'));


//Establecemos la conexion con la BD
mongoose.connect('mongodb://localhost:27017/jugadoresColombia', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection
    .once('open', () => console.log("Conectados a BD"))
    .on('error', (error) => { console.log("pilas ", error) });


//Establecemos la conexion con el servidor que tiene los servicios
app.listen(3000, () => {
    console.log("El servidor esta operativo en el puerto 3000");
});