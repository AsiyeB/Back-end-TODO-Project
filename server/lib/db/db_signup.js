const dotenv = require('dotenv').config({
  path: '../../.env'
})
const env = dotenv.parsed
console.log(env)
// const uuidv4 = require('uuid/v4')
const config = {
  // user: process.env.PGUSER,
  // password: process.env.PGPASSWORD,
  // database: process.env.PGDATABASE,
  // port: process.env.PGPORT,
  // connectionString: process.env.PGURL,
  // statement_timeout: process.env.PGTIMEOUT
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
  connectionString: 'postgres://maz:partintern@5.39.44.17:5432/todo',
  statement_timeout: process.env.PGTIMEOUT
}
const {
  Pool
} = require('pg')

const pool = new Pool(config)
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})
exports.getUser = (username) => {
  let query
  if (username) {
    query = pool.query(`SELECT * FROM member WHERE username= ($1);`,
    // eslint-disable-next-line indent
    [username])
    // console.log(query)
  } else {
    query = pool.query('SELECT * FROM member')
  }
  return query
    .then((result) => {
      return result
    })
    .catch((e) => {
      console.error(e.stack)
      throw e
    })
}

exports.addUser = (user) => {
  return pool.query(`INSERT INTO member(firstname,lastname, image,username, password, salt) 
                    VALUES ($1, $2, $3,$4,$5,$6);`,
  // eslint-disable-next-line indent
    [user.firstname, user.lastname, user.image, user.username, user.passwordHash, user.salt])
    .then((result) => {
      return result
    })
    .catch((e) => {
      
      throw e
    })
}
