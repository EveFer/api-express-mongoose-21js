import mongoose from 'mongoose'
import express from 'express'
import * as dotenv from 'dotenv'

import {Koder} from './models/koders.model.js'

dotenv.config() // cargar todas la variables de entorno

const  {DB_USER, DB_PASSWORD, DB_NAME, DB_HOST} = process.env
const URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`


const server = express()

// middleware
server.use(express.json())

// Routers


server.get('/koders', async (request, response) => {
    const allKoders = await Koder.find({})
    response.json({
        success: true,
        data: {
            koders: allKoders
        }
    })
})


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

