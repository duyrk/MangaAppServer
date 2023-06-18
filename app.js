var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();
var db = require("./database/connectdb");

require("./components/genres/GenreModel");
require("./components/mangas/MangaModel");
require("./components/users/UserModel");

// api sesction
var chapterAPIRouter = require("./routes/API/Chapter");
var characterAPIRouter = require("./routes/API/Character");
var genreAPIRouter = require("./routes/API/Genre");
var mangaAPIRouter = require("./routes/API/Manga");
var userAPIRouter = require("./routes/API/User");
// cpanel section
var chapterCPanelRouter = require("./routes/CPanel/Chapter");
var characterCPanelRouter = require("./routes/CPanel/Character");
var genreCPanelRouter = require("./routes/CPanel/Genre");
var mangaCPanelRouter = require("./routes/CPanel/Manga");
var userCPanelRouter = require("./routes/CPanel/User");
db.connect();
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
//
app.use("/cpanel", indexRouter);
app.use("/cpanel/manga", mangaCPanelRouter);
app.use("/cpanel/genre", genreCPanelRouter);
app.use("/cpanel/user", userCPanelRouter);
app.use("/api/manga", mangaAPIRouter);
app.use("/api/genre", genreAPIRouter);
app.use("/api/user", userAPIRouter);
///

// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
