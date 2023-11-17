const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const employeeRoutes = require("./routes/EmployeeRoutes");
const dotenv = require("dotenv");

dotenv.config();

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGODB);
const db = mongoose.connection;
db.on("error", () => {
  console.log("Error while connecting to database");
});
db.on("open", () => {
  console.log("Database connected");
});

app.use(express.json());
app.use(cors());
app.use("/employees", employeeRoutes);

app.listen(5001, () => {
  console.log("server listening on 5001");
});
