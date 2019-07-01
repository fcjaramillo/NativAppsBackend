const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Curso = require('../models/Curso')

/* router.get('/', async (req, res) => {
    await Curso.find({}, function(err, cursos){
        res.status(200).send(cursos);
    })
})
*/

router.get('/', async (req, res) => {
    try{
        const cursos = await Curso.find()
        res.json(cursos)
    } catch (err){
        console.log('err: ' + err)
        res.status(500).send(err.message)
    }
})

router.get('/:id', async (req,res) =>{
    try{
        const curso = await Curso.findById(req.params.id)
        res.json(curso)
    } catch (err){
        console.log('err: ' + err)
        res.status(500).send(err.message)
    }
})

router.post('/', async (req,res) => {
    try{
        const curso = new Curso(req.body)
        await curso.save()
        res.json({
            status : 'Curso guardado'
        })
    } catch (err){
        console.log('err: ' + err)
        res.status(500).send(err.message)
    }
})

router.put('/:id', async (req, res) => {
    try{
        await Curso.findByIdAndUpdate(req.params.id, req.body)
        res.json({
            status: 'Curso modificado'
        })
    } catch (err){
        console.log('err: ' + err)
        res.status(500).send(err.message)
    }
})

router.delete('/:id', async (req, res) => {
    try{
        await Curso.findByIdAndDelete(req.params.id)
        res.json({
            status: 'Curso borrado'
        })
    } catch (err){
        console.log('err: ' + err)
        res.status(500).send(err.message)
    }
})

router.get('/obtener/masEstudiantes/', async (req, res) => {
    try{
        var fechaMeses = new Date();
        fechaMeses.setMonth(fechaMeses.getMonth() - 6)
        const cursos = await Curso.find({ fechaInicio: {$gte: fechaMeses, $lt: new Date() }}, null, { sort: { numEstudiantes: -1 }, limit: 3 })
        res.json(cursos)
    } catch (err){
        console.log('err: ' + err)
        res.status(500).send(err.message)
    }
})

module.exports = router