const utilConstants = require("./api/utils/Constants");
const path = require("path");
const express = require("express"),
  app = express(),
  port = process.env.PORT || utilConstants.PORT,
  mongoose = require("mongoose"), //created model loading here
  bodyParser = require("body-parser");
const cors = require("cors");

// mongoose instance connection url connection
mongoose.connect(utilConstants.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  promiseLibrary: global.Promise,
});

// enable cors
app.use(cors());

//Adding body parser for handling request and response objects.
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

// serve the static react app
app.use(express.static("webapp/build"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "webapp", "build", "index.html"));
});

//Initialize app
let initApp = require("./api/app");
initApp(app);

app.listen(port);
console.log("ChoreApp RESTful API server started on: " + port);
