const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");

app.use(cors());
const userRoute = require("./routes/userRoute");

app.use(express.json());

mongoose
  .connect(process.env.URI.toString(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
  })
  .then(() => {
    console.log("Successfully Connected");
    app.listen(process.env.PORT || 8000, (err) => {
      if (err) console.log(err);
      console.log("Running successfully at ", process.env.PORT);
    });
  });
app.use(userRoute);
