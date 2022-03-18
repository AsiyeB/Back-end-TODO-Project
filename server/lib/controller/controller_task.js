const Ajv = require('ajv')
// const uuidv4 = require('uuidv4')
const getRawBody = require('raw-body')
const url = require('url')
// const taskdb = require('../db/task_db').task
const db = require('../db/task_db')
const {
  ok,
  error
} = require('../util/response')
const schema = require('../schema/schema_task')
const schemaBoardid = require('../schema/schema_todo')
const ajv = new Ajv({
  allErrors: true
})
const {
  hasAccess
} = require('../auth/auth')
/**
 * @api {get} /api/task Request Tasks information
 * @apiName GetTasks
 * @apiGroup Task
 *
 * @apiSuccess {Object[]} tasks Information of all Tasks.
 *
 * @apiError (400) validationError todoID is not valid.
 * @apiError (401) Not Authorized.
 */

exports.getTasks = (requst, response) => {
  const hasAccessResult = hasAccess(requst)
  if (hasAccessResult.verify) {
    var query = url.parse(requst.url, true).query
    const queryTemp = query
    queryTemp.todoId = Number(query.todoId)
    console.log(queryTemp)
    const validTodo = ajv.validate(schema.todoIdSchema, queryTemp)
    const validatonError = ajv.errors
    if (queryTemp.todoId) {
      if (validTodo) {
        db.getTasks(queryTemp.todoId)
          .then((result) => {
            ok(response, result, 200)
          })
          .catch((err) => {
            const responseBody = {
              status: 'not found',
              message: 'Cannot find a task with this id'
            }
            err = { ...err, ...responseBody }
            error(response, err, 404)
          })
      } else {
        error(response, validatonError, 400)
      }
    } else {
      db.getTasks()
        .then((result) => {
          ok(response, result, 200)
        })
        .catch((err) => {
          const responseBody = {
            status: 'not found',
            message: 'Cannot find a task with this id'
          }
          err = { ...err, ...responseBody }
          error(response, err, 404)
        })
    }
  } else {
    error(response, { message: 'Not authorized' })
  }
}
exports.getNumTaskOfBoard = (requst, response, params) => {
  const hasAccessResult = hasAccess(requst)
  if (hasAccessResult.verify) {
    const temp = params
    temp.boardid = parseInt(params.boardid, 10)
    const validTodo = ajv.validate(schemaBoardid.boardIdSchema, temp)
    const validatonError = ajv.errors
    if (validTodo) {
      db.getNumTaskOfBoard(temp.boardid)
        .then((result) => {
          ok(response, result.rows[0].count, 200)
        })
        .catch((err) => {
          const responseBody = {
            status: 'not found',
            message: 'Cannot find a task with this id'
          }
          err = { ...err, ...responseBody }
          error(response, err, 404)
        })
    } else {
      error(response, { message: 'Validation Error' }, 400)
    }
  } else {
    error(response, { message: 'Not authorized' })
  }
}
exports.getNumRemainTaskOfBoard = (requst, response, params) => {
  const hasAccessResult = hasAccess(requst)
  if (hasAccessResult.verify) {
    const temp = params
    temp.boardid = parseInt(params.boardid, 10)
    const validTodo = ajv.validate(schemaBoardid.boardIdSchema, temp)
    const validatonError = ajv.errors
    if (validTodo) {
      console.log('correct boardid')
      db.getNumRemainTaskOfBoard(temp.boardid)
        .then((result) => {
          ok(response, result.rows[0].count, 200)
        })
        .catch((err) => {
          const responseBody = {
            status: 'not found',
            message: 'Cannot find a task with this id'
          }
          err = { ...err, ...responseBody }
          error(response, err, 404)
        })
    } else {
      error(response, { message: 'Validation Error' }, 400)
    }
  } else {
    error(response, { message: 'Not authorized' })
  }
}
/**
 * @api {get} /api/task/:taskId Request Task information with given id
 * @apiName GetTaskById
 * @apiGroup Task
 *
 * @apiParam {String} taskId Task unique ID.
 *
 * @apiSuccess {String} id ID of the Task.
 * @apiSuccess {String} todoId TodoID of the Task.
 * @apiSuccess {String} checked Checked of the Task.
 * @apiSuccess {String} description Description of the Task.
 * @apiSuccess {String} image Image of the Task.
 * @apiError (400) validationError given taskId is not valid.
 * @apiError (401) Not Authorized.
 * @apiError (404) notFound taskId cannot be found.
 */

exports.getTaskById = (requst, response, params) => {
  const hasAccessResult = hasAccess(requst)
  if (hasAccessResult.verify) {
    const temp = params
    temp.taskId = Number(params.taskId)
    // console.log(Number(params.taskId))
    const valid = ajv.validate(schema.taskIdSchema, temp)
    const validatonError = ajv.errors
    if (valid) {
      db.getTaskById(temp.taskId)
        .then((result) => {
          if (result.rowCount) { ok(response, result, 200) } else {
            const responseBody = {
              status: 'not found',
              message: 'Cannot find a task with this id'
            }
            error(response, responseBody, 404)
          }
        })
        .catch((err) => {
          const responseBody = {
            status: 'not found',
            message: 'Cannot find a task with this id'
          }
          err = { ...err, ...responseBody }
          error(response, err, 404)
        })
    } else {
      error(response, validatonError, 400)
    }
  } else {
    error(response, { message: 'Not authorized' })
  }
}

