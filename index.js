const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 3000;
const app = express();
const db = require("./src/config/db");
const BaseError = require("./src/utils/BaseError");
const RouteNotFoundError = require("./src/utils/RouteNotFoundError");

// import routes
const uploadRoutes = require("./src/routes/upload.route");
const authRoutes = require("./src/routes/auth.route");
const productRoutes = require("./src/routes/product.route");
const categoryRoutes = require("./src/routes/category.route");

// use middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

// use routes
app.use("/api", uploadRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

// error handling middleware
app.use("*", (req, res, next) => {
  next(
    new RouteNotFoundError(
      "You reached a route that is not defined on this server"
    )
  );
});

app.use((err, req, res, next) => {
  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({
      success: err.success,
      message: err.message,
      statusCode: err.statusCode,
      errors: err.errors,
    });
  }
  console.log(err);
  next();
});
process.on("unhandledRejection", (error) => console.log(error));
process.on("uncaughtException", (error) => console.log(error));

// connect to database
db.connect();

app.listen(port, () => {
  console.log("Server is running on port 3000");
});
