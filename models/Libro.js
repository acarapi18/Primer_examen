const mongoose = require('mongoose');

const libroEsquema = new mongoose.Schema({
    titulo : String,
    autor : String,
    editorial : String,
    genero : String,
    edicion : Number
})

const LibroModel = mongoose.model('Libro',libroEsquema,'libro');
module.exports = LibroModel;
