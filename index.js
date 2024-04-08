const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
//importar rutas
const libroRutas = require('./routes/libroRutas');
//configuraciones
const app = express();
const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGO_URL;
//configurar express para JSON
app.use(express.json());
//conexion con la db
mongoose.connect(MONGODB_URI)
    .then(() => {
                console.log('conexion con MONGODB exitosa');
                app.listen(PORT, () => { console.log(`Servidor funcionando en el puerto: ${PORT}`) });
            })
    .catch( error => console.log("Error de conexion con MongoDB", error));

app.use('/ruta_libro',libroRutas)
