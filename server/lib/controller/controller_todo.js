const Ajv = require('ajv')
const getRawBody = require('raw-body')

const url = require('url')
const db = require('../db/db_todo')
const {
  ok,
  error
} = require('../util/response')
const schema = require('../schema/schema_todo')

const ajv = new Ajv({
  allErrors: true
})
const {
  hasAccess
} = require('../auth/auth')
/**
 * @api {get} /api/todo  get all todos.
 * @apiName getToDos.
 * @apiGroup todos.
 *
 * @apiParam .
 *
 * @apiSuccess {Object[]} todos  array of todos in board.
 * @apiError (400) validatonError The todo id is not valid.
 */
exports.getToDos = (requst, response) => {
  const hasAccessResult = hasAccess(requst)
  if (hasAccessResult.verify) {
    var query = url.parse(requst.url, true).query
    const temp = query
    temp.boardid = parseInt(query.boardid)
    const validBoard = ajv.validate(schema.boardIdSchema, temp)
    const validatonError = ajv.errors
    if (temp.boardid) {
      console.log('has query string')
      if (validBoard) {
        db.getToDos(temp.boardid)
          .then((result) => {
            ok(response, result.rows, 200)
          })
          .catch((err) => {
            const responseBody = {
              status: 'not found',
              message: 'Cannot find a todo with this id'
            }
            err = { ...err, ...responseBody }
            error(response, err, 404)
          })
      } else {
        error(response, validatonError, 400)
      }
    } else {
      db.getToDos()
        .then((result) => {
          ok(response, result, 200)
        })
        .catch((err) => {
          const responseBody = {
            status: 'not found',
            message: 'Cannot find a todo with this id'
          }
          err = { ...err, ...responseBody }
          error(response, err, 404)
        })
    }
  } else {
    error(response, { message: 'Not authorized' }, 401)
  }
}
exports.getNumTodosBoard = (requst, response, params) => {
  const hasAccessResult = hasAccess(requst)
  if (hasAccessResult.verify) {
    const temp = params
    temp.boardid = Number(params.boardid)
    const validBoard = ajv.validate(schema.boardIdSchema, temp)
    const validatonError = ajv.errors
    if (validBoard) {
      // console.log('correct todoId')
      db.getNumTodosBoard(temp.boardid)
        .then((result) => {
          ok(response, result.rows[0].count, 200)
        })
        .catch((err) => {
          const responseBody = {
            status: 'not found',
            message: 'Cannot find a board with this id'
          }
          err = { ...err, ...responseBody }
          error(response, err, 404)
        })
    } else {
      error(response, { message: 'Validation Error' }, 400)
    }
  } else {
    error(response, { message: 'Not authorized' }, 401)
  }
}
/**
 * @api {get} /api/:todoId  get todo by specific id.
 * @apiName getToDoById.
 * @apiGroup todo.
 *
 * @apiParam {string} todoId  id of todo.
 *
 * @apiSuccess {String} header  title of todo.
 * @apiSuccess {Object[]} tasks  array of taskes in todo.
 * @apiSuccess {String} boardId  boardId of same todos .
 * @apiSuccess {String} todoId  id of todo .
 * @apiError (400) ValidatonError The todo id is not valid.
 * @apiError (404) NotFound The todo id is not found.
 */
exports.getToDoById = (requst, response, params) => {
  const hasAccessResult = hasAccess(requst)
  if (hasAccessResult.verify) {
    const temp = params
    temp.todoid = parseInt(params.todoid, 10)
    const validToDo = ajv.validate(schema.todoIdSchema, temp)
    const validatonError = ajv.errors
    if (validToDo) {
      db.getToDoById(temp.todoid)
        .then((result) => {
          ok(response, result, 200)
        })
        .catch((err) => {
          const responseBody = {
            status: 'not found',
            message: 'Cannot find a todo with this id'
          }
          err = { ...err, ...responseBody }
          error(response, err, 404)
        })
    } else {
      error(response, validatonError, 400)
    }
  } else {
    error(response, { message: 'Not authorized' }, 401)
  }
}
/**
 * @api {post} /api/todo  add new todo.
 * @apiName addToDo.
 * @apiGroup todo.
 *
 * @apiParam .
 *
 * @apiSuccess (201) {object} status  todo created.message: todo Successfully Added.
 * @apiError (400) {object} ValidatonError The todoSchema is not valid.
 * @apiError (400) {object} CatchError The body is probably empty or is not in json type.
 */
