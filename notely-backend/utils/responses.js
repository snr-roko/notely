const successResponse = (message="", data=None) => {
  return {
    message: message,
    data: data,
  }
}

const errorResponse = (message="", errors=None) => {
  return {
    message: message,
    errors: errors,
  }
}

module.exports = {successResponse, errorResponse}