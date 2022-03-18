exports.boardIdSchema = { type: 'object',
  additionalProperties: true,
  properties: {
    boardid: {
      type: 'integer'
    }
  },
  required: [
    'boardid'
  ]
}

exports.boardSchema = { type: 'object',
  additionalProperties: true,
  properties: {
    name: {
      type: 'string'
    }
  },
  required: [
    'name'
  ]
}