exports.addToDo = (requst, response) => {
  const hasAccessResult = hasAccess(requst)
  if (hasAccessResult.verify) {
    getRawBody(requst)
      .then((bodyBuffer) => {
        const body = JSON.parse(bodyBuffer.toString())
        const valid = ajv.validate(schema.todoSchema, body)
        // const validatonError = ajv.errors
        if (valid) {
          db.addToDo(body)
            .then((result) => {
              ok(response, { message: 'Successfully Added' }, 201)
            })
            .catch((err) => {
              error(response, err)
            })
        } else {
          error(response, { message: 'Validation Error' }, 400)
        }
      }).catch((err) => {
        const body = {
          message: 'The body is probably empty or is not in json type'
        }
        err = { ...err, ...body }
        error(response, err, 400)
      })
  } else {
    error(response, { message: 'Not authorized' }, 401)
  }
}
/**
 * @api {put} /api/todo/:todoId  update todo by specific id.
 * @apiName updateToDo.
 * @apiGroup todo.
 *
 * @apiParam {string} todoId  id of todo.
 *
 * @apiSuccess (200) {object} status  ok.message  todo Successfully Updated.
 * @apiError (400) {object} ValidatonError The todoSchema is not valid.
 * @apiError (400) {object} CatchError The body is probably empty or is not in json type.
 * @apiError (404) {object} NotFound The todo id is not found.
 */
exports.updateToDo = (requst, response, params) => {
  const hasAccessResult = hasAccess(requst)
  if (hasAccessResult.verify) {
    const temp = params
    temp.todoid = parseInt(params.todoid, 10)
    getRawBody(requst)
      .then((bodyBuffer) => {
        const body = JSON.parse(bodyBuffer.toString())
        const valid = ajv.validate(schema.todoSchema, body)
        const validatonError = ajv.errors
        if (valid) {
          db.updateToDo(temp.todoid, body)
            .then((result) => {
              if (result.rowCount) {
                const responseBody = {
                  status: 'ok',
                  message: 'Successfully Updated'
                }
                result = { ...result, ...responseBody }
                ok(response, result, 200)
              } else {
                const responseBody = {
                  status: 'not found',
                  message: 'Cannot find a todo with this id'
                }
                error(response, responseBody, 404)
              }
            })
            .catch((err) => {
              const responseBody = {
                status: 'not found',
                message: 'Cannot find a todo with this id'
              }
              err = { ...err, ...responseBody }
              error(response, err, 404)
            })
        } else {
          error(response, { message: 'Validation Error' }, 400)
        }
      })
      .catch((err) => {
        const body = {
          message: 'The body is probably empty or is not a json'
        }
        err = { ...err, ...body }
        error(response, err, 400)
      })
  } else {
    error(response, { message: 'Not authorized' }, 401)
  }
}
/**
 * @api {delete} /api/todo/:todoId  remove todo by specific id.
 * @apiName removeToDo.
 * @apiGroup todo.
 *
 * @apiParam {string} todoId  id of todo.
 *
 * @apiSuccess (200) {object} status  ok.message  todo Successfully Deleted.
 * @apiError (400) {object} ValidatonError The todoSchema is not valid.
 * @apiError (404) {object} NotFound The todo id is not found.
 */
