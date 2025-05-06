require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const filmesRoutes = require("./src/routes/filmesRoutes.js");
const generosRoutes = require("./src/routes/generosRoutes.js");
reportRoutes = require("./src/routes/reportRoutes.js");

const setupSwagger = require("./src/config/swagger.js");

const app = express();

app.use(cors());
app.use(express.json());

setupSwagger(app);

app.use("uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/filmes", filmesRoutes);
app.use("/api/generos", generosRoutes);
app.use("/api/report", reportRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});