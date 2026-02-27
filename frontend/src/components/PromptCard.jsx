// frontend/src/components/PromptCard.jsx
import React from "react";

export default function PromptCard({ item, onCopy, onEdit, onDelete }) {
  return (
    <div className="border rounded-lg p-4 bg-white/60">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold">{item.title}</h3>
          <p className="text-xs opacity-70">{item.category} • {item.is_public ? "Public" : "Private"}</p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 text-sm border rounded" onClick={() => onCopy(item.content)}>
            Copy
          </button>
          <button className="px-3 py-1 text-sm border rounded" onClick={() => onEdit(item)}>
            Edit
          </button>
          <button className="px-3 py-1 text-sm border rounded" onClick={() => onDelete(item.id)}>
            Delete
          </button>
        </div>
      </div>

      <p className="mt-3 text-sm whitespace-pre-wrap line-clamp-4">{item.content}</p>
    </div>
  );
}
