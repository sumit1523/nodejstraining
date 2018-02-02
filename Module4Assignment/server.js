const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const errorHandler = require('errorhandler')
const mongoose = require('mongoose')
const routes = require('./routes')

mongoose.Promise = global.Promise
mongoose.connection.openUri('mongodb://localhost:27017/edx-course-db1')
if (mongoose.connection.readyState) console.log('Connected to MongoDB')

let app = express()
app.use(bodyParser.json())
app.use(logger('dev'))

// Account routes
app.get    ('/accounts',     routes.accounts.getAll)
app.post   ('/accounts',     routes.accounts.add)
app.get    ('/accounts/:id', routes.accounts.getById)
app.put    ('/accounts/:id', routes.accounts.update)
app.delete ('/accounts/:id', routes.accounts.delete)

// Catch undefined routes
app.get('*', routes.general.notFound)

app.use(errorHandler())
app.listen(3000)
console.log('Express server listening on http://localhost:3000/accounts')
