const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const { connectMongoDB } = require("./connection");
const {
    restrictToLoggedInUserOnly,
    checkAuth,
} = require("./middlewares/authMiddleware");

// All Routes
const urlRouter = require("./routes/urlRoutes");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const app = express();
const PORT = 8001;

const mongoURL = "mongodb://127.0.0.1:27017/test-mongo-connect";

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// Serve static files (CSS, JS, images) from views folder
app.use(express.static(path.resolve("./views")));

app.use("/url", restrictToLoggedInUserOnly, urlRouter);
app.use("/user", userRoute);
app.use("/", checkAuth, staticRoute);

connectMongoDB(mongoURL).then(() => {
    app.listen(PORT, () => {
        console.log("Server started sucessfully !!");
    });
});
