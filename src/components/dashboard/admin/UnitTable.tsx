import React, { useState, useCallback } from "react";

interface Unit {
  id: string;
  name: string;
  price: string;
  available: boolean;
}

const initialUnits: Unit[] = [
  { id: "1", name: "Unit 1", price: "1000", available: true },
  { id: "2", name: "Unit 2", price: "1200", available: false },
];

export default function UnitTable() {
  const [units, setUnits] = useState<Unit[]>(initialUnits);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Unit>>({});

  const handleEdit = useCallback((unit: Unit) => {
    setEditingId(unit.id);
    setForm(unit);
  }, []);

  const handleDelete = useCallback((id: string) => {
    setUnits((prev) => prev.filter((u) => u.id !== id));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSave = () => {
    if (!form.name || !form.price) return;
    setUnits((prev) =>
      prev.map((u) => (u.id === editingId ? { ...u, ...form } as Unit : u))
    );
    setEditingId(null);
    setForm({});
  };

  const handleAdd = () => {
    if (!form.name || !form.price) return;
    setUnits((prev) => [
      ...prev,
      { ...form, id: Date.now().toString(), available: !!form.available } as Unit,
    ]);
    setForm({});
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-8">
      <h2 className="text-xl font-semibold mb-4">Units (Book Now)</h2>
      <table className="w-full mb-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Name</th>
            <th className="p-2">Price</th>
            <th className="p-2">Available</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {units.map((unit) => (
            <tr key={unit.id} className="border-b">
              <td className="p-2">
                {editingId === unit.id ? (
                  <input
                    name="name"
                    value={form.name || ""}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                  />
                ) : (
                  unit.name
                )}
              </td>
              <td className="p-2">
                {editingId === unit.id ? (
                  <input
                    name="price"
                    value={form.price || ""}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                  />
                ) : (
                  unit.price
                )}
              </td>
              <td className="p-2 text-center">
                {editingId === unit.id ? (
                  <input
                    type="checkbox"
                    name="available"
                    checked={!!form.available}
                    onChange={handleChange}
                  />
                ) : (
                  unit.available ? "Yes" : "No"
                )}
              </td>
              <td className="p-2 flex gap-2">
                {editingId === unit.id ? (
                  <>
                    <button onClick={handleSave} className="px-2 py-1 bg-green-500 text-white rounded">Save</button>
                    <button onClick={() => setEditingId(null)} className="px-2 py-1 bg-gray-400 text-white rounded">Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(unit)} className="px-2 py-1 bg-blue-500 text-white rounded">Edit</button>
                    <button onClick={() => handleDelete(unit.id)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex gap-2 mb-2">
        <input
          name="name"
          placeholder="Name"
          value={form.name || ""}
          onChange={handleChange}
          className="border rounded px-2 py-1"
        />
        <input
          name="price"
          placeholder="Price"
          value={form.price || ""}
          onChange={handleChange}
          className="border rounded px-2 py-1"
        />
        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            name="available"
            checked={!!form.available}
            onChange={handleChange}
          />
          Available
        </label>
        <button onClick={handleAdd} className="px-4 py-1 bg-[#0C1C2D] text-white rounded">Add</button>
      </div>
    </div>
  );
}
