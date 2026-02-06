const express = require("express");
const path = require("path");
const { connectMongoDB } = require("./connection");
const urlRouter = require("./routes/urlRoutes");
const staticRoute = require("./routes/staticRouter");
const URL = require("./models/schemaURL");

const app = express();
const PORT = 8001;

const mongoURL = "mongodb://127.0.0.1:27017/test-mongo-connect";

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve static files (CSS, JS, images) from views folder
app.use(express.static(path.resolve("./views")));

app.use("/url", urlRouter);
app.use("/", staticRoute);

connectMongoDB(mongoURL).then(() => {
    app.listen(PORT, () => {
        console.log("Server started sucessfully !!");
    });
});
