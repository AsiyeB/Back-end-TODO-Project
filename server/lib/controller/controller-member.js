const Ajv = require('ajv')
const getRawBody = require('raw-body')
const db = require('../db/db-member')
const url = require('url')
const {
  ok,
  error
} = require('../util/response')
const schema = require('../schema/schema-member')
const ajv = new Ajv({
  allErrors: true
})
const {
  hasAccess
} = require('../auth/auth')

/**
 * @api {get} /api/member/:username Request Member Name By Username
 * @apiName getMemberNameByUsername
 * @apiGroup member
 * @apiParam {String} username member username 
 * @apiSuccess {String} firstName  first name member  .
 * @apiSuccess {String} lastName  last nmae member .
 * @apiSuccess {Integer} memberid  id meber .
 * @apiError (404){object} Cannot find a member with this username.
 * @apiError (400){object} validatonError.
 * @apiError (401){object} Not authorized.
 */
exports.getMemberNameByUsername = (requst, response, params) => {
  const hasAccessResult = hasAccess(requst)
  if (hasAccessResult.verify) {
    const temp = params
    const valid = ajv.validate(schema.memberIdSchema, temp)
    const validatonError = ajv.errors
    if (valid) {
      db.getMemberNameByUsername(temp.username)
        .then((result) => {
          if (result.rowCount) {
            ok(response, result, 200)
          }
          else {

            const responseBody = {
              status: 'not found',
              message: 'Cannot find a member with this username'
            }
            error(response, responseBody, 404)
          }
        })
    } else {
      error(response, 'validaton Error', 400)
    }
  } else {
    error(response, { message: 'Not authorized' }, 401)
  }
}

/**
 * @api {get} /api/members/:boardid Request Members board
 * @apiName getMembersBoard
 * @apiGroup member
 * @apiParam {Integer} boardid board id unique
 * @apiSuccess {object} members  member information  .
 * @apiError (404){object} Cannot find a board with this id or board not have any member
 * @apiError (400){object} validatonError.
 * @apiError (401){object} Not authorized.
 */
exports.getMembersBoard = (requst, response, params) => {
  const hasAccessResult = hasAccess(requst)
  if (hasAccessResult.verify) {
    const id = params
    id.boardid = parseInt(params.boardid, 10)
    const valid = ajv.validate(schema.boardIdSchema, id)
    const validatonError = ajv.errors
    if (valid) {
      db.getMembersBoard(id.boardid)
        .then((result) => {
          if (result.rowCount) {
            ok(response, result, 200)
          }
          else {
            const responseBody = {
              status: 'not found',
              message: 'Cannot find a board with this id or board not have any member'
            }
            error(response, responseBody, 404)
          }
        })
    } else {
      error(response, validatonError, 400)
    }
  } else {
    error(response, { message: 'Not authorized' }, 401)
  }
}

/**
 * @api {get} /api/boards Request all board information
 * @apiName getBoarsDetail
 * @apiGroup board
 * @apiSuccess {String} name  Name board .
 * @apiSuccess {integre} ownerid  owner board id.
 * @apiSuccess {integre} boardid  board id.
 * @apiSuccess {String} username  owner username .
 * @apiError (400){object} validatonError.
 * @apiError (401){object} Not authorized.
 */

exports.getBoarsDetail = (requst, response) => {
  const hasAccessResult = hasAccess(requst)
  if (hasAccessResult.verify) {
    const ownerid = hasAccessResult.payload.memberid
    db.getBoarsDetail(ownerid)
      .then((result) => {
        ok(response, result.rows, 200)
      })
      .catch((err) => {
        error(response, err, 404)
      })
  } else {
    error(response, { message: 'Not authorized' })
  }
}

// exports.addMember = (requst, response) => {
//   const hasAccessResult = hasAccess(requst)
//   if (hasAccessResult.verify) {
//     getRawBody(requst)
//       .then((bodyBuffer) => {
//         const body = JSON.parse(bodyBuffer.toString())
//         const valid = ajv.validate(schema.memberSchema, body)
//         const validatonError = ajv.errors
//         if (valid) {
//           const member = {
//             ...body
//           }
//           db.addMember(member)
//           const responseBody = {
//             status: 'created',
//             message: 'Successfully Added'
//           }
//           ok(response, responseBody, 201)
//         } else {
//           error(response, { message: 'Validation Error' }, 400)
//         }
//       }).catch((err) => {
//         const body = {
//           message: 'The body is probably empty or is not a json'
//         }
//         err = { ...err, ...body }
//         error(response, err, 400)
//       })
//   } else {
//     error(response, { message: 'Not authorized' }, 401)
//   }
// }

/**
 * @api {get} /api/lastMember Request last member added
 * @apiName getlastMember
 * @apiGroup member
 * @apiSuccess {String} firstName  first name member  .
 * @apiSuccess {String} lastName  last nmae member .
 * @apiSuccess {Integer} memberid  id meber .
 * @apiSuccess {String} username  member username .
 * @apiError (400){object} validatonError.
 * @apiError (400){object} The body is probably empty or is not a json
 * @apiError (401){object} Not authorized.
 */
