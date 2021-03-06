define({ "api": [
  {
    "type": "get",
    "url": "/api/task/image/:taskId",
    "title": "Request Image information of a task with given id",
    "name": "GetImage",
    "group": "Task",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "taskId",
            "description": "<p>Task unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>Image of the Task.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "validationError",
            "description": "<p>given taskId is not valid.</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Not",
            "description": "<p>Authorized.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "notFound",
            "description": "<p>taskId cannot be found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controller/controller_task.js",
    "groupTitle": "Task"
  },
  {
    "type": "get",
    "url": "/api/task/:taskId",
    "title": "Request Task information with given id",
    "name": "GetTaskById",
    "group": "Task",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "taskId",
            "description": "<p>Task unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the Task.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "todoId",
            "description": "<p>TodoID of the Task.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "checked",
            "description": "<p>Checked of the Task.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of the Task.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>Image of the Task.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "validationError",
            "description": "<p>given taskId is not valid.</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Not",
            "description": "<p>Authorized.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "notFound",
            "description": "<p>taskId cannot be found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controller/controller_task.js",
    "groupTitle": "Task"
  },
  {
    "type": "get",
    "url": "/api/task",
    "title": "Request Tasks information",
    "name": "GetTasks",
    "group": "Task",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "tasks",
            "description": "<p>Information of all Tasks.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "validationError",
            "description": "<p>todoID is not valid.</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Not",
            "description": "<p>Authorized.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controller/controller_task.js",
    "groupTitle": "Task"
  },
  {
    "type": "post",
    "url": "/api/task/",
    "title": "Create a new Task",
    "name": "addTask",
    "group": "Task",
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "Object",
            "optional": false,
            "field": "status-message",
            "description": "<p>adding operation.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "validationError",
            "description": "<p>given task is not valid.</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "errCatch",
            "description": "<p>emptybody or not json.</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Not",
            "description": "<p>Authorized.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controller/controller_task.js",
    "groupTitle": "Task"
  },
  {
    "type": "delete",
    "url": "/api/task/:taskId",
    "title": "Delete a Task",
    "name": "removeTask",
    "group": "Task",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "taskId",
            "description": "<p>Task unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "status-message",
            "description": "<p>removing operation.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "validationError",
            "description": "<p>given taskId is not valid.</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Not",
            "description": "<p>Authorized.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "notFound",
            "description": "<p>taskId cannot be found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controller/controller_task.js",
    "groupTitle": "Task"
  },
  {
    "type": "put",
    "url": "/api/task/:taskId",
    "title": "Update a Task",
    "name": "updateTask",
    "group": "Task",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "taskId",
            "description": "<p>Task unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "status-message",
            "description": "<p>updating operation.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "validationError",
            "description": "<p>given taskId is not valid.</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "errCatch",
            "description": "<p>emptybody or not json.</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Not",
            "description": "<p>Authorized.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "notFound",
            "description": "<p>taskId cannot be found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controller/controller_task.js",
    "groupTitle": "Task"
  },
  {
    "type": "post",
    "url": "api/board",
    "title": "Add Board",
    "name": "addBoard",
    "group": "board",
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Created .massage  Successfully Added.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "object",
            "optional": false,
            "field": "validaton",
            "description": "<p>Error.</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "type": "object",
            "optional": false,
            "field": "Not",
            "description": "<p>authorized.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controller/controller-board.js",
    "groupTitle": "board"
  },
  {
    "type": "get",
    "url": "/api/board",
    "title": "Request Board information",
    "name": "getBoard",
    "group": "board",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name board .</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "member",
            "description": "<p>Members board .</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "owner",
            "description": "<p>Owner group .</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "type": "object",
            "optional": false,
            "field": "Not",
            "description": "<p>authorized.</p>"
          }
        ],
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The <code>id</code> of the User was not found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controller/controller-board.js",
    "groupTitle": "board"
  },
  {
    "type": "get",
    "url": "/api/board",
    "title": "Request Board information By id",
    "name": "getBoard",
    "group": "board",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "boardId",
            "description": "<p>boards unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name board .</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "member",
            "description": "<p>Members board .</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "owner",
            "description": "<p>Owner group .</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "object",
            "optional": false,
            "field": "validaton",
            "description": "<p>Error.</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "type": "object",
            "optional": false,
            "field": "Not",
            "description": "<p>authorized.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controller/controller-board.js",
    "groupTitle": "board"
  },
  {
    "type": "get",
    "url": "/api/boards",
    "title": "Request all board information",
    "name": "getBoarsDetail",
    "group": "board",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name board .</p>"
          },
          {
            "group": "Success 200",
            "type": "integre",
            "optional": false,
            "field": "ownerid",
            "description": "<p>owner board id.</p>"
          },
          {
            "group": "Success 200",
            "type": "integre",
            "optional": false,
            "field": "boardid",
            "description": "<p>board id.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>owner username .</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "object",
            "optional": false,
            "field": "validatonError.",
            "description": ""
          }
        ],
        "401": [
          {
            "group": "401",
            "type": "object",
            "optional": false,
            "field": "Not",
            "description": "<p>authorized.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controller/controller-member.js",
    "groupTitle": "board"
  },
  {
    "type": "get",
    "url": "/api/lastBoard",
    "title": "get last board added",
    "name": "getlastBoard",
    "group": "board",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name board .</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "boardid",
            "description": "<p>id board .</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "ownerid",
            "description": "<p>id Owner board .</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "type": "object",
            "optional": false,
            "field": "Not",
            "description": "<p>authorized.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controller/controller-board.js",
    "groupTitle": "board"
  },
  {
    "type": "delete",
    "url": "api/board",
    "title": "delete board",
    "name": "removeBoard",
    "group": "board",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "boardId",
            "description": "<p>board unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "status",
            "description": "<p>ok.massage  Successfully Removed.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "object",
            "optional": false,
            "field": "validaton",
            "description": "<p>Error.</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "type": "object",
            "optional": false,
            "field": "Not",
            "description": "<p>authorized.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "type": "object",
            "optional": false,
            "field": "Cannot",
            "description": "<p>find a board with this id.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controller/controller-board.js",
    "groupTitle": "board"
  },
  {
    "type": "put",
    "url": "api/board",
    "title": "Update board information",
    "name": "updateBoard",
    "group": "board",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "boardId",
            "description": "<p>board unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "status",
            "description": "<p>ok .massage  Successfully Updated .</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "object",
            "optional": false,
            "field": "validaton",
            "description": "<p>Error.</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "type": "object",
            "optional": false,
            "field": "Not",
            "description": "<p>authorized.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "type": "object",
            "optional": false,
            "field": "Cannot",
            "description": "<p>find a board with this id.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controller/controller-board.js",
    "groupTitle": "board"
  },
  {
    "type": "post",
    "url": "api/login",
    "title": "login user",
    "name": "login",
    "group": "enter",
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Successfully login.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "object",
            "optional": false,
            "field": "validaton",
            "description": "<p>Error.</p>"
          },
          {
            "group": "400",
            "type": "object",
            "optional": false,
            "field": "password",
            "description": "<p>i wrong</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "type": "object",
            "optional": false,
            "field": "Not",
            "description": "<p>authorized.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controller/controller_enter.js",
    "groupTitle": "enter"
  },
  {
    "type": "post",
    "url": "api/signup",
    "title": "Add new user",
    "name": "signUp",
    "group": "enter",
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Created .massage Successfully SignUp.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "object",
            "optional": false,
            "field": "validaton",
            "description": "<p>Error.</p>"
          },
          {
            "group": "400",
            "type": "object",
            "optional": false,
            "field": "repeated",
            "description": "<p>username</p>"
          },
          {
            "group": "400",
            "type": "object",
            "optional": false,
            "field": "password",
            "description": "<p>Policy missing</p>"
          },
          {
            "group": "400",
            "type": "object",
            "optional": false,
            "field": "The",
            "description": "<p>body is probably empty or is not a json</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "type": "object",
            "optional": false,
            "field": "Not",
            "description": "<p>authorized.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controller/controller_enter.js",
    "groupTitle": "enter"
  },
  {
    "type": "post",
    "url": "api/member",
    "title": "Add Member",
    "name": "addMemberToBoard",
    "group": "member",
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Created .massage  Successfully Added.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "object",
            "optional": false,
            "field": "validaton",
            "description": "<p>Error.</p>"
          },
          {
            "group": "400",
            "type": "object",
            "optional": false,
            "field": "The",
            "description": "<p>body is probably empty or is not a json.</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "type": "object",
            "optional": false,
            "field": "Not",
            "description": "<p>authorized.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controller/controller-member.js",
    "groupTitle": "member"
  },
  {
    "type": "get",
    "url": "/api/member/:username",
    "title": "Request Member Name By Username",
    "name": "getMemberNameByUsername",
    "group": "member",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>member username</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>first name member  .</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>last nmae member .</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "memberid",
            "description": "<p>id meber .</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "object",
            "optional": false,
            "field": "validatonError.",
            "description": ""
          }
        ],
        "401": [
          {
            "group": "401",
            "type": "object",
            "optional": false,
            "field": "Not",
            "description": "<p>authorized.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "type": "object",
            "optional": false,
            "field": "Cannot",
            "description": "<p>find a member with this username.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controller/controller-member.js",
    "groupTitle": "member"
  },
  {
    "type": "get",
    "url": "/api/members/:boardid",
    "title": "Request Members board",
    "name": "getMembersBoard",
    "group": "member",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "boardid",
            "description": "<p>board id unique</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "members",
            "description": "<p>member information  .</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "object",
            "optional": false,
            "field": "validatonError.",
            "description": ""
          }
        ],
        "401": [
          {
            "group": "401",
            "type": "object",
            "optional": false,
            "field": "Not",
            "description": "<p>authorized.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "type": "object",
            "optional": false,
            "field": "Cannot",
            "description": "<p>find a board with this id or board not have any member</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controller/controller-member.js",
    "groupTitle": "member"
  },
  {
    "type": "get",
    "url": "/api/username/:memberid",
    "title": "Request username member by id",
    "name": "getOwnerUsername",
    "group": "member",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "memberid",
            "description": "<p>member id is unique</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>first name member  .</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "object",
            "optional": false,
            "field": "validatonError.",
            "description": ""
          },
          {
            "group": "400",
            "type": "object",
            "optional": false,
            "field": "The",
            "description": "<p>body is probably empty or is not a json</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "type": "object",
            "optional": false,
            "field": "Not",
            "description": "<p>authorized.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "type": "object",
            "optional": false,
            "field": "Cannot",
            "description": "<p>find a username with this id.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controller/controller-member.js",
    "groupTitle": "member"
  },
  {
    "type": "get",
    "url": "/api/lastMember",
    "title": "Request last member added",
    "name": "getlastMember",
    "group": "member",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>first name member  .</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>last nmae member .</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "memberid",
            "description": "<p>id meber .</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>member username .</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "object",
            "optional": false,
            "field": "validatonError.",
            "description": ""
          },
          {
            "group": "400",
            "type": "object",
            "optional": false,
            "field": "The",
            "description": "<p>body is probably empty or is not a json</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "type": "object",
            "optional": false,
            "field": "Not",
            "description": "<p>authorized.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controller/controller-member.js",
    "groupTitle": "member"
  },
  {
    "type": "delete",
    "url": "api/member",
    "title": "delete member",
    "name": "removeMember",
    "group": "member",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "integer",
            "optional": false,
            "field": "memberid",
            "description": "<p>memberid unique ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "integer",
            "optional": false,
            "field": "boardid",
            "description": "<p>bordid unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "status",
            "description": "<p>ok.massage  Successfully Removed.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "object",
            "optional": false,
            "field": "validaton",
            "description": "<p>Error.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "type": "object",
            "optional": false,
            "field": "Cannot",
            "description": "<p>find amember of board with this id</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controller/controller-member.js",
    "groupTitle": "member"
  },
  {
    "type": "delete",
    "url": "api/user",
    "title": "delete member",
    "name": "removeUser",
    "group": "member",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "username",
            "description": "<p>member username</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "status",
            "description": "<p>ok.massage  Successfully Deleted.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "object",
            "optional": false,
            "field": "validaton",
            "description": "<p>Error.</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "type": "object",
            "optional": false,
            "field": "Not",
            "description": "<p>authorized.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "type": "object",
            "optional": false,
            "field": "Cannot",
            "description": "<p>find a User with this username</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controller/controller-member.js",
    "groupTitle": "member"
  },
  {
    "type": "post",
    "url": "/api/todo",
    "title": "add new todo.",
    "name": "addToDo_",
    "group": "todo_",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": ".",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "object",
            "optional": false,
            "field": "status",
            "description": "<p>todo created.message: todo Successfully Added.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "object",
            "optional": false,
            "field": "ValidatonError",
            "description": "<p>The todoSchema is not valid.</p>"
          },
          {
            "group": "400",
            "type": "object",
            "optional": false,
            "field": "CatchError",
            "description": "<p>The body is probably empty or is not in json type.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controller/controller_todo.js",
    "groupTitle": "todo_"
  },
  {
    "type": "get",
    "url": "/api/check/:todoId",
    "title": "get number of unchecked tasks  by specific id of todo.",
    "name": "checkTask_",
    "group": "todo_",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "todoId",
            "description": "<p>id of todo.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "status",
            "description": "<p>number of unchecked tasks.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "ValidatonError",
            "description": "<p>The todo id is not valid.</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Not",
            "description": "<p>Authorized.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The todo id is not found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controller/controller_todo.js",
    "groupTitle": "todo_"
  },
  {
    "type": "get",
    "url": "/api/:todoId",
    "title": "get todo by specific id.",
    "name": "getToDoById_",
    "group": "todo_",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "todoId",
            "description": "<p>id of todo.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "header",
            "description": "<p>title of todo.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "tasks",
            "description": "<p>array of taskes in todo.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "boardId",
            "description": "<p>boardId of same todos .</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "todoId",
            "description": "<p>id of todo .</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "ValidatonError",
            "description": "<p>The todo id is not valid.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The todo id is not found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controller/controller_todo.js",
    "groupTitle": "todo_"
  },
  {
    "type": "delete",
    "url": "/api/todo/tasks/:todoId",
    "title": "remove all tasks of a todo with a specific id.",
    "name": "removeAllTasks_",
    "group": "todo_",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "todoId",
            "description": "<p>id of todo.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "status",
            "description": "<p>ok.message All Tasks Successfully Removed.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "object",
            "optional": false,
            "field": "ValidatonError",
            "description": "<p>The todoSchema is not valid.</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "type": "object",
            "optional": false,
            "field": "Not",
            "description": "<p>authorized.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "type": "object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The todo id is not found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controller/controller_todo.js",
    "groupTitle": "todo_"
  },
  {
    "type": "delete",
    "url": "/api/todo/:todoId",
    "title": "remove todo by specific id.",
    "name": "removeToDo_",
    "group": "todo_",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "todoId",
            "description": "<p>id of todo.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "status",
            "description": "<p>ok.message  todo Successfully Deleted.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "object",
            "optional": false,
            "field": "ValidatonError",
            "description": "<p>The todoSchema is not valid.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "type": "object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The todo id is not found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controller/controller_todo.js",
    "groupTitle": "todo_"
  },
  {
    "type": "put",
    "url": "/api/todo/:todoId",
    "title": "update todo by specific id.",
    "name": "updateToDo_",
    "group": "todo_",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "todoId",
            "description": "<p>id of todo.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "status",
            "description": "<p>ok.message  todo Successfully Updated.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "object",
            "optional": false,
            "field": "ValidatonError",
            "description": "<p>The todoSchema is not valid.</p>"
          },
          {
            "group": "400",
            "type": "object",
            "optional": false,
            "field": "CatchError",
            "description": "<p>The body is probably empty or is not in json type.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "type": "object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>The todo id is not found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controller/controller_todo.js",
    "groupTitle": "todo_"
  },
  {
    "type": "get",
    "url": "/api/todo",
    "title": "get all todos.",
    "name": "getToDos_",
    "group": "todos_",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": ".",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "todos",
            "description": "<p>array of todos in board.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "validatonError",
            "description": "<p>The todo id is not valid.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controller/controller_todo.js",
    "groupTitle": "todos_"
  }
] });
