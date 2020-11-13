"use strict";
module.exports = function (app) {
  //Initialize models
  const taskModel = require("./models/task");
  //Initialize routes
  let taskRoutes = require("./routes/task-route");
  taskRoutes(app);
};
