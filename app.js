const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const accountRoutes = require('./routers/accountRouter')
const customerRoutes = require('./routers/customerRouter')
const fixerRoutes = require('./routers/fixerRouter')
const itemRoutes = require('./routers/items')
const jobRoutes = require('./routers/jobs')

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

app.use('/account', accountRoutes)
app.use('/customer', customerRoutes)
app.use('/fixer', fixerRoutes)
app.use('/items', itemRoutes)
app.use('/jobs', jobRoutes)

module.exports = app