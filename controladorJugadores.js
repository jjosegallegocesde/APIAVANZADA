//Paquete Express
const express = require('express');
const app = express();

//Paquete body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//paquete del modelo jugador (importar el esquema desde el modelo)
const JugadorModelo = require('./modeloJugador');

//Paquete de underscore
let under = require('underscore');


//OPERACIONES DEL API(servicios)

app.get('/jugadores/:id', function(peticion, respuesta) {

    //1. Recibir el id del documento a buscar en la colección
    let identificador = peticion.params.id;

    //2. Ejecutar la operación de mongoose para buscar un documento por id
    JugadorModelo.findById(identificador, (err, resultado) => {

        if (err) {

            respuesta.status(400).json({
                mensaje: err,
                estado: false
            });

        } else {

            respuesta.json({
                jugador: resultado
            });

        }


    });



});


app.post('/jugadores', function(peticion, respuesta) {

    //1. Se traen los datos desde el cliente
    let datos = peticion.body;

    //2. Armo un objeto acorde a mi esquema
    let jugadorAGuardar = new JugadorModelo({

        nombre: datos.nombre,
        edad: datos.edad,
        posicion: datos.posicion,
        equipo: datos.equipo

    });

    //3. Guarde los datos
    jugadorAGuardar.save((err, resultado) => {

        if (err) {

            respuesta.status(400).json({
                mensaje: err,
                estado: false
            })

        } else {

            respuesta.json({
                mensaje: 'Jugador agregado con exito'

            })

        }
    });
});


app.put('/jugadores/:id', function(peticion, respuesta) {

    //1. Recibir los datos que voy  a actualizar
    let datos = peticion.body;

    //2. Filtrar los datos con underScore (_)
    let datosActualizar = under.pick(datos, ["edad", "equipo"]);

    //3. Recibir el id o identificador del documento a actualizar
    let identificador = peticion.params.id;

    //4. Eejcutar la operación para actualizar datos (1.id a actualizar 2. datos a ctualizar 3. callback para manejo error)
    JugadorModelo.findByIdAndUpdate(identificador, datosActualizar, (err, resultado) => {

        if (err) {

            respuesta.status(400).json({
                mensaje: err,
                estado: false
            });

        } else {
            respuesta.json({
                mensaje: 'Jugador editado con exito',
            });
        }

    });
});



app.delete('/jugadores/:id', function(peticion, respuesta) {

    //1. Recibir el id del documento a eliminar
    let identificador = peticion.params.id;

    //ejecutar la función de mongoose para eliminar un documento de una colección
    JugadorModelo.findByIdAndRemove(identificador, (err, resultado) => {

        if (err) {
            respuesta.status(400).json({
                mensaje: err,
                estado: false
            });

        } else {

            respuesta.json({
                mensaje: "Jugador eliminado con éxito de la BD"
            });

        }


    });


});


module.exports = app;