// app.js
const express = require("express");
const app = express();
const itemsRoutes = require("./itemsRoutes");

app.use(express.json());
app.use("/items", itemsRoutes);

// 404 handler
app.use((req, res, next) => {
  return res.status(404).json({ error: "Not Found" });
});

// Generic error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  return res.status(status).json({ error: err.message });
});

module.exports = app;
