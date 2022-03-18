
const { getToDos, getToDoById, addToDo, updateToDo, removeToDo, getNumTodosBoard, checkTask, removeAllTasks } = require('../controller/controller_todo')
const { getTasks, getTaskById, addTask, updateTask, removeTask, getNumTaskOfBoard, getNumRemainTaskOfBoard, getImage } = require('../controller/controller_task')
const { getMemberNameByUsername, getMembersBoard, getBoarsDetail, addMember, getlastMember, addMemberToBoard, getOwnerUsername, removeMember, removeUser } = require('../controller/controller-member')
const { addBoard, getBoard, removeBoard, updateBoard, getBoardById, getlastBoard } = require('../controller/controller-board')
const { login, signUp } = require('../controller/controller_enter')
const serveStatic = require('serve-static')
const finalhandler = require('finalhandler')
// const server = http.createServer()

var serve = serveStatic('public/dist', {
  index: ['index.html']

})

const router = require('find-my-way')({
  defaultRoute: (request, response) => {
    serve(request, response, finalhandler(request, response))
  }
})
router.get('/api/todo', getToDos) // complete
router.get('/api/todo/:todoid', getToDoById) // complete
router.get('/api/todoNumber/:boardid', getNumTodosBoard) // complete
router.post('/api/todo', addToDo) // complete
router.put('/api/todo/:todoid', updateToDo) // complete
router.delete('/api/todo/:todoid', removeToDo) // complete
router.get('/api/todo/check/:todoid', checkTask) // complete
router.delete('/api/todo/tasks/:todoid', removeAllTasks) // complete

router.get('/api/lastBoard', getlastBoard)// complete test
router.post('/api/board', addBoard)// complete test
router.get('/api/board', getBoard)// complete test
router.delete('/api/board/:boardId', removeBoard)// complete test
router.put('/api/board/:boardId', updateBoard)// complete test
router.get('/api/board/:boardId', getBoardById)// complete test
router.get('/api/boards', getBoarsDetail) // complete test

// router.delete('/api/member/:username', removeMember)
// router.post('/api/member', addMember)
router.post('/api/addMemberToBoard', addMemberToBoard) // ok
router.get('/api/lastMember', getlastMember) // ok
router.get('/api/member/:username', getMemberNameByUsername) // ok
router.get('/api/members/:boardid', getMembersBoard) // ok
router.get('/api/username/:memberid', getOwnerUsername) // ok
router.delete('/api/member', removeMember)

router.get('/api/task', getTasks)
router.get('/api/task/:taskId', getTaskById)
router.get('/api/task/image/:taskId', getImage)
router.get('/api/taskNumber/:boardid', getNumTaskOfBoard) // complete
router.get('/api/remainTaskNumber/:boardid', getNumRemainTaskOfBoard) // complete
router.post('/api/task', addTask)
router.put('/api/task/:taskId', updateTask)
router.delete('/api/task/:taskId', removeTask)

router.post('/api/signup', signUp)
router.post('/api/login', login)// complete

exports.router = router
