// backend/controllers/promptController.js
const mongoose = require("mongoose");
const PromptTemplate = require("../models/PromptTemplate");

exports.listMine = async (req, res) => {
  try {
    const userId = req.userId;
    const items = await PromptTemplate.find({ userId }).sort({ createdAt: -1 }).lean();
    res.json({ success: true, data: items });
  } catch {
    res.status(500).json({ success: false, message: "Failed to load templates" });
  }
};

exports.listPublic = async (req, res) => {
  try {
    const items = await PromptTemplate.find({ isPublic: true }).sort({ createdAt: -1 }).limit(200).lean();
    res.json({ success: true, data: items });
  } catch {
    res.status(500).json({ success: false, message: "Failed to load public templates" });
  }
};

exports.create = async (req, res) => {
  try {
    const userId = req.userId;
    const title = String(req.body.title || "").trim();
    const category = String(req.body.category || "general").trim();
    const content = String(req.body.content || "").trim();
    const isPublic = Boolean(req.body.isPublic);

    if (!title || !content) {
      return res.status(400).json({ success: false, message: "Title and content required" });
    }

    const doc = await PromptTemplate.create({ userId, title, category, content, isPublic });
    res.json({ success: true, data: doc });
  } catch {
    res.status(500).json({ success: false, message: "Failed to create template" });
  }
};

exports.update = async (req, res) => {
  try {
    const userId = req.userId;
    const id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: "Invalid id" });
    }

    const title = String(req.body.title || "").trim();
    const category = String(req.body.category || "general").trim();
    const content = String(req.body.content || "").trim();
    const isPublic = Boolean(req.body.isPublic);

    const doc = await PromptTemplate.findOneAndUpdate(
      { _id: id, userId },
      { $set: { title, category, content, isPublic } },
      { new: true }
    );

    if (!doc) return res.status(404).json({ success: false, message: "Not found" });

    res.json({ success: true, data: doc });
  } catch {
    res.status(500).json({ success: false, message: "Failed to update template" });
  }
};

exports.remove = async (req, res) => {
  try {
    const userId = req.userId;
    const id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: "Invalid id" });
    }

    const out = await PromptTemplate.deleteOne({ _id: id, userId });
    if (!out.deletedCount) return res.status(404).json({ success: false, message: "Not found" });

    res.json({ success: true, data: { ok: true } });
  } catch {
    res.status(500).json({ success: false, message: "Failed to delete template" });
  }
};
