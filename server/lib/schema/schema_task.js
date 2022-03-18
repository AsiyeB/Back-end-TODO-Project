exports.todoIdSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    todoId: {
      type: 'integer'
    }
  },
  required: [
    'todoId'
  ]
}
exports.taskIdSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    taskId: {
      type: 'integer'
    }
  },
  required: [
    'taskId'
  ]
}
exports.task = {
  type: 'object',
  additionalProperties: false,
  properties: {
    todoId: {
      type: 'integer'
    },
    checked: {
      type: 'boolean'
    },
    description: {
      type: 'string'
    },
    memberId: {
      type: 'integer'
    }
  },
  required: [
    'todoId',
    'checked',
    'description'
  ]
}
