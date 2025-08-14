const express = require('express')
const {port} = require('./utils/config')
const app = express()


app.listen(port, () => {
  console.log(`Notely Backend started on port ${port}`)
})