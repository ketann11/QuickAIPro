// backend/controllers/userController.js
const mongoose = require("mongoose");
const Creation = require("../models/Creation");
const CreationLike = require("../models/CreationLike");

exports.getMyCreations = async (req, res) => {
  try {
    const userId = req.userId;
    const items = await Creation.find({ userId }).sort({ createdAt: -1 }).lean();

    const ids = items.map((x) => x._id);
    const myLikes = await CreationLike.find({ userId, creationId: { $in: ids } })
      .select("creationId")
      .lean();

    const likedSet = new Set(myLikes.map((x) => String(x.creationId)));

    const out = items.map((x) => ({
      ...x,
      likedByMe: likedSet.has(String(x._id)),
    }));

    res.json({ success: true, data: out });
  } catch (e) {
    res.status(500).json({ success: false, message: "Failed to load creations" });
  }
};

exports.getPublicCreations = async (req, res) => {
  try {
    const items = await Creation.find({ publish: true }).sort({ createdAt: -1 }).limit(200).lean();
    res.json({ success: true, data: items });
  } catch (e) {
    res.status(500).json({ success: false, message: "Failed to load public creations" });
  }
};

exports.setPublishStatus = async (req, res) => {
  try {
    const userId = req.userId;
    const id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: "Invalid id" });
    }

    const publish = Boolean(req.body.publish);

    const doc = await Creation.findOneAndUpdate(
      { _id: id, userId },
      { $set: { publish } },
      { new: true }
    );

    if (!doc) return res.status(404).json({ success: false, message: "Not found" });

    res.json({ success: true, data: { id: doc._id, publish: doc.publish } });
  } catch (e) {
    res.status(500).json({ success: false, message: "Failed to update publish" });
  }
};

exports.toggleLike = async (req, res) => {
  try {
    const userId = req.userId;
    const id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: "Invalid id" });
    }

    const creation = await Creation.findById(id);
    if (!creation) return res.status(404).json({ success: false, message: "Not found" });

    let liked = false;

    const exists = await CreationLike.findOne({ creationId: id, userId }).lean();
    if (exists) {
      await CreationLike.deleteOne({ _id: exists._id });
      await Creation.updateOne({ _id: id, likesCount: { $gt: 0 } }, { $inc: { likesCount: -1 } });
      liked = false;
    } else {
      try {
        await CreationLike.create({ creationId: id, userId });
        await Creation.updateOne({ _id: id }, { $inc: { likesCount: 1 } });
        liked = true;
      } catch (e) {
        // ignore duplicate unique errors
      }
    }

    const updated = await Creation.findById(id).select("likesCount").lean();
    res.json({ success: true, data: { liked, likesCount: updated?.likesCount || 0 } });
  } catch (e) {
    res.status(500).json({ success: false, message: "Failed to toggle like" });
  }
};
