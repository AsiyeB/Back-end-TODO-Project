define({ "api": [
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
