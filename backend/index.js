const express = require("express");

const { connectMongoDB } = require("./connection");
const urlRouter = require("./routes/urlRoutes");

const app = express();
const PORT = 8001;

const mongoURL = "mongodb://127.0.0.1:27017/test-mongo-connect";

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/url", urlRouter);

connectMongoDB(mongoURL).then(() => {
    app.listen(PORT, () => {
        console.log("Server started sucessfully !!");
    });
});
