const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");
const path = require("path");

connectToMongo();
const app = express();
const port = 5000;

app.use(cors({
  origin: "*",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}));
app.use(express.json());

// Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

// app.use(express.static(path.join(__dirname, "../build")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../build/index.html"));
// });
app.use(express.static(__dirname + "/public"));
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => {
  res.json({ message: "API is running on Vercel!" });
});

app.listen(process.env.PORT || port, () => {
  console.log(`Cred-Wallet backend listening at http://localhost:${port}`);
});
module.exports = app;
process.on("SIGTERM", () => {
  console.log("Shutting down...");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});
