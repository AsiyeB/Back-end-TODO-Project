
const {
  Client
} = require('pg')

const config = {
  // user: process.env.PGUSER,
  // password: 'partintern',
  // database: process.env.PGDATABASE,
  // port: '5432',
  // connectionString: 'postgres://maz:partintern@192.168.4.179:5432/todo',
  // statement_timeout: process.env.PGTIMEOUT
  user: process.env.PGUSER,
  password: 'partintern',
  database: process.env.PGDATABASE,
  port: '5432',
  connectionString: 'postgres://maz:partintern@5.39.44.17:5432/todo',
  statement_timeout: process.env.PGTIMEOUT
}
//console.log(process.env)

exports.getBoardById = (id) => {
  let result
  const client = new Client(config)
  return client
    .connect()
    .then(() => {
      let query
      if (id) {
        query = client.query('SELECT * FROM boardinfo WHERE boardid=($1)', [id])
      } else {
        query = client.query('SELECT * FROM boardinfo')
        console.log(query)
      }
      return query
    })
    .then((res) => {
      result = res
      return client.end()
    })
    .then((res) => {
      return result
    })
    .catch((e) => {
      console.error(e.stack)
      throw e
    })
}
exports.getBoard = () => {
  let result
  const client = new Client(config)
  return client
    .connect()
    .then(() => {
      let query
      // eslint-disable-next-line prefer-const
      query = client.query('SELECT * FROM boardinfo')
      console.log(query)
      return query
    })
    .then((res) => {
      result = res
      return client.end()
    })
    .then((res) => {
      return result
    })
    .catch((e) => {
      console.error(e.stack)
      throw e
    })
}
exports.addBoard = (board) => {
  let result
  const client = new Client(config)
  return client
    .connect()
    .then(() => {
      // const id = 1256
      return client.query(`INSERT INTO boardinfo(boardid,nameboard,ownerid) 
                    VALUES ($1, $2, $3);`,
      // eslint-disable-next-line indent
        [board.id, board.name, board.owner])
    })
    .then((res) => {
      result = res
      return client.end()
    })
    .then((res) => {
      return result
    })
    .catch((e) => {
      console.error(e.stack)
      throw e
    })
}
