const dotenv = require('dotenv').config({
  path: './../../.env'
})
const env = dotenv.parsed
console.log(env)

// const uuidv4 = require('uuid/v4')
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

exports.getTasks = (todoId) => {
  let result
  const client = new Client(config)
  return client
    .connect()
    .then(() => {
      if (todoId) {
        const query = client.query('SELECT * FROM taskinfo where todoid=($1)', [todoId])
        return query
      } else {
        const query = client.query('SELECT * FROM taskinfo')
        return query
      }
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
exports.getNumTaskOfBoard = (boardId) => {
  let result
  const client = new Client(config)
  return client
    .connect()
    .then(() => {
      if (boardId) {
        const query = client.query('SELECT COUNT(taskid) from todoinfo,taskinfo where taskinfo.todoid=todoinfo.todoid and boardid = ($1) ', [boardId])
        return query
      }
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
exports.getNumRemainTaskOfBoard = (boardId) => {
  let result
  const client = new Client(config)
  return client
    .connect()
    .then(() => {
      if (boardId) {
        const query = client.query('SELECT COUNT(taskid) from todoinfo,taskinfo where taskinfo.todoid=todoinfo.todoid and boardid = ($1) and taskinfo.checked = false ', [boardId])
        return query
      }
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
exports.getTaskById = (taskId) => {
  let result
  const client = new Client(config)
  return client
    .connect()
    .then(() => {
      const query = client.query('SELECT * FROM taskinfo WHERE taskid=($1)', [taskId])
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

exports.addTask = (task) => {
  let result
  const client = new Client(config)
  return client
    .connect()
    .then(() => {
      // const taskId = uuidv4()
      return client.query(`INSERT INTO taskinfo(description,memberid,todoid,checked) 
                    VALUES ($1, $2, $3, $4);`, // eslint-disable-next-line indent
        [task.description, task.memberId, task.todoId, task.checked])
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

exports.updateTask = (taskId, memberId, task) => {
  let result
  const client = new Client(config)
  return client
    .connect()
    .then(() => {
      return client.query(`UPDATE taskinfo SET taskid =($1),description =($2),memberid =($3),todoid =($4),checked =($5) WHERE taskid=($1);`,
        // eslint-disable-next-line indent
        [taskId, task.description, memberId, task.todoId, task.checked])
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

exports.removeTask = (taskId) => {
  let result
  const client = new Client(config)
  return client
    .connect()
    .then(() => {
      return client.query(`DELETE FROM taskinfo WHERE taskid=($1)`, [taskId])
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
exports.getImage = (taskId) => {
  let result
  const client = new Client(config)
  return client
    .connect()
    .then(() => {
      return client.query(`SELECT image FROM taskinfo,member WHERE taskid=($1) AND taskinfo.memberid=member.memberid`, [taskId])
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
