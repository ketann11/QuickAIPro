// backend/models/PromptTemplate.js
const mongoose = require("mongoose");

const PromptTemplateSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    category: { type: String, default: "general", index: true },
    content: { type: String, required: true },
    isPublic: { type: Boolean, default: false, index: true },
  },
  { timestamps: true }
);

PromptTemplateSchema.index({ isPublic: 1, createdAt: -1 });

module.exports = mongoose.model("PromptTemplate", PromptTemplateSchema);
