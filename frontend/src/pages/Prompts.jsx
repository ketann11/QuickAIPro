// frontend/src/pages/Prompts.jsx
import React, { useEffect, useMemo, useState } from "react";
import { promptsApi } from "../api/prompts.api";
import PromptCard from "../components/PromptCard";
import PromptModal from "../components/PromptModal";

export default function Prompts() {
  const [tab, setTab] = useState("mine");
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const load = async () => {
    const res = tab === "mine" ? await promptsApi.listMine() : await promptsApi.listPublic();
    setItems(res.data.data || []);
  };

  useEffect(() => { load(); }, [tab]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter(
      (x) =>
        String(x.title).toLowerCase().includes(s) ||
        String(x.category).toLowerCase().includes(s) ||
        String(x.content).toLowerCase().includes(s)
    );
  }, [items, q]);

  const onCopy = async (text) => {
    await navigator.clipboard.writeText(text);
    alert("Copied!");
  };

  const onSave = async (payload) => {
    if (editItem) await promptsApi.update(editItem.id, payload);
    else await promptsApi.create(payload);

    setOpen(false);
    setEditItem(null);
    load();
  };

  const onEdit = (item) => {
    setEditItem(item);
    setOpen(true);
  };

  const onDelete = async (id) => {
    if (!confirm("Delete this template?")) return;
    await promptsApi.remove(id);
    load();
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-xl font-semibold">Prompt Library</h1>
        <button className="border rounded px-4 py-2" onClick={() => { setEditItem(null); setOpen(true); }}>
          + New Template
        </button>
      </div>

      <div className="mt-4 flex gap-2">
        <button className="border rounded px-3 py-1" onClick={() => setTab("mine")} disabled={tab==="mine"}>
          My Templates
        </button>
        <button className="border rounded px-3 py-1" onClick={() => setTab("public")} disabled={tab==="public"}>
          Public Templates
        </button>

        <input
          className="border rounded px-3 py-1 flex-1"
          placeholder="Search templates..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      <div className="mt-5 grid gap-3">
        {filtered.map((item) => (
          <PromptCard
            key={item.id}
            item={item}
            onCopy={onCopy}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      <PromptModal
        open={open}
        onClose={() => { setOpen(false); setEditItem(null); }}
        onSave={onSave}
        initial={editItem}
      />
    </div>
  );
}
