const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const { contactsRouter, authRouter } = require("./routes/api");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use("/users", authRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message || "Something went wrong. Please, try again later",
  });
});
module.exports = app;
