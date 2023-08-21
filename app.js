const express = require('express')
const cors = require('cors')
const logger = require('morgan')

const app = express()

app.use(cors())
app.use(express.json())
app.use(logger('dev'))

app.get('/', (req, res) => {
    res.json({
      name: "Florin recycle cafe",
      description: "Come and save the environment with us"
    })
})

module.exports = app