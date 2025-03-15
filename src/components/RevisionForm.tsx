import { useState, useEffect } from "react";
import { Revision } from "@/app/revisions/page";

interface RevisionFormProps {
  onSave: (data: { title: string; description: string }) => void;
  onClose: () => void;
  initialData?: Revision | null;
}

export default function RevisionForm({ onSave, onClose, initialData }: RevisionFormProps) {  
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
    }
  }, [initialData]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-lg font-semibold text-black">{initialData ? "Edit Revision" : "Add Revision"}</h2>
        <input 
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border mt-2 text-black"
        />
        <textarea 
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border mt-2 text-black"
        />
        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="mr-2 px-4 py-2 border bg-red-500 text-white rounded">Cancel</button>
          <button 
            onClick={() => { onSave({ title, description }); onClose(); }} 
            className="px-4 py-2 bg-blue-500 text-white rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}