/**
 * Service for Task operations.
 */

"use strict";
const mongoose = require("mongoose"),
  Task = mongoose.model("Tasks"),
  utilConstants = require("../utils/Constants");

/**
 * Saves and returns the new task object.
 *
 * @param {Object} taskObj {task object}
 */
exports.createTask = function (taskObj) {
  const newTask = new Task(taskObj);
  const promise = newTask.save();
  return promise;
};

/**
 * Updates and returns the Task object.
 * @param {Object} userStory {Task object}
 * @param {String} taskId
 */
exports.updateTask = function (taskId) {
  const promise = Task.findOneAndUpdate(
    { _id: taskId },
    { $set: { completed: true } },
  ).exec();
  return promise;
};

/**
 * Returns the list of tasks assigned to the user
 *
 * @param {string} userName {user name of the user}
 */
exports.getTasks = function (userName) {
  const promise = Task.find({ "assignee.userName": userName }).exec();
  return promise;
};
