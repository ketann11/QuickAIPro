// backend/models/CreationLike.js
const mongoose = require("mongoose");

const CreationLikeSchema = new mongoose.Schema(
  {
    creationId: { type: mongoose.Schema.Types.ObjectId, ref: "Creation", required: true, index: true },
    userId: { type: String, required: true, index: true },
  },
  { timestamps: true }
);

CreationLikeSchema.index({ creationId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model("CreationLike", CreationLikeSchema);
