// // backend/db/connect.js
// const mongoose = require("mongoose");

// async function connectDB() {
//   const uri = process.env.MONGODB_URI;
//   if (!uri) throw new Error("MONGODB_URI missing in .env");

//   mongoose.set("strictQuery", true);

//   await mongoose.connect(uri, {
//     autoIndex: true,
//   });

//   console.log("✅ MongoDB connected");
// }

// module.exports = connectDB;
const mongoose = require("mongoose");

async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI missing in backend/.env");

  // ✅ stop immediately if wrong URL is used
  if (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://")) {
    throw new Error(
      `Invalid MONGODB_URI. Must start with mongodb:// or mongodb+srv:// (got: ${uri.slice(0, 20)}...)`
    );
  }

  mongoose.set("strictQuery", true);

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 15000,
  });

  console.log(" MongoDB connected");
}

module.exports = connectDB;