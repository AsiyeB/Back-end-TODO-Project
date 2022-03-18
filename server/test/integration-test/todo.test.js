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

const user = {
  username: 'maryamsaberi',
  password: '123msMS@@'
}

describe('Todo Test', () => {
  let token
  before('Get Token', (done) => {
    chai.request(server)
      .post('/api/login')
      .send(user)
      .end((error, result) => {
        if (error) {
          done(error)
        } else {
          token = result.body.token

          done()
        }
      })
  })
  describe('Get Todos Test ', () => {
    it('It should get All Todos', (done) => {
      chai.request(server)
        .get('/api/todo')
        .set('authorization', `Bearer ${token}`)
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(200)
            expect(result).to.have.any.keys('body')
            done()
          }
        })
    })
    it('It should NOT get Todos - authorization header is NOT exist', (done) => {
      chai.request(server)
        .get('/api/todo')
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(401)
            expect(result).to.have.any.keys('body')
            expect(result.body).to.have.any.keys('message')
            expect(result.body.message).to.equal('Not authorized')
            done()
          }
        })
    })
    it('It should NOT get Todos - token is invalid', (done) => {
      const wrongToken = '1234'
      chai.request(server)
        .get('/api/todo')
        .set('authorization', `Bearer ${wrongToken}`)
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(401)
            expect(result).to.have.any.keys('body')
            expect(result.body).to.have.any.keys('message')
            expect(result.body.message).to.equal('Not authorized')
            done()
          }
        })
    })
  })
  describe('Add Todo Test', () => {
    it('It should add new Todo', (done) => {
      const testTodo = {
        boardid: 305,
        header: 'newTodo'
      }
      chai.request(server)
        .post('/api/todo')
        .set('authorization', `Bearer ${token}`)
        .send(testTodo)
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(201)
            expect(result).to.have.any.keys('body')
            expect(result.body).to.have.any.keys('message')
            expect(result.body.message).to.equal('Successfully Added')
            done()
          }
        })
    })
    // eslint-disable-next-line no-undef
    it('It should NOT add new Todo - authorization header is NOT exist', (done) => {
      const testTodo = {
        boardid: 305,
        header: 'newTodo'
      }
      chai.request(server)
        .post('/api/todo')
        // .set('authorization', `Bearer ${token}`)
        .send(testTodo)
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            console.log(result)
            expect(result.statusCode).to.equal(401)
            expect(result).to.have.any.keys('body')
            expect(result.body).to.have.any.keys('message')
            expect(result.body.message).to.equal('Not authorized')
            done()
          }
        })
    })
    it('It should NOT add new Todo - token is invalid', (done) => {
      const testTodo = {
        boardid: 305,
        header: 'newTodo'
      }
      const wrongToken = '1234'
      chai.request(server)
        .post('/api/todo')
        .set('authorization', `Bearer ${wrongToken}`)
        .send(testTodo)
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(401)
            expect(result).to.have.any.keys('body')
            expect(result.body).to.have.any.keys('message')
            expect(result.body.message).to.equal('Not authorized')
            done()
          }
        })
    })
    it('It should NOT add new Todo- body is NOT exist', (done) => {
      chai.request(server)
        .post('/api/todo')
        .set('authorization', `Bearer ${token}`)
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(400)
            expect(result).to.have.any.keys('body')
            expect(result.body).to.have.any.keys('message')
            expect(result.body.message).to.equal('The body is probably empty or is not in json type')
            done()
          }
        })
    })
    it('It should NOT add new Todo - body is invalid', (done) => {
      const testTodo = {
        boardid: 305,
        header: 'newTodo',
        memberId: 12
      }
      chai.request(server)
        .post('/api/todo')
        .set('authorization', `Bearer ${token}`)
        .send(testTodo)
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
  describe('Update Todo Test', () => {
    it('It should update  Todo', (done) => {
      const testTodo = {
        boardid: 305,
        header: 'update todo1'
      }
      chai.request(server)
        .put('/api/todo/80')
        .set('authorization', `Bearer ${token}`)
        .send(testTodo)
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            // console.log(result)
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(200)
            expect(result).to.have.any.keys('body')
            expect(result.body).to.have.any.keys('message')
            expect(result.body.message).to.equal('Successfully Updated')
            done()
          }
        })
    })
    it('It should NOT update Todo - authorization header is NOT exist', (done) => {
      const testTodo = {
        boardid: 305,
        header: 'update todo 2'
      }
      chai.request(server)
        .put('/api/todo/77') //check
        .send(testTodo)
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(401)
            expect(result).to.have.any.keys('body')
            expect(result.body).to.have.any.keys('message')
            expect(result.body.message).to.equal('Not authorized')
            done()
          }
        })
    })
    it('It should NOT add new Todo - token is invalid', (done) => {
      const testTodo = {
        boardid: 305,
        header: 'update todo 3'
      }
      const wrongToken = '1234'
      chai.request(server)
        .put('/api/todo/77')
        .set('authorization', `Bearer ${wrongToken}`)
        .send(testTodo)
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(401)
            expect(result).to.have.any.keys('body')
            expect(result.body).to.have.any.keys('message')
            expect(result.body.message).to.equal('Not authorized')
            done()
          }
        })
    })
    it('It should NOT add new Todo- body is NOT exist', (done) => {
      chai.request(server)
        .put('/api/todo/77')   //check
        .set('authorization', `Bearer ${token}`)
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            // console.log(result)
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(400)
            expect(result).to.have.any.keys('body')
            expect(result.body).to.have.any.keys('message')
            expect(result.body.message).to.equal('The body is probably empty or is not a json')
            done()
          }
        })
    })
    it('It should NOT add new Todo - body is invalid', (done) => {
      const testTodo = {
        boardid: 305,
        headers: 'update todo 3'
      }
      chai.request(server)
        .put('/api/todo/77')
        .set('authorization', `Bearer ${token}`)
        .send(testTodo)
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
    it('It should NOT add new Todo - Cannot find a todo with this id', (done) => {
      const testTodo = {
        boardid: 305,
        header: 'update todo 4'
      }
      chai.request(server)
        .put('/api/todo/1000')
        .set('authorization', `Bearer ${token}`)
        .send(testTodo)
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            // console.log(result)
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(404)
            expect(result).to.have.any.keys('body')
            expect(result.body).to.have.any.keys('message')
            expect(result.body.message).to.equal('Cannot find a todo with this id')
            done()
          }
        })
    })
  })
  describe('Delete Todo Test ', () => {
    it('It should Delete Todo', (done) => {
      chai.request(server)
        .delete(`/api/todo/80`)
        .set('authorization', `Bearer ${token}`)
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(200)
            expect(result).to.have.any.keys('body')
            done()
          }
        })
    })
    it('It should NOT Delete Todo - authorization header is NOT exist', (done) => {
      chai.request(server)
        .delete('/api/todo/77')
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(401)
            expect(result).to.have.any.keys('body')
            expect(result.body).to.have.any.keys('message')
            expect(result.body.message).to.equal('Not authorized')
            done()
          }
        })
    })
    it('It should NOT Delete Todo - token is invalid', (done) => {
      const wrongToken = '1234'
      chai.request(server)
        .delete('/api/todo/77')
        .set('authorization', `Bearer ${wrongToken}`)
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(401)
            expect(result).to.have.any.keys('body')
            expect(result.body).to.have.any.keys('message')
            expect(result.body.message).to.equal('Not authorized')
            done()
          }
        })
    })
    it('It should NOT Delete Todo - Cannot find a todo with this id', (done) => {
      chai.request(server)
        .delete('/api/todo/1000')
        .set('authorization', `Bearer ${token}`)
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(404)
            expect(result).to.have.any.keys('body')
            expect(result.body).to.have.any.keys('message')
            expect(result.body.message).to.equal('Cannot find a todo with this id')
            done()
          }
        })
    })
  })
  describe('Get Todo By Id Test ', () => {
    it('It should get Todo', (done) => {
      chai.request(server)
        .get('/api/todo/79')
        .set('authorization', `Bearer ${token}`)
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(200)
            expect(result).to.have.any.keys('body')
            done()
          }
        })
    })
    it('It should NOT get Todo - authorization header is NOT exist', (done) => {
      chai.request(server)
        .get('/api/todo/79')
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(401)
            expect(result).to.have.any.keys('body')
            expect(result.body).to.have.any.keys('message')
            expect(result.body.message).to.equal('Not authorized')
            done()
          }
        })
    })
    it('It should NOT get Todo - token is invalid', (done) => {
      const wrongToken = '1234'
      chai.request(server)
        .get('/api/todo/79')
        .set('authorization', `Bearer ${wrongToken}`)
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(401)
            expect(result).to.have.any.keys('body')
            expect(result.body).to.have.any.keys('message')
            expect(result.body.message).to.equal('Not authorized')
            done()
          }
        })
    })
    it('It should get Todo - Cannot find a todo with this id', (done) => {
      chai.request(server)
        .delete('/api/todo/1000')
        .set('authorization', `Bearer ${token}`)
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(404)
            expect(result).to.have.any.keys('body')
            expect(result.body).to.have.any.keys('message')
            expect(result.body.message).to.equal('Cannot find a todo with this id')
            done()
          }
        })
    })
  })
  describe('Get Number Of Todos of board Test ', () => {
    it('It should get Number of Todos', (done) => {
      chai.request(server)
        .get('/api/todoNumber/305')
        .set('authorization', `Bearer ${token}`)
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(200)
            expect(result).to.have.any.keys('body')
            done()
          }
        })
    })
    it('It should NOT get Number of Todos - authorization header is NOT exist', (done) => {
      chai.request(server)
        .get('/api/todoNumber/305')
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(401)
            expect(result).to.have.any.keys('body')
            expect(result.body).to.have.any.keys('message')
            expect(result.body.message).to.equal('Not authorized')
            done()
          }
        })
    })
    it('It should NOT get Number of Todos  - token is invalid', (done) => {
      const wrongToken = '1234'
      chai.request(server)
        .get('/api/todoNumber/305')
        .set('authorization', `Bearer ${wrongToken}`)
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(401)
            expect(result).to.have.any.keys('body')
            expect(result.body).to.have.any.keys('message')
            expect(result.body.message).to.equal('Not authorized')
            done()
          }
        })
    })
  })
  describe('Get Number Of Tasks of board Test ', () => {
    it('It should get Number of Tasks', (done) => {
      chai.request(server)
        .get('/api/taskNumber/305')
        .set('authorization', `Bearer ${token}`)
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(200)
            expect(result).to.have.any.keys('body')
            done()
          }
        })
    })
    it('It should NOT get Number of Todos - authorization header is NOT exist', (done) => {
      chai.request(server)
        .get('/api/taskNumber/305')
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(401)
            expect(result).to.have.any.keys('body')
            expect(result.body).to.have.any.keys('message')
            expect(result.body.message).to.equal('Not authorized')
            done()
          }
        })
    })
    it('It should NOT get Number of Todos  - token is invalid', (done) => {
      const wrongToken = '1234'
      chai.request(server)
        .get('/api/taskNumber/305')
        .set('authorization', `Bearer ${wrongToken}`)
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(401)
            expect(result).to.have.any.keys('body')
            expect(result.body).to.have.any.keys('message')
            expect(result.body.message).to.equal('Not authorized')
            done()
          }
        })
    })
  })
  describe('Get Number Of Remain Tasks of board Test ', () => {
    it('It should get Number of Tasks', (done) => {
      chai.request(server)
        .get('/api/remainTaskNumber/305')
        .set('authorization', `Bearer ${token}`)
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(200)
            expect(result).to.have.any.keys('body')
            done()
          }
        })
    })
    it('It should NOT get Number of Todos - authorization header is NOT exist', (done) => {
      chai.request(server)
        .get('/api/remainTaskNumber/305')
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(401)
            expect(result).to.have.any.keys('body')
            expect(result.body).to.have.any.keys('message')
            expect(result.body.message).to.equal('Not authorized')
            done()
          }
        })
    })
    it('It should NOT get Number of Todos  - token is invalid', (done) => {
      const wrongToken = '1234'
      chai.request(server)
        .get('/api/remainTaskNumber/305')
        .set('authorization', `Bearer ${wrongToken}`)
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(401)
            expect(result).to.have.any.keys('body')
            expect(result.body).to.have.any.keys('message')
            expect(result.body.message).to.equal('Not authorized')
            done()
          }
        })
    })
  })
})
