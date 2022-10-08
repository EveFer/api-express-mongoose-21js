import mongoose from 'mongoose'
import express from 'express'
import * as dotenv from 'dotenv'
import { StatusHttp } from './errorCustom.js'

import {Koder} from './models/koders.model.js'

dotenv.config() // cargar todas la variables de entorno

const  {DB_USER, DB_PASSWORD, DB_NAME, DB_HOST} = process.env
const URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`


const server = express()

// middleware
server.use(express.json())

// Routers

// query params


server.get('/koders', async (request, response) => {
    try {
        const {gender, age} = request.query

        const filters = {}
        
        if(gender) {
            filters.gender = gender
        }

        if(age) filters.age = age 

        console.log(filters)
        
        const allKoders = await Koder.find(filters)
        response.json({
            success: true,
            data: {
                koders: allKoders
            }
        })
    } catch (error) {
        response.status(400).json({
            success: false,
            message: error.message
        })
    }
})



// POST /koders
server.post('/koders', async (request, response) => {
    try {
        const {body: newKoder} = request
        const koderCreated = await Koder.create(newKoder)

        response.json({
            success: true,
            message: 'Koder creado'
        })
    } catch (error) {
        response.status(400).json({
            success: false,
            message: error.message
        })
    }
})


// GET /koders/:id

server.get('/koders/:id', async (request, response) => {
    try {
        const {id} = request.params
        const koderFound = await Koder.findById(id)
        console.log(koderFound)

        // Lanzar un Error  - throw
        if(!koderFound) throw new StatusHttp('Koder no encontrado D:', 404)
        
        response.json({
            success: true,
            data: {
                koder: koderFound
            }
        })
    } catch (error) {
        response.status(error.status).json({
            success: false,
            message: error.message
        })
    }
    
})

// try catch

// throw


/*
Endpoints:
    GET /koders/:id
    PATCH /koders/:id
    DELETE /koders/:id
    POST /koders

     agreguenlo en un router de koders


     Investigar: 
        - middlewares en express
        
*/


mongoose.connect(URL)
    .then((connection) => {
        console.log('Database connected')

        server.listen(8080, () => {
            console.log('Server listening on port 8080')
        })
    })
    .catch(err => console.error('Error: ', err))

// iniciar el server - poner a escuchar

