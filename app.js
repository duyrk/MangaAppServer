var createError = require("http-errors");
var express = require("express");
var cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var dotenv = require("dotenv");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

dotenv.config();
var app = express();
var db = require("./database/connectdb");
app.use(cors());
require("./components/genres/GenreModel");
require("./components/mangas/MangaModel");
require("./components/users/UserModel");
require("./components/chapters/ChapterModel");
require("./components/characters/CharacterModel");
require("./components/pages/PageModel");
require("./components/teams/TeamModel");
require("./components/bins/BinModel");
// api sesction
var mangaAPIRouter = require("./routes/API/Manga");
var userAPIRouter = require("./routes/API/User");
// cpanel section
var genreCPanelRouter = require("./routes/CPanel/Genre");
var mangaCPanelRouter = require("./routes/CPanel/Manga");
var userCPanelRouter = require("./routes/CPanel/User");
db.connect();
// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");

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
app.use("/api/user", userAPIRouter);
///

// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

module.exports = app;
