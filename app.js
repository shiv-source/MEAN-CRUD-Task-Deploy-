const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

//connect the db configuration connection.
const dbConnection = require("./utils/db.config");

//use all the installed packages.
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Add routes here.
const userRouter = require("./routes/user");
app.use("/api/", userRouter);

//For running angular-app.Serve only the static files form the dist directory
app.use(express.static("./dist/task"));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "/dist/task/index.html"));
});


// Custom 404 not found error or 500 for internal server error.
app.use( (req, res , next ) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

app.use( (error, req, res, next ) => {
    res.status(error.status || 500);
    res.json({
        error : {
            message : error.message
        }
    })
})


module.exports = app;