exports.removeToDo = (requst, response, params) => {
  const hasAccessResult = hasAccess(requst)
  if (hasAccessResult.verify) {
    const temp = params
    temp.todoid = parseInt(params.todoid, 10)
    const validToDo = ajv.validate(schema.todoIdSchema, temp)
    const validatonError = ajv.errors
    if (validToDo) {
      db.removeToDo(temp.todoid)
        .then((result) => {
          if (result.rowCount) {
            const responseBody = {
              status: 'ok',
              message: 'Successfully Removed'
            }
            result = { ...result, ...responseBody }
            ok(response, result, 200)
          } else {
            const responseBody = {
              status: 'not found',
              message: 'Cannot find a todo with this id'
            }
            error(response, responseBody, 404)
          }
        })
        .catch((err) => {
          const responseBody = {
            status: 'not found',
            message: 'Cannot find a todo with this id'
          }
          err = { ...err, ...responseBody }
          error(response, responseBody, 404)
        })
    } else {
      error(response, { message: 'Validation Error' }, 400)
    }
  } else {
    error(response, { message: 'Not authorized' }, 401)
  }
}
/**
 * @api {get} /api/check/:todoId get number of unchecked tasks  by specific id of todo.
 * @apiName checkTask.
 * @apiGroup todo.
 *
 * @apiParam {string} todoId  id of todo.
 * @apiSuccess (200) {object} status number of unchecked tasks.
 * @apiError (400) ValidatonError The todo id is not valid.
 * @apiError (404) NotFound The todo id is not found.
 * @apiError (401) Not Authorized.
 */
exports.checkTask = (requst, response, params) => {
  const hasAccessResult = hasAccess(requst)
  if (hasAccessResult.verify) {
    const temp = params
    temp.todoid = parseInt(params.todoid, 10)
    const valid = ajv.validate(schema.todoIdSchema, temp)
    const validatonError = ajv.errors
    if (valid) {
      db.checkTask(temp.todoid)
        .then((result) => {
          // if (result.rowCount) {
          const responseBody = {
            status: 'ok',
            message: 'Successfully Removed'
          }
          result = { ...result, ...responseBody }
          ok(response, result, 200)
          // } else {
          // const responseBody = {
          //   status: 'not found',
          //   message: 'Cannot find a todo with this id'
          // }
          // error(response, responseBody, 404)
          // }
        })
        .catch((err) => {
          const responseBody = {
            status: 'not found',
            message: 'Cannot find a todo with this id'
          }
          err = { ...err, ...responseBody }
          error(response, responseBody, 404)
        })
    } else {
      error(response, validatonError, 400)
    }
  } else {
    error(response, { message: 'Not authorized' }, 401)
  }
}
/**
 * @api {delete} /api/todo/tasks/:todoId  remove all tasks of a todo with a specific id.
 * @apiName removeAllTasks.
 * @apiGroup todo.
 *
 * @apiParam {string} todoId  id of todo.
 *
 * @apiSuccess (200) {object} status  ok.message All Tasks Successfully Removed.
 * @apiError (400) {object} ValidatonError The todoSchema is not valid.
 * @apiError (401) {object} Not authorized.
 * @apiError (404) {object} NotFound The todo id is not found.
 */
exports.removeAllTasks = (requst, response, params) => {
  const hasAccessResult = hasAccess(requst)
  if (hasAccessResult.verify) {
    const temp = params
    temp.todoid = Number(params.todoid)
    const validToDo = ajv.validate(schema.todoIdSchema, temp)
    const validatonError = ajv.errors
    if (validToDo) {
      // console.log('something amazing')
      db.removeAllTasks(temp.todoid)
        .then((result) => {
          const responseBody = {
            status: 'ok',
            message: 'All Tasks Successfully Removed'
          }
          result = { ...result, ...responseBody }
          ok(response, result, 200)
        })
        .catch((err) => {
          const responseBody = {
            status: 'not found',
            message: 'Cannot find a todo with this id'
          }
          err = { ...err, ...responseBody }
          error(response, responseBody, 404)
        })
    } else {
      error(response, validatonError, 400)
    }
  } else {
    error(response, { message: 'Not authorized' }, 401)
  }
}
