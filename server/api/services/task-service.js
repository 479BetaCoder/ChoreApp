/**
 * Service for Task operations.
 */

"use strict";
const mongoose = require("mongoose"),
  Task = mongoose.model("Tasks");

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
 * Clears all the tasks
 */
exports.deleteTasks = function () {
  const promise = Task.deleteMany().exec();
  return promise;
};



/**
 * Returns the list of tasks
 */
exports.getTasks = function () {
  const promise = Task.find().exec();
  return promise;
};
