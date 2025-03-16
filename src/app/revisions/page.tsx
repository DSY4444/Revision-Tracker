"use client";

import { useState, useEffect } from "react";
import RevisionTable from "@/components/RevisionTable";
import RevisionForm from "@/components/RevisionForm";
import { UUID } from "crypto";

export interface Revision {
  id: UUID;
  title: string;
  description: string;
  createdAt: Date;
}

export default function RevisionsPage() {
  const [revisions, setRevisions] = useState([] as Revision[]);
  const [showForm, setShowForm] = useState(false);
  const [currentRevision, setCurrentRevision] = useState<Revision | null>(null);

  useEffect(() => {
    fetch("/api/revisions")
      .then((res) => res.json())
      .then((data) => setRevisions(data));
  }, []);

  const addRevision = async (data: { title: string; description: string }) => {
    const response = await fetch("/api/revisions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const newRevision = await response.json();
    setRevisions((prev) => [...prev, newRevision]);
  };

  const editRevision = async (data: { id: UUID; title: string; description: string }) => {
    const response = await fetch(`/api/revisions`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const updatedRevision = await response.json();
    setRevisions((prev) =>
      prev.map((rev) => (rev.id === updatedRevision.id ? updatedRevision : rev))
    );
  };

  const deleteRevision = async (id: string) => {
    await fetch(`/api/revisions`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setRevisions((prev) => prev.filter((rev) => rev.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Revisions</h1>
      <RevisionTable
        revisions={revisions}
        onAddClick={() => setShowForm(true)}
        onEditClick={(id) => {
          const revision = revisions.find((rev) => rev.id === id);
          if (revision) {
            setCurrentRevision(revision);
            setShowForm(true);
          }
        }}
        onDeleteClick={deleteRevision}
      />
      {showForm && (
        <RevisionForm
          onSave={(data) => {
            if (currentRevision) {
              editRevision({ ...data, id: currentRevision.id });
            } else {
              addRevision(data);
            }
            setShowForm(false);
            setCurrentRevision(null);
          }}
          onClose={() => {
            setShowForm(false);
            setCurrentRevision(null);
          }}
          initialData={currentRevision}
        />
      )}
    </div>
  );
}