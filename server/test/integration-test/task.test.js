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
  username: 'adelba',
  password: '11aaAA@@'
}

describe('Task Test', () => {
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
  describe('Get Tasks Test ', () => {
    it('It should get All Tasks', (done) => {
      chai.request(server)
        .get('/api/task')
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
    it('It should NOT get Tasks - authorization header is NOT exist', (done) => {
      chai.request(server)
        .get('/api/task')
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
    it('It should NOT get Tasks - token is invalid', (done) => {
      const wrongToken = '1234'
      chai.request(server)
        .get('/api/task')
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
  describe('Add Task Test', () => {
    it('It should add new Task', (done) => {
      const testTask = {
        todoId: 90,
        checked: false,
        description: 'asiye`s task',
        memberId: 12
      }
      chai.request(server)
        .post('/api/task')
        .set('authorization', `Bearer ${token}`)
        .send(testTask)
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
    it('It should NOT add new Task - authorization header is NOT exist', (done) => {
      const testTask = {
        todoId: 90,
        checked: false,
        description: 'test task',
        memberId: 12
      }
      chai.request(server)
        .post('/api/task')
        .send(testTask)
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            // console.log(result)
            expect(result.statusCode).to.equal(401)
            expect(result).to.have.any.keys('body')
            expect(result.body).to.have.any.keys('message')
            expect(result.body.message).to.equal('Not authorized')
            done()
          }
        })
    })
    it('It should NOT add new Task - token is invalid', (done) => {
      const testTask = {
        todoId: 90,
        checked: false,
        description: 'test task',
        memberId: 12
      }
      const wrongToken = '1234'
      chai.request(server)
        .post('/api/task')
        .set('authorization', `Bearer ${wrongToken}`)
        .send(testTask)
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
    it('It should NOT add new Task- body is NOT exist', (done) => {
      chai.request(server)
        .post('/api/task')
        .set('authorization', `Bearer ${token}`)
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
    it('It should NOT add new Board - body is invalid', (done) => {
      const testTask = {
        todoIds: 90,
        checked: false,
        description: 'test task',
        memberId: 12
      }
      chai.request(server)
        .post('/api/task')
        .set('authorization', `Bearer ${token}`)
        .send(testTask)
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
  describe('Update Task Test', () => {
    it('It should update  Task', (done) => {
      const testTask = {
        todoId: 90,
        checked: true,
        description: 'test task',
        memberId: 343
      }
      chai.request(server)
        .put('/api/task/129')
        .set('authorization', `Bearer ${token}`)
        .send(testTask)
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
    it('It should NOT update Task - authorization header is NOT exist', (done) => {
      const testTask = {
        todoId: 90,
        checked: true,
        description: 'empty task',
        memberId: 343
      }
      chai.request(server)
        .put('/api/task/129')
        .send(testTask)
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
    it('It should NOT add new Task - token is invalid', (done) => {
      const testTask = {
        todoId: 90,
        checked: true,
        description: 'test task',
        memberId: 343
      }
      const wrongToken = '1234'
      chai.request(server)
        .put('/api/task/129')
        .set('authorization', `Bearer ${wrongToken}`)
        .send(testTask)
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
    it('It should NOT add new Task- body is NOT exist', (done) => {
      chai.request(server)
        .put('/api/task/129')
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
    it('It should NOT add new Task - body is invalid', (done) => {
      const testTask = {
        todoIds: 90,
        checked: true,
        description: 'empty task',
        memberId: 343
      }
      chai.request(server)
        .put('/api/task/129')
        .set('authorization', `Bearer ${token}`)
        .send(testTask)
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
    it('It should NOT add new Task - Cannot find a task with this id', (done) => {
      const testTask = {
        todoId: 90,
        checked: true,
        description: 'empty task',
        memberId: 343
      }
      chai.request(server)
        .put('/api/task/1000')
        .set('authorization', `Bearer ${token}`)
        .send(testTask)
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            // console.log(result)
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(404)
            expect(result).to.have.any.keys('body')
            expect(result.body).to.have.any.keys('message')
            expect(result.body.message).to.equal('Cannot find a task with this id')
            done()
          }
        })
    })
  })
  describe('Get Task By Id Api Test ', () => {
    it('It should get Task By Id', (done) => {
      chai.request(server)
        .get('/api/task/129')
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
    it('It should NOT Get Task - authorization header is NOT exist', (done) => {
      chai.request(server)
        .get('/api/task/129')
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
    it('It should NOT Get Task - token is invalid', (done) => {
      const wrongToken = '1234'
      chai.request(server)
        .get('/api/task/129')
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
    it('It should NOT Get Board - Cannot find a task with this id', (done) => {

      chai.request(server)
        .get('/api/task/10000')
        .set('authorization', `Bearer ${token}`)
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(404)
            expect(result).to.have.any.keys('body')
            expect(result.body).to.have.any.keys('message')
            expect(result.body.message).to.equal('Cannot find a task with this id')
            done()
          }
        })
    })
  })
  describe('Get Task Image Api Test ', () => {
    it('It should get Task Image', (done) => {
      chai.request(server)
        .get('/api/task/image/129')
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
    it('It should NOT Get Task Image - authorization header is NOT exist', (done) => {
      chai.request(server)
        .get('/api/task/image/129')
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
    it('It should NOT Get Task Image - token is invalid', (done) => {
      const wrongToken = '1234'
      chai.request(server)
        .get('/api/task/image/129')
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
    it('It should NOT Get Task Image - Cannot find an image  with this id', (done) => {
      chai.request(server)
        .get('/api/task/image/10000')
        .set('authorization', `Bearer ${token}`)
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(404)
            expect(result).to.have.any.keys('body')
            expect(result.body).to.have.any.keys('message')
            expect(result.body.message).to.equal('Cannot find an image with this id')
            done()
          }
        })
    })
  })
  describe('Delete Task Test ', () => {
    it('It should Delete Task', (done) => {
      chai.request(server)
        .delete(`/api/task/129`)
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
    it('It should NOT Delete Task - authorization header is NOT exist', (done) => {
      chai.request(server)
        .delete('/api/task/129')
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
    it('It should NOT Delete Task - token is invalid', (done) => {
      const wrongToken = '1234'
      chai.request(server)
        .delete('/api/task/129')
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
    it('It should NOT Delete Task - Cannot find a task with this id', (done) => {
      chai.request(server)
        .delete('/api/task/555')
        .set('authorization', `Bearer ${token}`)
        .end((error, result) => {
          if (error) {
            done(error)
          } else {
            expect(result).to.have.any.keys('statusCode')
            expect(result.statusCode).to.equal(404)
            expect(result).to.have.any.keys('body')
            expect(result.body).to.have.any.keys('message')
            expect(result.body.message).to.equal('Cannot find a task with this id')
            done()
          }
        })
    })
  })
  describe('Get CheckTask Api Test ', () => {
    it('It should get CheckTask', (done) => {
      chai.request(server)
        .get('/api/todo/check/90')
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
    it('It should NOT Get CheckTask - authorization header is NOT exist', (done) => {
      chai.request(server)
        .get('/api/todo/check/90')
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
    it('It should NOT CheckTask Image - token is invalid', (done) => {
      const wrongToken = '1234'
      chai.request(server)
        .get('/api/todo/check/90')
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
  describe('Delete All Task Test ', () => {
    it('It should Delete All Task', (done) => {
      chai.request(server)
        .delete(`/api/todo/tasks/90`)
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
    it('It should NOT Delete All Task - authorization header is NOT exist', (done) => {
      chai.request(server)
        .delete('/api/todo/tasks/90')
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
    it('It should NOT Delete All Task - token is invalid', (done) => {
      const wrongToken = '1234'
      chai.request(server)
        .delete('/api/todo/tasks/90')
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
