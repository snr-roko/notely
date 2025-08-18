const express = require('express')
const {port, mongoUrl} = require('./utils/config')
const path = require('path')
const app = express()
const mongoose = require('mongoose')
const notesRouter = require('./routes/noteRouter')
const customServerError = require('./controllers/error_handler')
const cors = require('cors')

app.use(cors())

app.use(express.static(path.join(__dirname, '../notely-frontend/dist')));

mongoose.connect(mongoUrl).then(() => {
  console.log('Connected to dateabase successfully')
}).catch(error => {
  console.log('Error connecting to database: ', error.message)
})

app.use(express.json())
app.use('/api/notes', notesRouter)

app.use(customServerError)

app.listen(port, () => {
  console.log(`Notely Backend started on port ${port}`)
})