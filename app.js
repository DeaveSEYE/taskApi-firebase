const express = require("express");
const bodyParser = require("body-parser");
const errorHandler = require("./middlewares/errorHandler");

const root = require("./routes/root");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

const app = express();

// Middlewares
app.use(bodyParser.json());

// Routes
app.use("/", root);
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);
app.use("/categories", categoryRoutes);

// Gestion des erreurs
app.use(errorHandler);

// Lancer le serveur
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
