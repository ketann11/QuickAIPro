// frontend/src/components/PromptModal.jsx
import React, { useEffect, useState } from "react";

export default function PromptModal({ open, onClose, onSave, initial }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("general");
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  useEffect(() => {
    if (!open) return;
    setTitle(initial?.title || "");
    setCategory(initial?.category || "general");
    setContent(initial?.content || "");
    setIsPublic(Boolean(initial?.is_public));
  }, [open, initial]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-xl p-5">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-lg">{initial ? "Edit Template" : "New Template"}</h2>
          <button className="text-sm border rounded px-3 py-1" onClick={onClose}>Close</button>
        </div>

        <div className="mt-4 grid gap-3">
          <input
            className="border rounded px-3 py-2"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="border rounded px-3 py-2"
            placeholder="Category (e.g. hiring, blog, image)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <textarea
            className="border rounded px-3 py-2 min-h-[140px]"
            placeholder="Prompt template..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} />
            Make Public (shows in community templates)
          </label>

          <button
            className="border rounded px-4 py-2"
            onClick={() => onSave({ title, category, content, is_public: isPublic })}
            disabled={!title.trim() || !content.trim()}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
