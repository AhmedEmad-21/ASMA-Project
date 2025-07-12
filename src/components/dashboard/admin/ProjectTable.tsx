import React, { useState, useCallback } from "react";
import Image from "next/image";

interface Project {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}

const initialProjects: Project[] = [
  { id: "1", title: "Modern Kitchen", category: "Kitchen", imageUrl: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg" },
  { id: "2", title: "Classic Bathroom", category: "Bathroom", imageUrl: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" },
];

export default function ProjectTable() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Project>>({});

  const handleEdit = useCallback((project: Project) => {
    setEditingId(project.id);
    setForm(project);
  }, []);

  const handleDelete = useCallback((id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    if (!form.title || !form.category || !form.imageUrl) return;
    setProjects((prev) =>
      prev.map((p) => (p.id === editingId ? { ...p, ...form } as Project : p))
    );
    setEditingId(null);
    setForm({});
  };

  const handleAdd = () => {
    if (!form.title || !form.category || !form.imageUrl) return;
    setProjects((prev) => [
      ...prev,
      { ...form, id: Date.now().toString() } as Project,
    ]);
    setForm({});
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Projects</h2>
      <table className="w-full mb-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Title</th>
            <th className="p-2">Category</th>
            <th className="p-2">Image</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id} className="border-b">
              <td className="p-2">
                {editingId === project.id ? (
                  <input
                    name="title"
                    value={form.title || ""}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                  />
                ) : (
                  project.title
                )}
              </td>
              <td className="p-2">
                {editingId === project.id ? (
                  <input
                    name="category"
                    value={form.category || ""}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                  />
                ) : (
                  project.category
                )}
              </td>
              <td className="p-2">
                {editingId === project.id ? (
                  <>
                    <input
                      name="imageUrl"
                      value={form.imageUrl || ""}
                      onChange={handleChange}
                      className="border rounded px-2 py-1 w-full"
                    />
                    <Image
                      src={form.imageUrl || project.imageUrl}
                      alt={form.title || project.title}
                      width={64}
                      height={64}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </>
                ) : (
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    width={64}
                    height={64}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
              </td>
              <td className="p-2 flex gap-2">
                {editingId === project.id ? (
                  <>
                    <button onClick={handleSave} className="px-2 py-1 bg-green-500 text-white rounded">Save</button>
                    <button onClick={() => setEditingId(null)} className="px-2 py-1 bg-gray-400 text-white rounded">Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(project)} className="px-2 py-1 bg-blue-500 text-white rounded">Edit</button>
                    <button onClick={() => handleDelete(project.id)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex gap-2 mb-2">
        <input
          name="title"
          placeholder="Title"
          value={form.title || ""}
          onChange={handleChange}
          className="border rounded px-2 py-1"
        />
        <input
          name="category"
          placeholder="Category"
          value={form.category || ""}
          onChange={handleChange}
          className="border rounded px-2 py-1"
        />
        <input
          name="imageUrl"
          placeholder="Image URL"
          value={form.imageUrl || ""}
          onChange={handleChange}
          className="border rounded px-2 py-1"
        />
        <button onClick={handleAdd} className="px-4 py-1 bg-[#0C1C2D] text-white rounded">Add</button>
      </div>
    </div>
  );
}
