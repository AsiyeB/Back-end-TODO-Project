exports.todoIdSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    todoid: {
      type: 'integer'
    }
  },
  required: [
    'todoid'
  ]
}
exports.boardIdSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    boardid: {
      type: 'integer'
    }
  },
  required: [
    'boardid'
  ]
}
exports.todoSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    header: {
      type: 'string'
    },
    boardid: {
      type: 'integer'
    }
  },
  required: [
    'header',
    'boardid'
  ]
}
