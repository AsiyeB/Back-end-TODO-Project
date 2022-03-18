const Ajv = require('ajv')
const getRawBody = require('raw-body')

const db = require('../db/db_signup')
const {
  ok,
  error
} = require('../util/response')
const {
  passwordPolicy,
  createHash,
  verifyPassword,
  signToken
} = require('../auth/auth')
const schema = require('../schema/schema-member')

const ajv = new Ajv({
  allErrors: true
})

/**
 * @api {post} api/signup Add new user
 * @apiName signUp
 * @apiGroup enter
 * @apiSuccess (201){String} status  Created .massage Successfully SignUp.
 * @apiError (400){object}  validaton Error.
 * @apiError (400){object}  repeated username
 * @apiError (400){object}  password Policy missing
 * @apiError (400){object}  The body is probably empty or is not a json
 * @apiError (401){object}  Not authorized.
 */

exports.signUp = (request, response) => {
  getRawBody(request)
    .then((bodyBuffer) => {
      const body = JSON.parse(bodyBuffer.toString())
      const valid = ajv.validate(schema.userSchema, body)
      const validatonError = ajv.errors
      if (valid) {
        const passwordChecked = passwordPolicy.check(body.password)
        if (passwordChecked) {
          const firstname = body.firstname
          const lastname = body.lastname
          const image = body.image
          const username = body.username
          const password = body.password
          const {
            salt,
            passwordHash
          } = createHash(password)
          const user = {
            firstname,
            lastname,
            image,
            salt,
            username,
            passwordHash
          }
          db.addUser(user)
            .then((result) => {
              if(result.rowCount){
                ok(response,{message:'Successfully SignUp'}, result)
              }
              else{
                error(response, {message:'repeated username'},400)
              }
            }).catch((err) => {
              error(response, {message:'repeated username'},400)
              })
        } else {
          error(response, {message:'password Policy missing'},400)
        }
      } else {

        error(response, {message:'Validation Error'},400)
      }
    }).catch((err) => {
      error(response, {message:'The body is probably empty or is not a json'},400)
    })
}

/**
 * @api {post} api/login login user
 * @apiName login
 * @apiGroup enter
 * @apiSuccess (201){String} status   Successfully login.
 * @apiError (400){object}  validaton Error.
 * @apiError (400){object}  password i wrong
 * @apiError (401){object}  Not authorized.
 */
exports.login = (request, response) => {
  getRawBody(request)
    .then((bodyBuffer) => {
      const body = JSON.parse(bodyBuffer.toString())
      const valid = ajv.validate(schema.userpassSchema, body)
      //const validatonError = ajv.errors
      if (valid) {
        // console.log(body.username)
        db.getUser(body.username)
          .then((result) => {
            const user = result.rows[0]
            // console.log(result)
            if (verifyPassword(body.password, user.salt, user.password)) {
              const token = signToken({ memberid: user.memberid })
              ok(response, {
                token: token
              })
            } else {
              //console.log('error')
              error(response, { error: 'password i wrong' },400)
            }
          })
          .catch((err) => {
            // console.log('error')
            error(response, err.stack,400)
          })
      } else {
        error(response, {
          message: 'Validation Error'
        },400)
      }
    }).catch((err) => {
      error(response, err.stack,400)
    })
}
