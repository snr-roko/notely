const {errorResponse} = require('../utils/responses')

const customServerError = (error, request, response, next) => {
  console.log(error.message)
  payload = errorResponse('Something went wrong', [])
  response.status(500).json(payload)
}

module.exports = customServerError