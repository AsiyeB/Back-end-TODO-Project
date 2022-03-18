exports.ok = (response, data, statusCode) => {
  if (statusCode === 201) {
    response.statusCode = 201
  } else {
    response.statusCode = 200
  }
  response.setHeader('Content-Type', 'application/json')
  response.write(JSON.stringify(data))
  response.end()
}

exports.error = (response, data, statusCode) => {
  if (statusCode === 404) {
    response.statusCode = 404
  } else if (statusCode === 400) {
    response.statusCode = 400
  } else {
    response.statusCode = 401
  }
  // else{
  //   response.statusCode = 401
  // }
  response.setHeader('Content-Type', 'application/json')
  const body = {
    statusCode: response.statusCode
  }
  data = { ...body, ...data }
  response.write(JSON.stringify(data))
  response.end()
}
