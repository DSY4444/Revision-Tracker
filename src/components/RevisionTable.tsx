import { Revision } from "@prisma/client";

interface RevisionTableProps {
  revisions: Revision[];
  onAddClick: () => void;
  onEditClick: (id: string) => void;
  onDeleteClick: (id: string) => void;
}


export default function RevisionTable({ revisions, onAddClick, onEditClick, onDeleteClick }: RevisionTableProps) {
  return (
    <div className="p-4">
      <button onClick={onAddClick} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">
        + Add Revision
      </button>
      <input
        type="text"
        placeholder="Search..."
        className="mb-4 p-2 border rounded w-full"
      />
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2 text-black">Title</th>
            <th className="border p-2 text-black">Description</th>
            <th className="border p-2 text-black">Date</th>
            <th className="border p-2 text-black">Actions</th>
          </tr>
        </thead>
        <tbody>
          {revisions.map((rev) => (
            <tr key={rev.id} className="border">
              <td className="p-2 text-center">{rev.title}</td>
              <td className="p-2 text-center">{rev.description}</td>
              <td className="p-2 text-center">{new Date(rev.createdAt).toLocaleDateString()}</td>
              <td className="p-2 text-center">
                <button onClick={() => onEditClick(rev.id)} className="px-2 py-1 bg-yellow-500 text-white rounded mr-2">Edit</button>
                <button onClick={() => onDeleteClick(rev.id)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}