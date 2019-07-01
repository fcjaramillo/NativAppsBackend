const mongoose = require('mongoose')

const { Schema } = mongoose

const Curso = new Schema({
    nombre: {
        type: String, 
        maxlength: [100, 'El tamaño maximo para el nombre del curso debe ser de 100 caracteres.'], 
        trim: true, 
        lowercase: true, 
        required: 'El nombre del curso es obligatorio.', 
    }, 
    horario: {
        type: String, 
        maxlength: [200, 'El tamaño maximo para el horario del curso debe ser de 200 caracteres.'], 
        trim: true, 
        lowercase: true, 
        required: 'El horario del curso es obligatorio.', 
    },
    fechaInicio: {
        type: Date, 
        required: 'La fecha Inicio del curso es obligatorio.', 
    },
    fechaFin: {
        type: Date, 
        required: 'La fecha Fin del curso es obligatorio.', 
    },
    numEstudiantes: {
        type: Number, 
        min: [0, 'El numero de estudiante no puede ser negativo.'], 
        match : [/^[0-9]+$/, 'El numero de Estudiantes para el curso debe ser un numero positivo.'],
        default: 0
    }
}, { 
    collection: 'Cursos',
    versionKey: false
})

module.exports = mongoose.model('Curso', Curso)