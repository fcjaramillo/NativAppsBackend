const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')

const app = express();

//Estableciendo comunicación con la BD de manera local
//mongoose.connect('mongodb://localhost/nativapps')


//Estableciendo comunicación con la BD de manera remota
mongoose.connect('mongodb+srv://FcJaramillo:luP4El242KFsIrGO@fcjaramillo-wyowr.mongodb.net/nativapps?retryWrites=true&w=majority')
    .then(db => console.log('BD esta conectada'))
    .catch(err => console.log(err))

//Settings
app.set('port', 4000)

//Middlewares
app.use(morgan('dev'))
app.use(express.json())

//Routes
app.use('/api/estudiantes', require('./src/routes/estudiante'))
app.use('/api/cursos', require('./src/routes/curso'))

//Server is listening
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
})