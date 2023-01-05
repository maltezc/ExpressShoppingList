"use strict"

const express = require("express");
const app = express();

// useful error class to throw
const { NotFoundError } = require("./expressError");

app.use("/items", userRoutes)
app.get("/items", function (req, res) {

})





