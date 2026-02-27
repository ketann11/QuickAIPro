// // backend/models/Creation.js
// const mongoose = require("mongoose");

// const CreationSchema = new mongoose.Schema(
//   {
//     userId: { type: String, index: true, required: true },
//     type: { type: String, index: true, required: true }, // article | image | resume | remove-bg | remove-object
//     prompt: { type: String, default: "" },
//     content: { type: String, default: "" }, // text or URL
//     publish: { type: Boolean, default: false, index: true },
//     likesCount: { type: Number, default: 0 },
//   },
//   { timestamps: true }
// );

// CreationSchema.index({ publish: 1, createdAt: -1 });
// CreationSchema.index({ userId: 1, createdAt: -1 });

// module.exports = mongoose.model("Creation", CreationSchema);
// ✅ MOST COMMON ACTUAL CAUSE: Creation model path/export wrong
// backend/models/Creation.js (must look like this)

const mongoose = require("mongoose");

const CreationSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    type: { type: String, required: true, index: true },
    prompt: { type: String, default: "" },
    content: { type: String, default: "" },
    publish: { type: Boolean, default: false, index: true },
    likesCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("creation", CreationSchema);
