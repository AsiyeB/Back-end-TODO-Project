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

var newMember = {
    boardid: 287,
    memberid: 336
}
describe('Member Test', () => {
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
    describe('Add Member Test', () => {
        it('It should add new Member', (done) => {
            const testMember = {
                boardid: 287,
                memberid: 336
            }
            chai.request(server)
                .post('/api/addMemberToBoard')
                .set('authorization', `Bearer ${token}`)
                .send(testMember)
                .end((error, result) => {
                    if (error) {

                        done(error)
                    } else {
                        // console.log(result)
                        expect(result).to.have.any.keys('statusCode')
                        expect(result.statusCode).to.equal(201)
                        expect(result).to.have.any.keys('body')
                        expect(result.body).to.have.any.keys('message')
                        expect(result.body.message).to.equal('Successfully Added')
                        done()
                    }
                })
        })
        it('It should NOT add new Member - authorization header is NOT exist', (done) => {
            const testMember = {
                boardid: 287,
                memberid: 336
            }
            chai.request(server)
                .post('/api/addMemberToBoard')
                .send(testMember)
                .end((error, result) => {
                    if (error) {
                        done(error)
                    } else {
                        // console.log(result)
                        expect(result).to.have.any.keys('statusCode')
                        expect(result.statusCode).to.equal(401)
                        expect(result).to.have.any.keys('body')
                        expect(result.body).to.have.any.keys('message')
                        expect(result.body.message).to.equal('Not authorized')
                        done()
                    }
                })
        })
        it('It should NOT add new Member - token is invalid', (done) => {
            const testMember = {
                boardid: 287,
                memberid: 336
            }
            const wrongToken = '1234'
            chai.request(server)
                .post('/api/addMemberToBoard')
                .set('authorization', `Bearer ${wrongToken}`)
                .send(testMember)
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
        it('It should NOT add new Member- body is NOT exist', (done) => {
            chai.request(server)
                .post('/api/addMemberToBoard')
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
        it('It should NOT add new Member - body is invalid', (done) => {
            const testMember = {
                boardida: 287,
                memberid: 336
            }
            chai.request(server)
                .post('/api/addMemberToBoard')
                .set('authorization', `Bearer ${token}`)
                .send(testMember)
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

    describe('Get Last Member Api Test ', () => {
        it('It should get last member', (done) => {
            chai.request(server)
                .get('/api/lastMember')
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
        it('It should NOT get last member - authorization header is NOT exist', (done) => {
            chai.request(server)
                .get('/api/lastMember')
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
        it('It should NOT get last member - token is invalid', (done) => {
            const wrongToken = '1234'
            chai.request(server)
                .get('/api/lastMember')
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
    describe('Get Member Name By Username Api Test ', () => {
        it('It should Get Member Name By Username', (done) => {
            chai.request(server)
                .get('/api/member/zahraMahdavi')
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
        it('It should NOT Get Member Name By Username - authorization header is NOT exist', (done) => {
            chai.request(server)
                .get('/api/member/zahraMahdavi')
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
        it('It should NOT Get Member Name By Username - token is invalid', (done) => {
            const wrongToken = '1234'
            chai.request(server)
                .get('/api/member/zahraMahdavi')
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
        it('It should NOT Get Member Name By Username - Cannot find a member with this Username', (done) => {

            chai.request(server)
                .get('/api/member/zahraMahdavi12')
                .set('authorization', `Bearer ${token}`)
                .end((error, result) => {
                    if (error) {
                        done(error)
                    } else {
                        expect(result).to.have.any.keys('statusCode')
                        expect(result.statusCode).to.equal(404)
                        expect(result).to.have.any.keys('body')
                        expect(result.body).to.have.any.keys('message')
                        expect(result.body.message).to.equal('Cannot find a member with this username')
                        done()
                    }
                })
        })
    })
    describe('get Members Board Api Test ', () => {
        it('It should Get Members Board', (done) => {
            chai.request(server)
                .get('/api/members/280')
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
        it('It should NOT Get Members Board - authorization header is NOT exist', (done) => {
            chai.request(server)
            .get('/api/members/280')
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
        it('It should NOT Get Members Board - token is invalid', (done) => {
            const wrongToken = '1234'
            chai.request(server)
            .get('/api/members/280')
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
        it('It should NOT Get Members Board - Cannot find a board with this id or board not have any member', (done) => {

            chai.request(server)
            .get('/api/members/2800')
                .set('authorization', `Bearer ${token}`)
                .end((error, result) => {
                    if (error) {
                        done(error)
                    } else {
                        expect(result).to.have.any.keys('statusCode')
                        expect(result.statusCode).to.equal(404)
                        expect(result).to.have.any.keys('body')
                        expect(result.body).to.have.any.keys('message')
                        expect(result.body.message).to.equal('Cannot find a board with this id or board not have any member')
                        done()
                    }
                })
        })
    })
    describe('get Owner Username Api Test ', () => {
        it('It should Get Owner Username', (done) => {
            chai.request(server)
                .get('/api/username/336')
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
        it('It should NOT Get Owner Username - authorization header is NOT exist', (done) => {
            chai.request(server)
            .get('/api/username/336')
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
        it('It should NOT Get Owner Username - token is invalid', (done) => {
            const wrongToken = '1234'
            chai.request(server)
            .get('/api/username/336')
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
        it('It should NOT Get Owner Username - Cannot find a username with this id ', (done) => {

            chai.request(server)
            .get('/api/username/3366')
                .set('authorization', `Bearer ${token}`)
                .end((error, result) => {
                    if (error) {
                        done(error)
                    } else {
                        expect(result).to.have.any.keys('statusCode')
                        expect(result.statusCode).to.equal(404)
                        expect(result).to.have.any.keys('body')
                        expect(result.body).to.have.any.keys('message')
                        expect(result.body.message).to.equal('Cannot find a username with this id')
                        done()
                    }
                })
        })
    })


    describe('Delete Member Api Test ', () => {
        it('It should Delete Member of Board', (done) => {
            chai.request(server)
                .delete(`/api/member?boardid=287&memberid=336`)
                // .set('authorization', `Bearer ${token}`)
                .end((error, result) => {
                    if (error) {

                        done(error)
                    } else {
                        expect(result).to.have.any.keys('statusCode')
                        expect(result.statusCode).to.equal(200)
                        expect(result).to.have.any.keys('body')
                        expect(result.body).to.have.any.keys('message')
                        expect(result.body.message).to.equal('Successfully Removed')
                        done()
                    }
                })
        })
        
       
        it('It should NOT  Delete Member of Board - Cannot find a board with this id', (done) => {

            chai.request(server)
             .delete(`/api/member/?boardid=2887&memberid=336`)
                .set('authorization', `Bearer ${token}`)
                .end((error, result) => {
                    if (error) {
                        done(error)
                    } else {
                        expect(result).to.have.any.keys('statusCode')
                        expect(result.statusCode).to.equal(404)
                        expect(result).to.have.any.keys('body')
                        // expect(result.body).to.have.any.keys('message')
                        // expect(result.body.message).to.equal('Cannot find a member of board with this id')
                        done()
                    }
                })
        })
        
    })

})
