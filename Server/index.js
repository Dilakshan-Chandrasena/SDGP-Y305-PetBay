const { db } = require("./config/firebase.js");
const express = require("express");
const logger = require("morgan");
const dotenv = require("dotenv").config();
const cors = require("cors");
const CustomError = require("./utils/CustomError.js");
const globalErrorHandler = require("./controllers/errorController.js");

const petProfileRoute = require("./routes/petProfileRoute.js");
const petRecordRoute = require("./routes/petRecordRoute.js");
const breedRecommendationRoute = require("./routes/breedRecommendationRoute.js");
const usersRouter = require("./routes/usersRouter.js");
const lostFoundRoute = require("./routes/lostFoundRoute.js");
const reminderRouter = require("./routes/remindersRouter.js")
const communityRouter = require("./routes/communityRoute.js")


const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(cors());


app.use("/petbay/api/v1/pet-profiles/", petProfileRoute);
app.use("/petbay/api/v1/pet-records/", petRecordRoute);
app.use("/petbay/api/v1/breed-recommendation/", breedRecommendationRoute);
app.use("/petbay/api/v1/users", usersRouter);
app.use("/petbay/api/v1/reminders/", reminderRouter);
app.use("/petbay/api/v1/community/", communityRouter);
app.use("/petbay/api/v1/lost-found/", lostFoundRoute);

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
