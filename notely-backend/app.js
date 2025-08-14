const express = require('express')
const {port, mongoUrl} = require('./utils/config')
const app = express()
const mongoose = require('mongoose')
const notesRouter = require('./routes/noteRouter')

mongoose.connect(mongoUrl).then(() => {
  console.log('Connected to dateabase successfully')
}).catch(error => {
  console.log('Error connecting to database: ', error.message)
})

app.use(express.json())
app.use('/api/notes', notesRouter)

app.listen(port, () => {
  console.log(`Notely Backend started on port ${port}`)
})