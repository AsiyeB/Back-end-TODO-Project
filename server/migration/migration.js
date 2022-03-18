const dotenv = require('dotenv').config({
  path: '../.env'
})
const env = dotenv.parsed
console.log(env)

const {
  Client
} = require('pg')

const config = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
  connectionString: process.env.PGURL
}
const client = new Client(config)

client
  .connect()
  .then(() => {
    return client.query('select * from member')
  })
  .then((res) => {
    console.log(res.rows[0])
    return client.end()
  })
  .catch(e => console.error(e.stack))
