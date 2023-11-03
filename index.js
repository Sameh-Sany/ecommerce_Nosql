const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
