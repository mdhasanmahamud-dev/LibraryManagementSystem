const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const port = process.env.PORT || 5000;

//MIDDLEWARES
app.use(express.json());
app.use(cors());

// ROUTES IMPORT HERE
const studentRoutes = require("./src/routes/studentRoute.js");

//ROUTES USE HERE
app.use("/api/students", studentRoutes);

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });
}

main()
  .then(() => console.log("Mongodb connected Successfully"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
