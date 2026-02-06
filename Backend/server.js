require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/qrs", require("./routes/qrRoutes"));
app.use("/r", require("./routes/redirectRoutes"));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on ${PORT}`)
);
