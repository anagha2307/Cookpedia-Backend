require('dotenv').config()
const express = require('express')
const cors = require('cors')
require('./config/db')
const routes = require('./routing/routes')

const cookpediaServer = express()
cookpediaServer.use(cors())
cookpediaServer.use(express.json())
cookpediaServer.use(routes)

const Port = 3000
cookpediaServer.listen(Port,() => {
    console.log('Cookpedia Server started...');
})
cookpediaServer.get('/',(req,res) => {
    res.status(200).send(`<h1>Cookpedia Server started...Waiting for Client Request...!!!</h1>`)
})
