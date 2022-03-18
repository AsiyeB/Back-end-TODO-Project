
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
}
// console.log(process.env)

exports.getToDos = (boardId) => {
  let result
  const client = new Client(config)
  return client
    .connect()
    .then(() => {
      let query
      if (boardId) {
        query = client.query('SELECT * FROM todoinfo where boardid = ($1)', [boardId])
      } else {
        query = client.query('SELECT * FROM todoinfo')
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
exports.getNumTodosBoard = (boardId) => {
  let result
  const client = new Client(config)
  return client
    .connect()
    .then(() => {
      let query
      if (boardId) {
        query = client.query('SELECT COUNT(boardId) FROM todoinfo where boardid = ($1)', [boardId])
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
exports.getToDoById = (todoid) => {
  let result
  const client = new Client(config)
  return client
    .connect()
    .then(() => {
      const query = client.query('SELECT * FROM todoinfo WHERE todoid=($1)', [todoid])
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
exports.addToDo = (todo) => {
  let result
  const client = new Client(config)
  return client
    .connect()
    .then(() => {
      // const todoid = id++
      return client.query(`INSERT INTO todoinfo(header,boardid) 
                    VALUES ($1, $2);`,
        // eslint-disable-next-line indent
        [todo.header, todo.boardid])
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

exports.updateToDo = (todoid, todo) => {
  let result
  const client = new Client(config)
  return client
    .connect()
    .then(() => {
      return client.query(`UPDATE todoinfo SET todoid =($1),header =($2),boardid =($3) where todoid=($1);`,
        // eslint-disable-next-line indent
        [todoid, todo.header, todo.boardid])
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

exports.removeToDo = (todoid, todo) => {
  let result
  const client = new Client(config)
  return client
    .connect()
    .then(() => {
      // client.query(`DELETE * FROM taskinfo WHERE taskinfo.todoid=($1)`, [todoid])
      return client.query(`DELETE FROM todoinfo WHERE todoid=($1)`, [todoid])
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
exports.checkTask = (todoId) => {
  let result
  const client = new Client(config)
  return client
    .connect()
    .then(() => {
      const query = client.query('SELECT COUNT(taskid) from taskinfo where taskinfo.todoid=($1) and taskinfo.checked = true', [todoId])
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
exports.removeAllTasks = (todoId) => {
  let result
  const client = new Client(config)
  return client
    .connect()
    .then(() => {
      return client.query(`DELETE FROM taskinfo WHERE taskinfo.todoid=($1)`, [todoId])
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
