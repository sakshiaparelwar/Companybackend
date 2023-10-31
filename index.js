const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const employeeRoutes = require("./routes/EmployeeRoutes");

mongoose.set("strictQuery", true);
mongoose.connect(
  "mongodb+srv://sakshi:dbsakshi1234@cluster0.nkp4liz.mongodb.net/MyCompany"
);
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

app.listen(5000, () => {
  console.log("server listening on 5000");
});
