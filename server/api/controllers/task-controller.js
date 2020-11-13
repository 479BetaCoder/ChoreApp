"use strict";
//import task service.
const taskService = require("../services/task-service"),
      utilConstants = require("../utils/Constants"),
      log4js = require("log4js");

log4js.configure({
  appenders: {
    everything: { type: "file", filename: "logs/choreApp.log" },
  },
  categories: {
    default: { appenders: ["everything"], level: "debug" },
  },
});

const logger = log4js.getLogger("choreApp");

/**
 * Creates a new task with the request JSON and
 * returns success response.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.createTask = function (request, response) {
    try {
        const newTask = Object.assign({}, request.body);
        const resolve = (newTask) => {
          response.status(201).json(newTask);
        };
        taskService
          .createTask(newTask)
          .then(resolve)
          .catch(renderErrorResponse(response));
      } catch (err) {
        renderErrorResponse(err);
      }
};

/**
 * Returns Updated Task response.
 *
 * @param request
 * @param response
 */
exports.updateTask = (request, response) => {
  try {
    const resolve = () => {
        response.status(200).json({
            message: "Successfully Updated the task"
        });
    };
    taskService
      .updateTask(request.params.taskId)
      .then(resolve)
      .catch(renderErrorResponse(response));
  } catch (err) {
    renderErrorResponse(err);
  }
};

exports.getTasks = (_request, response) => {
  try {
        const resolve = (tasks) => {
            response.status(200);
            response.json(tasks);
    };

    taskService
      .getTasks()
      .then(resolve)
      .catch(renderErrorResponse(response));

  } catch(err){
    renderErrorResponse(err)
  }
}

/**
 * Throws error if error object is present.
 *
 * @param {Response} response The response object
 * @return {Function} The error handler function.
 */
let renderErrorResponse = (response) => {
  const errorCallback = (error) => {
    if (error && error.message === utilConstants.TASK_ASSIGNEE_VALIDATION_ERROR) {
        logger.warn(`Client error: ${error.message}`);
        response.status(400).json({
            message: utilConstants.ASSIGNEE_ERROR,
        });
    } else if (error && error.message === utilConstants.TASK_DESC_VALIDATION_ERROR) {
        response.status(400);
        logger.warn(`Client error: ${error.message}`);
        response.json({
            message: utilConstants.TASK_DESC_ERROR,
        });
    } else {
      response.status(500);
      logger.fatal(`Server error: ${error.message}`);
      response.json({
        message: utilConstants.SERVER_ERR,
      });
    }
  };

  return errorCallback;
};
