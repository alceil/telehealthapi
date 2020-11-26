
const express = require("express");

const appRoute = require("./routes/appRoute.js");

const app = express();

app.use(express.json());

app.use("/api/", appRoute);

app.listen('3000', () => console.log(`listening on PORT 3000`));