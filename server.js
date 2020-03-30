const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");


const app = express();
const PORT = process.env.PORT || 8080;

const routes = require('./routes/api');

//const MONGODB_URI =
//"mongodb+srv://lintonn:x9S6Nm8cJxAX37m@inventoryapp-b0oan.mongodb.net/test?retryWrites=true&w=majority";

//mongodb+srv://lintonn:x9S6Nm8cJxAX37m@inventoryapp-b0oan.mongodb.net/test?retryWrites=true&w=majority

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/inventory", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected!!!");
});

app.use(express.json());
app.use(express.urlencoded({ etended: false }));

// HTTP request logger
app.use(morgan("tiny"));
app.use('/api', routes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('my-app/build'));
}

app.listen(PORT, console.log(`Server is starting at ${PORT}`));
