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
    username: 'zahraMahdavi',
    password: 'za12ZA@77'
}
var newBoard
describe('Board Test', () => {
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
    describe('Add Board Test', () => {
        it('It should add new Board', (done) => {
            const testBoard = {
                name: 'testBoard'
            }
            chai.request(server)
                .post('/api/board')
                .set('authorization', `Bearer ${token}`)
                .send(testBoard)
                .end((error, result) => {
                    if (error) {

                        done(error)
                    } else {
                        newBoard = result.body.rows[0].boardid
                        expect(result).to.have.any.keys('statusCode')
                        expect(result.statusCode).to.equal(201)
                        expect(result).to.have.any.keys('body')
                        done()
                    }
                })
        })
        it('It should NOT add new Board - authorization header is NOT exist', (done) => {
            const testBoard = {
                name: 'testBoard'
            }
            chai.request(server)
                .post('/api/board')
                .send(testBoard)
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
        it('It should NOT add new Board - token is invalid', (done) => {
            const testBoard = {
                name: 'testBoard'
            }
            const wrongToken = '1234'
            chai.request(server)
                .post('/api/board')
                .set('authorization', `Bearer ${wrongToken}`)
                .send(testBoard)
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
        it('It should NOT add new Board- body is NOT exist', (done) => {
            chai.request(server)
                .post('/api/board')
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
            const testBoard = {
                namea: 'testBoard'
            }
            chai.request(server)
                .post('/api/board')
                .set('authorization', `Bearer ${token}`)
                .send(testBoard)
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
        // after('Delete Board', (done) => {
        //     chai.request(server)
        //         .delete(`/api/board/${newBoard}`)
        //         .set('authorization', `Bearer ${token}`)
        //         .end((error, result) => {
        //             if (error) {
        //                 done(error)
        //             } else {
        //                 expect(result).to.have.any.keys('statusCode')
        //                 expect(result.statusCode).to.equal(200)
        //                 done()
        //             }
        //         })
        // })

    })

    describe('Update Board Test', () => {

        it('It should update  Board', (done) => {
            const testBoard = {
                name: 'testBoard1'
            }
            chai.request(server)
                .put('/api/board/282')
                .set('authorization', `Bearer ${token}`)
                .send(testBoard)
                .end((error, result) => {
                    if (error) {

                        done(error)
                    } else {
                        expect(result).to.have.any.keys('statusCode')
                        expect(result.statusCode).to.equal(200)
                        expect(result).to.have.any.keys('body')
                        expect(result.body).to.have.any.keys('message')
                        expect(result.body.message).to.equal('Successfully Updated')
                        done()
                    }
                })
        })
        it('It should NOT update Board - authorization header is NOT exist', (done) => {
            const testBoard = {
                name: 'testBoard1'
            }
            chai.request(server)
                .put('/api/board/282')
                .send(testBoard)
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
        it('It should NOT add new Board - token is invalid', (done) => {
            const testBoard = {
                name: 'testBoard'
            }
            const wrongToken = '1234'
            chai.request(server)
                .put('/api/board/282')
                .set('authorization', `Bearer ${wrongToken}`)
                .send(testBoard)
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
        it('It should NOT add new Board- body is NOT exist', (done) => {
            chai.request(server)
                .put('/api/board/282')
                .set('authorization', `Bearer ${token}`)
                .end((error, result) => {
                    if (error) {
                        done(error)
                    } else {
                        //console.log(result)
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
            const testBoard = {
                namea: 'testBoard'
            }
            chai.request(server)
                .put('/api/board/282')
                .set('authorization', `Bearer ${token}`)
                .send(testBoard)
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

        it('It should NOT add new Board - Cannot find a board with this id', (done) => {
            const testBoard = {
                name: 'testBoard1'
            }
            chai.request(server)
                .put('/api/board/1000')
                .set('authorization', `Bearer ${token}`)
                .send(testBoard)
                .end((error, result) => {
                    if (error) {

                        done(error)
                    } else {
                        //console.log(result)
                        expect(result).to.have.any.keys('statusCode')
                        expect(result.statusCode).to.equal(404)
                        expect(result).to.have.any.keys('body')
                        expect(result.body).to.have.any.keys('message')
                        expect(result.body.message).to.equal('Cannot find a board with this id')
                        done()
                    }
                })
        })
    })

    describe('Get Boards Api Test ', () => {
        it('It should get Boards', (done) => {
            chai.request(server)
                .get('/api/boards')
                .set('authorization', `Bearer ${token}`)
                .end((error, result) => {
                    if (error) {

                        done(error)
                    } else {
                        expect(result).to.have.any.keys('statusCode')
                        expect(result.statusCode).to.equal(200)
                        expect(result).to.have.any.keys('body')
                        // expect(result.body).to.have.any.keys('message')
                        // expect(result.body.message).to.equal('Successfully Get')
                        done()
                    }
                })
        })
        it('It should NOT get Boards - authorization header is NOT exist', (done) => {
            chai.request(server)
                .get('/api/boards')
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
        it('It should NOT get Board - token is invalid', (done) => {
            const wrongToken = '1234'
            chai.request(server)
                .get('/api/boards')
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
    describe('Get Board Api Test ', () => {
        it('It should get Board', (done) => {
            chai.request(server)
                .get('/api/board')
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
        it('It should NOT get Board - authorization header is NOT exist', (done) => {
            chai.request(server)
                .get('/api/board')
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
        it('It should NOT get Board - token is invalid', (done) => {
            const wrongToken = '1234'
            chai.request(server)
                .get('/api/board')
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
    describe('Get Last Board Api Test ', () => {
        it('It should get Last Boards', (done) => {
            chai.request(server)
                .get('/api/lastBoard')
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
        it('It should NOT get Last Boards - authorization header is NOT exist', (done) => {
            chai.request(server)
                .get('/api/lastBoard')
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
        it('It should NOT get Last Board - token is invalid', (done) => {
            const wrongToken = '1234'
            chai.request(server)
                .get('/api/lastBoard')
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
    describe('Get Board By Id Api Test ', () => {
        it('It should get Board By Id', (done) => {
            chai.request(server)
                .get('/api/board/287')
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
        it('It should NOT Get  Board - authorization header is NOT exist', (done) => {
            chai.request(server)
                .get('/api/board/287')
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
        it('It should NOT Get Board - token is invalid', (done) => {
            const wrongToken = '1234'
            chai.request(server)
                .get('/api/board/287')
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
        it('It should NOT Get Board - Cannot find a board with this id', (done) => {

            chai.request(server)
                .get('/api/board/10000')
                .set('authorization', `Bearer ${token}`)
                .end((error, result) => {
                    if (error) {
                        done(error)
                    } else {
                        expect(result).to.have.any.keys('statusCode')
                        expect(result.statusCode).to.equal(404)
                        expect(result).to.have.any.keys('body')
                        expect(result.body).to.have.any.keys('message')
                        expect(result.body.message).to.equal('Cannot find a board with this id')
                        done()
                    }
                })
        })
    })
    describe('Delete Board Api Test ', () => {
        it('It should Delete Board', (done) => {
            chai.request(server)
                .delete(`/api/board/${newBoard}`)
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
        it('It should NOT Delete  Board - authorization header is NOT exist', (done) => {
            chai.request(server)
                .delete('/api/board/1000')
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
        it('It should NOT Delete Board - token is invalid', (done) => {
            const wrongToken = '1234'
            chai.request(server)
                .delete('/api/board/289')
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
        it('It should NOT Delete Board - Cannot find a board with this id', (done) => {

            chai.request(server)
                .delete('/api/board/10000')
                .set('authorization', `Bearer ${token}`)
                .end((error, result) => {
                    if (error) {
                        done(error)
                    } else {
                        expect(result).to.have.any.keys('statusCode')
                        expect(result.statusCode).to.equal(404)
                        expect(result).to.have.any.keys('body')
                        expect(result.body).to.have.any.keys('message')
                        expect(result.body.message).to.equal('Cannot find a board with this id')
                        done()
                    }
                })
        })
    })

})