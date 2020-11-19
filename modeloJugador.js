//Paquete Mongoose
const mongoose = require('mongoose');

//Definir el esquema(estructura que tendra neustra coleccion)
let esquemaJugador = new mongoose.Schema({

    nombre: {
        type: String,
        required: [true, 'EL nombre es necesario para esta API']
    },
    edad: {
        type: Number,
        required: false
    },
    posicion: {
        type: String,
        required: false
    },
    equipo: {
        type: String,
        required: [true, 'El equipo del jugar es necesario para esta API']
    }

});

module.exports = mongoose.model('modeloJugador', esquemaJugador);