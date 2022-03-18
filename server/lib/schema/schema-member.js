exports.boardIdSchema = {
  type: 'object',
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
exports.usernameSchema = {
  type: 'object',
  additionalProperties: true,
  properties: {
    username: {
      type: 'string'
    }
  },
  required: [
    'username'
  ]
}

exports.memberIdSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    username: {
      type: 'string'
    }
  },
  required: [
    'username'
  ]
}
exports.memberUsernameSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    memberid: {
      type: 'integer'
    }
  },
  required: [
    'memberid'
  ]
}
exports.memberSchema = {
  type: 'object',
  additionalProperties: true,
  properties: {
    firstname: {
      type: 'string'
    },
    lastname: {
      type: 'string'
    }
  },
  required: [
    'firstname',
    'lastname'
  ]
}
exports.boardMemberSchema = {
  type: 'object',
  additionalProperties: true,
  properties: {
    boardid: {
      type: 'integer'
    },
    memberid: {
      type: 'integer'
    }
  },
  required: [
    'boardid',
    'memberid'
  ]
}
exports.userSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    firstname: {
      type: 'string'
    },
    lastname: {
      type: 'string'
    },
    image: {
      type: 'string'
    },
    username: {
      type: 'string'
    },
    password: {
      type: 'string'
    }
  },
  required: [
    'firstname',
    'lastname',
    'image',
    'username',
    'password'
  ]
}
exports.userpassSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    username: {
      type: 'string'
    },
    password: {
      type: 'string'
    }
  },
  required: [
    'username',
    'password'
  ]
}