/**
 * @api {post} /api/task/ Create a new Task
 * @apiName addTask
 * @apiGroup Task
 * @apiSuccess (201) {Object} status-message adding operation.

 * @apiError (400) validationError given task is not valid.
 * @apiError (400) errCatch emptybody or not json.
 * @apiError (401) Not Authorized.
 */

exports.addTask = (requst, response) => {
  const hasAccessResult = hasAccess(requst)
  if (hasAccessResult.verify) {
    getRawBody(requst)
      .then((bodyBuffer) => {
        const body = JSON.parse(bodyBuffer.toString())
        const valid = ajv.validate(schema.task, body)
        const validatonError = ajv.errors
        if (valid) {
          db.addTask(body)
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
          message: 'The body is probably empty or is not a json'
        }
        err = { ...err, ...body }
        error(response, err, 400)
      })
  } else {
    error(response, { message: 'Not authorized' })
  }
}

/**
 * @api {put} /api/task/:taskId Update a Task
 * @apiName updateTask
 * @apiGroup Task
 *
 * @apiParam {String} taskId Task unique ID.
 *
 * @apiSuccess (200) {Object} status-message updating operation.
 *
 * @apiError (400) validationError given taskId is not valid.
 * @apiError (400) errCatch emptybody or not json.
 * @apiError (404) notFound taskId cannot be found.
 * @apiError (401) Not Authorized.
 */

exports.updateTask = (requst, response, params) => {
  const hasAccessResult = hasAccess(requst)
  if (hasAccessResult.verify) {
    getRawBody(requst)
      .then((bodyBuffer) => {
        const body = JSON.parse(bodyBuffer.toString())

        const valid = ajv.validate(schema.task, body)
        const validatonError = ajv.errors
        if (valid) {
          const temp = params
          temp.taskId = Number(params.taskId)
          const memberid = hasAccessResult.payload.memberid
          console.log('memberId is ' + memberid)
          db.updateTask(temp.taskId, memberid, body)
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
                  message: 'Cannot find a task with this id'
                }
                error(response, responseBody, 404)
              }
            })
            .catch((err) => {
              const responseBody = {
                status: 'not found',
                message: 'Cannot find a task with this id'
              }
              err = { ...err, ...responseBody }
              error(response, err, 404)
            })
        } else {
          error(response, { message: 'Validation Error' }, 400)
        }
      }).catch((err) => {
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
 * @api {delete} /api/task/:taskId Delete a Task
 * @apiName removeTask
 * @apiGroup Task
 *
 * @apiParam {String} taskId Task unique ID.
 *@apiSuccess (200) {Object} status-message removing operation.
 *
 * @apiError (400) validationError given taskId is not valid.
 * @apiError (404) notFound taskId cannot be found.
 * @apiError (401) Not Authorized.
 */

exports.removeTask = (requst, response, params) => {
  const hasAccessResult = hasAccess(requst)
  if (hasAccessResult.verify) {
    const temp = params
    temp.taskId = Number(params.taskId)

    const valid = ajv.validate(schema.taskIdSchema, temp)
    const validatonError = ajv.errors
    if (valid) {
      db.removeTask(temp.taskId)
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
              message: 'Cannot find a task with this id'
            }
            error(response, responseBody, 404)
          }
        })
        .catch((err) => {
          const responseBody = {
            status: 'not found',
            message: 'Cannot find a task with this id'
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
 * @api {get} /api/task/image/:taskId Request Image information of a task with given id
 * @apiName GetImage
 * @apiGroup Task
 *
 * @apiParam {String} taskId Task unique ID.
 * @apiSuccess {String} image Image of the Task.
 * @apiError (400) validationError given taskId is not valid.
 * @apiError (401) Not Authorized.
 * @apiError (404) notFound taskId cannot be found.
 */
exports.getImage = (requst, response, params) => {
  const hasAccessResult = hasAccess(requst)
  if (hasAccessResult.verify) {
    const temp = params
    temp.taskId = Number(params.taskId)
    const valid = ajv.validate(schema.taskIdSchema, temp)
    const validatonError = ajv.errors
    if (valid) {
      db.getImage(temp.taskId)
        .then((result) => {
          if (result.rowCount) {
            ok(response, result, 200)
          } else {
            const responseBody = {
              status: 'not found',
              message: 'Cannot find an image with this id'
            }
            error(response, responseBody, 404)
          }
        })
        .catch((err) => {
          const responseBody = {
            status: 'not found',
            message: 'Cannot find an image with this id'
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
