const mongoose = require('mongoose')
const Curso = require('../models/Curso')

const { Schema } = mongoose

const Estudiante = new Schema({
    nombre: { 
        type: String, 
        maxlength: [100, 'El tamaño maximo para el nombre del estudiante debe ser de 100 caracteres.'], 
        trim: true, 
        lowercase: true, 
        match: [/^[A-Za-z]+$/, 'Por favor ingresar un nombre valido para el Estudiante, es decir con solo letras.'],
        required: 'El nombre del estudiante es obligatorio.', 
    }, 
    apellido: {
        type: String, 
        maxlength: [100, 'El tamaño maximo para el apellido del estudiante debe ser de 100 caracteres.'], 
        trim: true, 
        match: [/^[A-Za-z]+$/, 'Por favor ingresar un apellido valido para el Estudiante, es decir con solo letras.'],
        lowercase: true
    },
    edad: { 
        type: Number, 
        min: [0, 'El estudiante no puede tener una edad negativa.'], 
        max: [150, 'La edad maxima de nuestros estudiantes es de 150 años.'], 
        match : [/^[0-9]+$/, 'La edad del Estudiante debe ser un numero positivo.'],
        required: 'La edad del estudiante es obligatoria.', 
    },
    correo: { 
        type: String, 
        maxlength: [150, 'El tamaño maximo para el correo del estudiante debe ser de 100 caracteres.'], 
        trim: true, 
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor ingresar un correo valido para el Estudiante.'],
        required: 'El correo del estudiante es obligatorio.'
    },  
    cursos: [{
            type: Schema.Types.ObjectId,
            ref: 'Curso.schema',
            default: []
        }
    ]
}, 
{ 
    versionKey: false,
    collection: 'Estudiantes'
})

module.exports = mongoose.model('Estudiante', Estudiante)

