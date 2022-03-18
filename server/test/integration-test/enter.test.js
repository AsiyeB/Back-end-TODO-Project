require('dotenv').config({
  path: '../.env-test'
})

const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const expect = chai.expect

const {
  server
} = require('../../index.js')


const signupUser = {
  firstname: 'zohre',
  lastname: 'aghli',
  image: 'img2.png',
  username: 'zoAghli40',
  password: 'zo12ZA@77'
}
const loginUser = {
  username: signupUser.username,
  password: signupUser.password
}
const username = 'zoAghli22'

let token
describe('Enter Test', () => {
  describe('Sign Up Test', () => {

    it('It should Sign Up successfully', (done) => {
      chai.request(server)
        .post('/api/signup')
        .send(signupUser)
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            // console.log(result.body)
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(200)
            expect(result.body).to.have.any.keys('message')
            expect(result.body.message).to.equal('Successfully SignUp')
            done()
          }
        })
    })
    it('It should NOT Sign Up-password Policy missing', (done) => {
      const test = {
        firstname: 'zohre',
        lastname: 'aghli',
        image: 'img2.png',
        username: 'zoAghli40',
        password: 'zo12llllll77'
      }
      chai.request(server)
      
      .post('/api/signup')
      .send(test)
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(400)
            expect(result).to.have.any.keys('body')
            expect(result.body).to.have.any.keys('message')
            expect(result.body.message).to.equal('password Policy missing')
            done()
          }
        })
    })
    it('It should NOT Sign Up- body is NOT exist', (done) => {
      chai.request(server)
      .post('/api/signup')
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(400)
            expect(result).to.have.any.keys('body')
            expect(result.body).to.have.any.keys('message')
            expect(result.body.message).to.equal('The body is probably empty or is not a json')
            done()
          }
        })
    })
    it('It should NOT Sign Up - body is invalid', (done) => {
      const test = {
        firstnam: 'zohre',
        lastnam: 'aghli',
        img: 'img2.png',
        username: 'zoAghli40',
        password: 'zo12ZA@77'
      }
      chai.request(server)
      .post('/api/signup')
        .send(test)
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(400)
            expect(result).to.have.any.keys('body')
            expect(result.body).to.have.any.keys('message')
            expect(result.body.message).to.equal('Validation Error')
            done()
          }
        })
    })
    it('It should NOT Sign Up - duplicated username', (done) => {
      chai.request(server)
      .post('/api/signup')
        .send(signupUser)
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(400)
            expect(result).to.have.any.keys('body')
            expect(result.body).to.have.any.keys('message')
            expect(result.body.message).to.equal('repeated username')
            done()
          }
        })
    })
  })
  describe('Login Test', () => {
    it('It should login successfully', (done) => {
      chai.request(server)
        .post('/api/login')
        .send(loginUser)
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            //console.log(result)
            token = result.body.token
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(200)
            expect(result).to.have.any.keys('body')
            expect(result.body).to.have.all.keys('token')
            done()
          }
        })
    }).timeout(10000)
    it('It should NOT login - wrong password', (done) => {
      const userWithWrongPassword = {
        username: loginUser.username,
        password: 'za12ZA@dakfM'
      }
      chai.request(server)
        .post('/api/login')
        .send(userWithWrongPassword)
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(400)
            expect(result).to.have.any.keys('body')
            expect(result.body).to.have.any.keys('error')
            expect(result.body.error).to.equal('password i wrong')
            done()
          }
        })
    })
    it('It should NOT login - username missing', (done) => {
      const userWithoutUsername = {
        password: '1234'
      }
      chai.request(server)
        .post('/api/login')
        .send(userWithoutUsername)
        .end((error, result) => {
          if (error) {
            done(error)
          } else {

            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(400)
            expect(result).to.have.any.keys('body')
            expect(result.body).to.have.any.keys('message')
            expect(result.body.message).to.equal('Validation Error')
            done()
          }
        })
    })
    it('It should NOT login - password missing', (done) => {
      const userWithoutUsername = {
        user: 'razi'
      }
      chai.request(server)
        .post('/api/login')
        .send(userWithoutUsername)
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(400)
            expect(result).to.have.any.keys('body')
            expect(result.body).to.have.any.keys('message')
            expect(result.body.message).to.equal('Validation Error')
            done()
          }
        })
    })
  })
  after('Delete user', (done) => {
    //console.log(token)
    chai.request(server)
      .delete(`/api/user/${loginUser.username}`)
      .set('authorization', `Bearer ${token}`)
      .end((error, result) => {
        if (error) {
          done(error)
        } else {
          console.log(result.statusCode)
          expect(result).to.have.any.keys('statusCode')
          expect(result.statusCode).to.equal(200)
          done()
        }
      })
  })
})
