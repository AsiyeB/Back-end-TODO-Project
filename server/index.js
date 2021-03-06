
const http = require('http')
const router = require('./lib/router/router').router
const server = http.createServer()

server.on('request', function (request, response) {
  router.lookup(request, response)
})

server.listen(5000, function () {
  console.log(`server is running on port 5000`)
})
exports.server = server