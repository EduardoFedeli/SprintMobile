const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`🚀 API rodando na porta ${port}`));
