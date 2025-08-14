require('dotenv').config()

const mongoUrl = process.env.MONGOURI
const port = process.env.PORT || 8080

module.exports = {mongoUrl, port}