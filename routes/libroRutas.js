const express = require('express');
const rutas = express.Router();
const LibroModel = require('../models/Libro');

// Punto 2
//implementacion correcta de operaciones CRUD
//Leer
rutas.get('/', async (req, res) =>{
    try {
        const libros = await LibroModel.find();
        res.json(libros);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});
//Crear
rutas.post('/agregar', async (req, res) =>{
    const nuevoLibro = new LibroModel({
        titulo: req.body.titulo,
        autor: req.body.autor,
        editorial: req.body.editorial,
        genero: req.body.genero,
        edicion: req.body.edicion
    });
    try {
        const guardarLibro = await nuevoLibro.save();
        res.status(201).json(guardarLibro);
        
    } catch(error){
        res.status(400).json({mensaje: error.message});
    }
});
//Actualizar
rutas.put('/editar/:id', async (req, res) =>{
    try {
        const actualizarLibro = await LibroModel.findByIdAndUpdate(req.params.id, req.body, { new: true});
        res.status(201).json(actualizarLibro);
        
    } catch(error){
        res.status(400).json({mensaje: error.message});
    }
});
//Eliminar
rutas.delete('/eliminar/:id', async (req, res) =>{
    try {
        const eliminarLibro = await LibroModel.findByIdAndDelete(req.params.id);
        res.json({mensaje: 'Libro eliminado correctamente'});
        
    } catch(error){
        res.status(400).json({mensaje: error.message});
    }
});
//consultas ----------------------

rutas.get('/filtra_libro/:id', async (req, res) =>{
    try {
        console.log(req.params.id);
        const filtraLibro = await LibroModel.find({ editorial: req.params.id});
        res.json(filtraLibro);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});
  
// - Ordenar los libros por edicion de forma ascendente
rutas.get('/ordenar_libro', async (req, res) =>{
    try {
        const libroASC = await LibroModel.find().sort({edicion: 1});
        res.json(libroASC);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});
// - Consultar el liro mas reciente anadida a la base de datos
rutas.get('/libro_reciente', async (req, res) => {
    try {
      const libroReciente = await LibroModel.find().sort({_id: -1}).limit(1);
      res.json(libroReciente[0]); // Respuesta simplificada
    } catch (error) {
      console.error(error); // Registrar el error
      res.status(500).json({ mensaje: "Error al obtener el libro reciente" }); // Mensaje de error más informativo
    }
  });
module.exports = rutas;