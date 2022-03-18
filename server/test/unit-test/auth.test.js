const dotenv = require('dotenv').config({
  path: '../.env-test'
})
const env = dotenv.parsed
console.log(env)

// require('dotenv').config({
//   path: '../.env-test'
// })
const chai = require('chai')
const expect = chai.expect

const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const PRIVATEKEY = process.env.PRIVATEKEY ? process.env.PRIVATEKEY : '123456789'

const {
  createHash,
  verifyPassword,
  signToken,
  hasAccess
} = require('../../lib/auth/auth')

describe('Auth Function Test', () => {
  describe('createHash Test', () => {
    it('Should Create Hash When Salt is NOt given', () => {
      // Arrange
      const password = 'test123456'
      // Action
      const hashResult = createHash(password)
      // Assert
      expect(hashResult).to.have.all.keys('salt', 'passwordHash')
      const saltResult = hashResult.salt
      const passwordHashResult = hashResult.passwordHash
      const calculatedHash = crypto.createHmac('sha512', saltResult).update(password).digest('hex')
      expect(passwordHashResult).to.equal(calculatedHash)
    })

    it('Should Create Hash When Salt is given', () => {
      // Arrange
      const password = 'test123456'
      const salt = '123456789abcdef'
      // Action
      const hashResult = createHash(password, salt)
      // Assert
      expect(hashResult).to.have.all.keys('salt', 'passwordHash')
      const saltResult = hashResult.salt
      const passwordHashResult = hashResult.passwordHash
      const calculatedHash = crypto.createHmac('sha512', salt).update(password).digest('hex')

      expect(saltResult).to.equal(salt)
      expect(passwordHashResult).to.equal(calculatedHash)
    })

    it('Should return NULL for hash When password is not given', () => {
      // Arrange
      const salt = '123456789abcdef'
      // Action
      const hashResult = createHash(null, salt)
      // Assert
      expect(hashResult).to.have.all.keys('salt', 'passwordHash')
      const saltResult = hashResult.salt
      const passwordHashResult = hashResult.passwordHash
      expect(saltResult).to.equal(null)
      expect(passwordHashResult).to.equal(null)
    })
  })
  describe('verifyPassword Test', () => {
    it('Should return true WHEN password is correct', () => {
      // Arrange
      const password = 'test123456'
      const salt = '123456789abcdef'
      const hash = crypto.createHmac('sha512', salt).update(password).digest('hex')
      // Action
      const verifyPasswordResult = verifyPassword(password, salt, hash)
      // Assert
      expect(verifyPasswordResult).to.be.equal(true)
    })

    it('Should return true WHEN password is correct', () => {
      // Arrange
      const password = 'test123456'
      const wrongPassword = 'test1234567'
      const salt = '123456789abcdef'
      const hash = crypto.createHmac('sha512', salt).update(password).digest('hex')
      // Action
      const verifyPasswordResult = verifyPassword(wrongPassword, salt, hash)
      // Assert
      expect(verifyPasswordResult).to.be.equal(false)
    })

    it('Should return false WHEN password is NULL', () => {
      // Arrange
      const password = 'test123456'
      const salt = '123456789abcdef'
      const hash = crypto.createHmac('sha512', salt).update(password).digest('hex')
      // Action
      const verifyPasswordResult = verifyPassword(null, salt, hash)
      // Assert
      expect(verifyPasswordResult).to.be.equal(false)
    })

    it('Should return false WHEN salt is NULL', () => {
      // Arrange
      const password = 'test123456'
      const salt = '123456789abcdef'
      const hash = crypto.createHmac('sha512', salt).update(password).digest('hex')
      // Action
      const verifyPasswordResult = verifyPassword(password, null, hash)
      // Assert
      expect(verifyPasswordResult).to.be.equal(false)
    })

    it('Should return false WHEN hash is NULL', () => {
      // Arrange
      const password = 'test123456'
      const salt = '123456789abcdef'
      // Action
      const verifyPasswordResult = verifyPassword(password, salt, null)
      // Assert
      expect(verifyPasswordResult).to.be.equal(false)
    })
  })
  describe('signToken Test', () => {
    it('Should return json web token', () => {
      // Arrange
      const payload = {
        username: 'test'
      }
      // Action
      const jwtResult = signToken(payload)
      // Assert
      const jwtCalculate = jwt.sign(payload, PRIVATEKEY)
      expect(jwtResult).to.equal(jwtCalculate)
    })
  })
  describe('hasAccess Test', () => {
    it('Should verify access WHEN token is valid', () => {
      // Arrange
      const payload = {
        username: 'test'
      }
      const token = jwt.sign(payload, PRIVATEKEY)
      const request = {
        headers: {
          authorization: `bearer ${token}`
        }
      }
      // Action
      const hasAccessResult = hasAccess(request)
      // Assert
      expect(hasAccessResult).to.have.all.keys('payload', 'verify')
      const payloadResult = hasAccessResult.payload
      const verifyResult = hasAccessResult.verify
      expect(verifyResult).to.equal(true)

      expect(payloadResult).to.have.property('username')
      const usernameResult = payloadResult.username
      expect(usernameResult).to.equal(payload.username)
    })

    it('Should not verify access WHEN token is not valid', () => {
      // Arrange
      const payload = {
        username: 'test'
      }
      const wrongPrivateKey = PRIVATEKEY + '1234'
      const token = jwt.sign(payload, wrongPrivateKey)
      const request = {
        headers: {
          authorization: `bearer ${token}`
        }
      }
      // Action
      const hasAccessResult = hasAccess(request)
      // Assert
      expect(hasAccessResult).to.have.all.keys('payload', 'verify')
      const payloadResult = hasAccessResult.payload
      const verifyResult = hasAccessResult.verify
      expect(verifyResult).to.equal(false)
      expect(payloadResult).to.equal(null)
    })

    it('Should not verify access WHEN token type is NOT bearer', () => {
      // Arrange
      const payload = {
        username: 'test'
      }
      const token = jwt.sign(payload, PRIVATEKEY)
      const request = {
        headers: {
          authorization: `basic ${token}`
        }
      }
      // Action
      const hasAccessResult = hasAccess(request)
      // Assert
      expect(hasAccessResult).to.have.all.keys('payload', 'verify')
      const payloadResult = hasAccessResult.payload
      const verifyResult = hasAccessResult.verify
      expect(verifyResult).to.equal(false)
      expect(payloadResult).to.equal(null)
    })

    it('Should not verify access WHEN authorization header is NOT given', () => {
      // Arrange
      const payload = {
        username: 'test'
      }
      const token = jwt.sign(payload, PRIVATEKEY)
      const request = {
        headers: {
          auth: `bearer ${token}`
        }
      }
      // Action
      const hasAccessResult = hasAccess(request)
      // Assert
      expect(hasAccessResult).to.have.all.keys('payload', 'verify')
      const payloadResult = hasAccessResult.payload
      const verifyResult = hasAccessResult.verify
      expect(verifyResult).to.equal(false)
      expect(payloadResult).to.equal(null)
    })
  })
})
