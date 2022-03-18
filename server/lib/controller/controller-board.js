const Ajv = require('ajv')
const getRawBody = require('raw-body')
const db = require('../db/db-board')
const {
  ok,
  error
} = require('../util/response')
const schema = require('../schema/schema-board')

const ajv = new Ajv({
  allErrors: true
})
const {
  hasAccess
} = require('../auth/auth')

/**
 * @api {get} /api/board Request Board information
 * @apiName getBoard
 * @apiGroup board
 * @apiSuccess {String} name  Name board .
 * @apiSuccess {String[]} member  Members board .
 * @apiSuccess {String} owner  Owner group .
 * @apiError UserNotFound The <code>id</code> of the User was not found.
 * @apiError (401){object}  Not authorized.
 */

exports.getBoard = (requst, response) => {
  // console.log('requst is ' + requst)
  const hasAccessResult = hasAccess(requst)
  if (hasAccessResult.verify) {
    const ownerid = hasAccessResult.payload.memberid
    db.getBoard(ownerid)
      .then((result) => {
        ok(response, result.rows, 200)
      })
      .catch((err) => {
        error(response, err, 404)
      })
  } else {
    error(response, { message: 'Not authorized' },401)
  }
}

/**
 * @api {get} /api/board Request Board information By id
 * @apiName getBoard
 * @apiGroup board
 * @apiParam {String} boardId  boards unique ID.
 * @apiSuccess {String} name  Name board .
 * @apiSuccess {String[]} member  Members board .
 * @apiSuccess {String} owner  Owner group .
 * @apiError (400){object}  validaton Error.
 * @apiError (401){object}  Not authorized.
 */

exports.getBoardById = (requst, response, params) => {
  const hasAccessResult = hasAccess(requst)
  if (hasAccessResult.verify) {
    //const memberId = hasAccessResult.payload
    const id = params
    id.boardid = parseInt(params.boardId, 10)
    const valid = ajv.validate(schema.boardIdSchema, id)
    const validatonError = ajv.errors
    if (valid) {
      db.getBoard(id.boardid)
        .then((result) => {
          if (result.rowCount) {
          ok(response, result, 200)
          }
          else {
            const responseBody = {
              status: 'not found',
              message: 'Cannot find a board with this id'
            }
            error(response, responseBody, 404)
          }
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
      error(response, validatonError, 400)
    }
  } else {
    error(response, { message: 'Not authorized' },401)
  }
}

/**
 * @api {post} api/board Add Board
 * @apiName addBoard
 * @apiGroup board
 * @apiSuccess (201){String} status  Created .massage  Successfully Added.
 * @apiError (400){object}  validaton Error.
 * @apiError (401){object}  Not authorized.
 */
exports.addBoard = (requst, response) => {
  const hasAccessResult = hasAccess(requst)
  if (hasAccessResult.verify) {
    const ownerid = hasAccessResult.payload.memberid
    getRawBody(requst)
      .then((bodyBuffer) => {
        const body = JSON.parse(bodyBuffer.toString())
        const valid = ajv.validate(schema.boardSchema, body)
        const validatonError = ajv.errors
        if (valid) {
          const board = {
            ...body
          }
          db.addBoard(board, ownerid)
          .then((result) => {
           // console.log(result)
            const responseBody = {
              status: 'created',
              message: 'Successfully Added'
            }
            result = { ...result, ...responseBody }
            ok(response, result, 201)
          })
          
        } else {
          //error(response, validatonError, 400)
          error(response, { message: 'Validation Error' },400)
        }
      }).catch((err) => {
        const body = {
          message: 'The body is probably empty or is not a json'
        }
        err = { ...err, ...body }
        error(response, err, 400)
      })
  
    } else {

    error(response, { message: 'Not authorized' },401)
  }
}

/**
 * @api {put} api/board Update board information
 * @apiName updateBoard
 * @apiGroup board
 *
 * @apiParam {String} boardId  board unique ID.
 *
 * @apiSuccess (200){object} status   ok .massage  Successfully Updated .
 * @apiError (404){object}  Cannot find a board with this id.
 * @apiError (400){object}  validaton Error.
 * @apiError (401){object}  Not authorized.
 */

exports.updateBoard = (requst, response, params) => {
  const hasAccessResult = hasAccess(requst)
  if (hasAccessResult.verify) {
    const id = params
    id.boardid = parseInt(params.boardId, 10)
    getRawBody(requst)
      .then((bodyBuffer) => {
        const body = JSON.parse(bodyBuffer.toString())
        const valid = ajv.validate(schema.boardSchema, body)
        const validatonError = ajv.errors
        if (valid) {
          // eslint-disable-next-line prefer-const
          db.updateBoard(id.boardid, body)
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
                  message: 'Cannot find a board with this id'
                }
                error(response, responseBody, 404)
              }
            }).catch((err) => {
              const responseBody = {
                status: 'not found',
                message: 'Cannot find a board with this id'
              }
              err = { ...err, ...responseBody }
              error(response, err, 404)
            })
        } else {
          error(response, { message: 'Validation Error' },400)
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
    error(response, { message: 'Not authorized' },401)
  }
}

/**
 * @api {delete} api/board delete board
 * @apiName removeBoard
 * @apiGroup board
 *
 * @apiParam {String} boardId  board unique ID.
 *
 * @apiSuccess (200){object}  status  ok.massage  Successfully Removed.
 * @apiError (404){object}  Cannot find a board with this id.
 * @apiError (400){object}  validaton Error.
 * @apiError (401){object}  Not authorized.
 */

exports.removeBoard = (requst, response, params) => {
  const hasAccessResult = hasAccess(requst)
  if (hasAccessResult.verify) {
    const temp = params
    temp.boardid = parseInt(params.boardId, 10)
    const valid = ajv.validate(schema.boardIdSchema, temp)
    const validatonError = ajv.errors
    if (valid) {
      db.removeBoard(temp.boardid)
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
              message: 'Cannot find a board with this id'
            }
            error(response, responseBody, 404)
          }
        })
    } else {
      error(response, 'validaton Error', 400)
    }
  } else {
    error(response, { message: 'Not authorized' },401)
  }
}

/**
 * @api {get} /api/lastBoard get last board added
 * @apiName getlastBoard
 * @apiGroup board
 * @apiSuccess {String} name  Name board .
 * @apiSuccess {Integer} boardid  id board .
 * @apiSuccess {Integer} ownerid  id Owner board .
 * @apiError (401){object}  Not authorized.
 */

exports.getlastBoard = (requst, response) => {
  const hasAccessResult = hasAccess(requst)
  if (hasAccessResult.verify) {
    db.getlastBoard()
      .then((result) => {
        ok(response, result, 200)
      })
      .catch((err) => {
        const responseBody = {
          status: 'not found',
          message: 'Cannot find a member with this id'
        }
        err = { ...err, ...responseBody }
        error(response, err, 404)
      })
  } else {
    error(response, { message: 'Not authorized' },401)
  }
}
