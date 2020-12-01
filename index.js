
const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');

const appRoute = require("./routes/appRoute.js");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/", appRoute);

app.listen('3000', () => console.log(`listening on PORT 3000`));