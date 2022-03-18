const {
  Client
} = require('pg')

const config = {
  user: process.env.PGUSER,
  password: 'partintern',
  database: process.env.PGDATABASE,
  port: '5432',
  connectionString: 'postgres://maz:partintern@5.39.44.17:5432/todo',
  statement_timeout: process.env.PGTIMEOUT
  // user: process.env.PGUSER,
  // password: process.env.PGPASSWORD,
  // database: process.env.PGDATABASE,
  // port: process.env.PGPORT,
  // connectionString: 'postgres://maz:partintern@5.39.44.17:5432/todo',
  // statement_timeout: process.env.PGTIMEOUT
}

exports.getBoard = (id) => {
  let result
  const client = new Client(config)
  return client
    .connect()
    .then(() => {
      let query
      if (id) {
        // console.log(id)
        query = client.query('SELECT * FROM boardinfo WHERE boardid=($1)', [id])

      }
      else {
        query = client.query('SELECT * FROM boardinfo')
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
exports.addBoard = (board, ownerid) => {
  let result
  const client = new Client(config)
  console.log('m')
  console.log(board.ownerid)
  return client
    .connect()
    .then(() => {
      
      return client.query(`INSERT INTO boardinfo(nameboard,ownerid)
                      VALUES ($1, $2);`, [board.name, ownerid])
        .then(() => {
          return client.query('SELECT * FROM boardinfo ORDER BY boardid DESC LIMIT 1')

        })
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

exports.updateBoard = (id, board) => {
  let result
  const client = new Client(config)
  return client
    .connect()
    .then(() => {
      return client.query(`UPDATE boardinfo SET boardid =($1),nameboard =($2) where boardid=($1);`,
        // eslint-disable-next-line indent
        [id, board.name])
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

exports.removeBoard = (id) => {
  let result
  const client = new Client(config)
  return client
    .connect()
    .then(() => {
      // return client.query(`DELETE FROM todoinfo WHERE boardid=($1)`, [id])
      // .then(() => {
      return client.query(`DELETE FROM boardmember WHERE boardid=($1)`, [id])
        .then(() => {
          return client.query(`DELETE FROM taskinfo WHERE todoid IN (SELECT todoid FROM todoinfo WHERE boardid=($1))`, [id])
            .then(() => {
              return client.query(`DELETE FROM todoinfo WHERE boardid=($1)`, [id])
                .then(() => {
                  return client.query(`DELETE FROM boardinfo WHERE boardid=($1)`, [id])
                })
            })
        })
      // })
    })
    .then((res) => {
      result = res
      return client.end()
    })
    .then((res) => {
      return result
    })
    .catch((e) => {
      throw e
    })
}
exports.getlastBoard = () => {
  let result
  const client = new Client(config)
  return client
    .connect()
    .then(() => {
      const query = client.query('SELECT * FROM boardinfo ORDER BY boardid DESC LIMIT 1')
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
