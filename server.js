require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const filmesRoutes = require("./src/routes/filmesRoutes.js");
const generosRoutes = require("./src/routes/generosRoutes.js");