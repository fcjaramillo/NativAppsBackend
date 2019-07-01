const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Estudiante = require('../models/Estudiante')
const Curso = require('../models/Curso')

router.get('/', async (req, res) => {
    try{
        await Estudiante.find({}, function(err, estudiantes){
            Curso.populate(estudiantes, {path: "cursos"},function(err, estudiantes){
                res.status(200).send(estudiantes);
            })
        })
    } catch (err){
        console.log('err: ' + err)
        res.status(500).send(err.message)
    }
})

router.get('/:id', async (req,res) =>{
    try{
        const estudiante = await Estudiante.findById(req.params.id)
        res.json(estudiante)
    } catch (err){
        console.log('err: ' + err)
        res.status(500).send(err.message)
    }
})

router.post('/', async (req,res) => {
    try{
        const estudiante = new Estudiante(req.body)
        await estudiante.save()
        res.json({
            status : 'Estudiante guardado'
        })
        //console.log(req.body)
    } catch (err){
        console.log('err: ' + err)
        res.status(500).send(err.message)
    }
})

router.put('/:id', async (req, res) => {
    console.log(req.params.id)
    try{
        await Estudiante.findByIdAndUpdate(req.params.id, req.body)
        res.json({
            status: 'Estudiante modificado'
        })
    } catch (err){
        console.log('err: ' + err)
        res.status(500).send(err.message)
    }
})

router.delete('/:id', async (req, res) => {
    try{
        await Estudiante.findByIdAndDelete(req.params.id)
        res.json({
            status: 'Estudiante borrado'
        })
    } catch (err){
        console.log('err: ' + err)
        res.status(500).send(err.message)
    }
})

router.post('/adicionarCurso', async (req,res) => {
    try{
        const estudiante = await Estudiante.findById(req.body.idE)
        if(estudiante != null){
            const curso = await Curso.findById(req.body.idC)
            if(curso != null){
                var noExiste = true
                estudiante.cursos.forEach(e => {
                    if(e.toString() === req.body.idC)
                        noExiste = false
                });
                if(noExiste){
                    estudiante.cursos.push(req.body.idC)
                    await estudiante.save()
                    curso.numEstudiantes += 1
                    await curso.save()
                    res.status(200).send('Curso Asignado al estudiante '+ estudiante.nombre)    
                } else {
                    res.status(500).send('El curso no se asigno al estudiante por que ya esta registrado.')
                }
            } else{
                res.status(500).send('El curso no se asigno al estudiante por que no existe.')
            }
        } else {
            res.status(500).send('El curso no se asigno al estudiante por que el estudiante no existe.')
        }
    } catch{
        res.status(500).send('Se produjo un error al asignar el curso')
    }
})

router.post('/eliminarCurso/', async (req,res) => {
    try{
        const estudiante = await Estudiante.findById(req.body.idE)
        if(estudiante != null){
            const curso = await Curso.findById(req.body.idC)
            if(curso != null){
                var Existe = false
                estudiante.cursos.forEach(e => {
                    if(e.toString() === req.body.idC)
                        Existe = true
                });
                if(Existe){
                    estudiante.cursos.pull(req.body.idC)
                    await estudiante.save()
                    curso.numEstudiantes -= 1
                    await curso.save()   
                    res.status(200).send('Curso Desasignado al estudiante '+ estudiante.nombre)
                } else {
                    res.status(500).send('El curso no se desasigno al estudiante por que no lo tenia asignado.')
                }
            } else{
                res.status(500).send('El curso no se desasigno al estudiante por que no existe.')
            }
        } else {
            res.status(500).send('El curso no se desasigno al estudiante por que el estudiante no existe.')
        }
    } catch{
        res.status(500).send('Se produjo un error al desasignar el curso.')
    }
})

module.exports = router