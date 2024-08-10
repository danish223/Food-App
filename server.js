const express = require("express");
const bodyParser = require('body-parser');
const authRoutes = require('./Routes/auth');
const userRoutes = require('./Routes/user');
const resturantRoutes = require('./Routes/resturant');
const CATRoutes = require('./Routes/category');
const foodRoutes = require('./Routes/food');
const orderRoutes = require('./Routes/order');
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");


const app = express();


// dot env config
dotenv.config();

// PORT
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use('/auth/user', authRoutes);
app.use('/user', userRoutes);
app.use('/resturant', resturantRoutes);
app.use('/category', CATRoutes);
app.use('/food', foodRoutes);
app.use('/orders', orderRoutes);



app.get("/", (req, res) => {
  res.send("hello world");
});

mongoose
  .connect(process.env.MONGO_URL, {
    serverSelectionTimeoutMS: 50000 
  })
  .then(() => {
    console.log('MongoDb Connected!');
    
    app.listen(PORT, () => {
      console.log(`Server is Running on PORT: ${PORT}`);
    });
  });
