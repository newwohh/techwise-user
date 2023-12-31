process.setMaxListeners(50);
const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const paymentRouter = require("./routes/paymentRoutes");
const orderRouter = require("./routes/orderRoutes");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "views")));

app.use(cookieParser());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

//cors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,UPDATE,OPTIONS"
  );

  next();
});

// routes
app.get("/", (req, res) => {
  res.render("index");
});
app.use("/techwise/client/api/user", authRouter);
app.use("/techwise/client/api/product", productRouter);
app.use("/techwise/client/api/payment", paymentRouter);
app.use("/techwise/client/api/order", orderRouter);

module.exports = app;
