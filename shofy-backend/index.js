
// require("dotenv").config();
// const express = require("express");
// const app = express();
// const path = require('path');
// const cors = require("cors");
// const connectDB = require("./config/db");
// const { secret } = require("./config/secret");
// const PORT = secret.port;
// const morgan = require('morgan');

// // error handler
// const globalErrorHandler = require("./middleware/global-error-handler");

// // routes
// const userRoutes = require("./routes/user.routes");
// const categoryRoutes = require("./routes/category.routes");
// const brandRoutes = require("./routes/brand.routes");
// const userOrderRoutes = require("./routes/user.order.routes");
// const productRoutes = require("./routes/product.routes");
// const orderRoutes = require("./routes/order.routes");
// const couponRoutes = require("./routes/coupon.routes");
// const reviewRoutes = require("./routes/review.routes");
// const adminRoutes = require("./routes/admin.routes");
// // const uploadRouter = require('./routes/uploadFile.route');
// const cloudinaryRoutes = require("./routes/cloudinary.routes");

// const allowedOrigins = [
//   // "http://localhost:3002",
//   "http://localhost:3001",            
//   "http://localhost:3000",              
//   "https://look-fam.vercel.app/",
//   "https://lookfame.in"
// ];

// app.use(cors({
//   origin: allowedOrigins,
//   credentials: true
// }));

// app.use(express.json());
// app.use(morgan('dev'));
// app.use(express.static(path.join(__dirname, 'public')));

// connectDB();

// // ROUTES

// app.use("/api/user", userRoutes);
// app.use("/api/category", categoryRoutes);
// app.use("/api/brand", brandRoutes);
// app.use("/api/product", productRoutes);
// // app.use('/api/upload', uploadRouter);
// app.use("/api/order", orderRoutes);
// app.use("/api/coupon", couponRoutes);
// app.use("/api/user-order", userOrderRoutes);
// app.use("/api/review", reviewRoutes);
// app.use("/api/cloudinary", cloudinaryRoutes);
// app.use("/api/admin", adminRoutes);

// // root route
// app.get("/", (req, res) => res.send("Apps worked successfully"));


// app.use(globalErrorHandler);

// // 404 handler
// app.use((req, res, next) => {
//   res.status(404).json({
//     success: false,
//     message: 'Not Found',
//     errorMessages: [
//       {
//         path: req.originalUrl,
//         message: 'API Not Found',
//       },
//     ],
//   });
//   next();
// });


// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// module.exports = app;





require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");

const connectDB = require("./config/db");
const { secret } = require("./config/secret");

// routes
const userRoutes = require("./routes/user.routes");
const categoryRoutes = require("./routes/category.routes");
const brandRoutes = require("./routes/brand.routes");
const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");
const couponRoutes = require("./routes/coupon.routes");
const userOrderRoutes = require("./routes/user.order.routes");
const reviewRoutes = require("./routes/review.routes");
const adminRoutes = require("./routes/admin.routes");
const cloudinaryRoutes = require("./routes/cloudinary.routes");

// error handler
const globalErrorHandler = require("./middleware/global-error-handler");

const PORT = secret.port || 7000;

/* =========================
   CORS CONFIG (IMPORTANT)
========================= */

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://look-fam.vercel.app",   // ✅ Vercel frontend
  "https://lookfame.in"
];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);


// ✅ Preflight request allow
app.options("*", cors());

/* =========================
   MIDDLEWARES
========================= */

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));

/* =========================
   DATABASE
========================= */

connectDB();

/* =========================
   ROUTES
========================= */

app.get("/", (req, res) => {
  res.send("Apps worked successfully");
});

app.use("/api/user", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/brand", brandRoutes);
app.use("/api/product", productRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/coupon", couponRoutes);
app.use("/api/user-order", userOrderRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/cloudinary", cloudinaryRoutes);
app.use("/api/admin", adminRoutes);

/* =========================
   GLOBAL ERROR HANDLER
========================= */

app.use(globalErrorHandler);

/* =========================
   404 HANDLER
========================= */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
});

/* =========================
   SERVER START
========================= */

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;










