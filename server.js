// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import users from "./routes/users.js";
// import multer from "multer";
// import multer from "multer";

// const multer =require('multer')

// const upload = multer({ dest: 'uploads/' })

// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(cors());

// app.use(express.urlencoded({ extended: true }));
// app.use(users);

// const uri = process.env.MONGODB_URI;

// mongoose
//   .connect(uri)
//   .then(() => {
//     console.log("MongoDB connected");
//   })
//   .catch((err) => {
//     console.log("MongoDB connection error", err);
//   });

// const PORT = process.env.PORT || 3001;

// app.listen(PORT, () => {
//   console.log(`server running on http://localhost:${PORT}`);
// });



import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import users from "./routes/users.js";
import multer from "multer";
import path from "path";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Multer image upload route (you can change the path as needed)
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.status(200).json({ imageUrl: `/uploads/${req.file.filename}` });
});

// Existing routes
app.use(users);

// MongoDB connection
const uri = process.env.MONGODB_URI;
mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error", err));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
