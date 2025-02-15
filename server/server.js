const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes.js");
const companyRoutes = require("./routes/companyRoutes.js");
const userRoutes = require("./routes/userRoutes.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Kết nối MongoDB
mongoose
  .connect("mongodb://localhost:27017/", {})
  .then(() => console.log("Kết nối MongoDB thành công!"))
  .catch((err) => console.error("Lỗi kết nối MongoDB:", err));

// Routes
app.use("/api/products", productRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/users", userRoutes);

// Khởi động server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
