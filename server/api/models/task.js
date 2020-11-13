"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Mongoose schema for userStory object.
 */
let taskSchema = new Schema(
  {
    /**
     * Assignee for the tasks
     */
    assignee: {
      type: String,
      required: "Task Assignee is required",
    },
    /**
     * Task description.
     */
    description: {
      type: String,
      required: "Task Description is required",
    },
    /**
     * Task status.
     */
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Tasks", taskSchema);
