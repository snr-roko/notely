const {successResponse} = require('../utils/responses')

const customServerError = (error, request, response, next) => {
  console.log(error.message)
  payload = successResponse('Something went wrong', [])
  response.status(500).json(payload)
}

module.exports = customServerError