exports.getlastMember = (requst, response) => {
  const hasAccessResult = hasAccess(requst)
  if (hasAccessResult.verify) {
    db.getlastMember()
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
    error(response, { message: 'Not authorized' }, 401)
  }
}

/**
 * @api {post} api/member Add Member
 * @apiName addMemberToBoard
 * @apiGroup member
 * @apiSuccess (201){String} status  Created .massage  Successfully Added.
 * @apiError (400){object}  validaton Error.
 * @apiError (400){object}  The body is probably empty or is not a json.
 * @apiError (401){object}  Not authorized.
 */
exports.addMemberToBoard = (requst, response) => {
  const hasAccessResult = hasAccess(requst)
  if (hasAccessResult.verify) {
    getRawBody(requst)
      .then((bodyBuffer) => {
        const body = JSON.parse(bodyBuffer.toString())
        const valid = ajv.validate(schema.boardMemberSchema, body)
        const validatonError = ajv.errors
        if (valid) {
          const member = {
            ...body
          }
          db.addMemberToBoard(member)
          const responseBody = {
            status: 'created',
            message: 'Successfully Added'
          }
          ok(response, responseBody, 201)
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
 * @api {get} /api/username/:memberid Request username member by id
 * @apiName getOwnerUsername
 * @apiGroup member
 * @apiParam {Integer} memberid member id is unique 
 * @apiSuccess {String} username  first name member  .
 * @apiError (400){object} validatonError.
 * @apiError (400){object} The body is probably empty or is not a json
 * @apiError (401){object} Not authorized.
 * @apiError (404){object} Cannot find a username with this id.
 */
exports.getOwnerUsername = (requst, response, params) => {
  const hasAccessResult = hasAccess(requst)
  if (hasAccessResult.verify) {
    const temp = params
    temp.memberid = parseInt(params.memberid, 10)
    const valid = ajv.validate(schema.memberUsernameSchema, temp)
    const validatonError = ajv.errors
    if (valid) {
      db.getOwnerUsername(temp.memberid)
        .then((result) => {
          if (result.rowCount) {
            ok(response, result, 200)
          }
          else {
            const responseBody = {
              status: 'not found',
              message: 'Cannot find a username with this id'
            }
            error(response, responseBody, 404)
          }
        })
    } else {
      error(response, validatonError, 400)
    }
  } else {
    error(response, { message: 'Not authorized' }, 401)
  }
}
/**
 * @api {delete} api/member delete member
 * @apiName removeMember
 * @apiGroup member
 * @apiParam {integer} memberid  memberid unique ID.
 * @apiParam {integer} boardid  bordid unique ID.
 * @apiSuccess (200){object}  status  ok.massage  Successfully Removed.
 * @apiError (404){object}  Cannot find amember of board with this id
 * @apiError (400){object}  validaton Error.
 */
exports.removeMember = (requst, response) => {
  // console.log('test remove member')
  var query = url.parse(requst.url, true).query
  const temp = query
  // console.log(query)
  temp.boardid = parseInt(query.boardid)
  temp.memberid = parseInt(query.memberid)
  console.log(temp.boardid + '  ' + temp.memberid)
  const hasAccessResult = hasAccess(requst)
  // var query = url.parse(requst.url, true).query
  // const temp = params
  // temp.boardid = parseInt(params.boardid)
  // temp.memberId = parseInt(params.memberid)
  // const valid = ajv.validate(schema.boardIdSchema, query)
  // const validatonError = ajv.errors
  // if (hasAccessResult.verify) {
  // if (valid) {
  db.removeMember(temp.boardid, temp.memberid)
    .then((result) => {
      const responseBody = {
        status: 'ok',
        message: 'Successfully Removed'
      }
      result = { ...result, ...responseBody }
      ok(response, result, 200)
    })
    .catch((err) => {
      const responseBody = {
        status: 'not found',
        message: 'Cannot find amember of board with this id'
      }
      err = { ...err, ...responseBody }
      error(response, responseBody, 404)
    })
  // } else {
  //   error(response, validatonError, 400)
  // }
  // } else {
  // error(response, { message: 'Not authorized' })
  // }
}


/**
 * @api {delete} api/user delete member
 * @apiName removeUser
 * @apiGroup member
 * @apiParam {string} username  member username
 * @apiSuccess (200){object}  status  ok.massage  Successfully Deleted.
 * @apiError (404){object}  Cannot find a User with this username
 * @apiError (400){object}  validaton Error.
 * @apiError (401){object}  Not authorized.
 */
exports.removeUser = (requst, response, params) => {
  const hasAccessResult = hasAccess(requst)
  if (hasAccessResult.verify) {
    const temp = params
    temp.username = params.username
    const valid = ajv.validate(schema.usernameSchema, temp)
    if (valid) {
      db.removeUser(temp.username)
        .then((result) => {
          if (result.rowCount) {
            const responseBody = {
              status: 'ok',
              message: 'Successfully Deleted'
            }
            result = { ...result, ...responseBody }
            ok(response, result, 200)
          } else {
            const responseBody = {
              status: 'not found',
              message: 'Cannot find a User with this username'
            }
            error(response, responseBody, 404)
          }
        })
    } else {
      error(response, 'validaton Error', 400)
    }
  } else {
    error(response, { message: 'Not authorized' }, 401)
  }
}