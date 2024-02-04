const { db } = require("./config/firebase.js");
const express = require("express");
const logger = require("morgan");
const dotenv = require("dotenv").config();
const CustomError = require("./utils/CustomError.js");
const globalErrorHandler = require("./controllers/errorController.js");
const usersRouter = require("./routes/users.Router.js");

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));

app.use("/petbay/api/v1/users", usersRouter);

app.all("*", (req, res, next) => {
  const err = new CustomError(
    `Invalid Call! URL Not Found: ${req.originalUrl}`,
    404
  );
  next(err);
});

app.use(globalErrorHandler);

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
