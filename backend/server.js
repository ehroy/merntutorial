const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT;
const router = require("./routes/routes.js");
const errorHandler = require("./middlewer/midle.js");
const color = require("colors");
const connectDB = require("./config/db.js");

connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(process.env.BASEURL, router);
app.use(errorHandler);

app.listen(port, () => console.log(`server runing ${port}`));
