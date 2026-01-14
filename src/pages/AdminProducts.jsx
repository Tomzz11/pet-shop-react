import React, { useState } from "react";

export const AdminProducts = () => {
  // ===== State =====
  const [data, setData] = useState([
    { image: "—", name: "Product 1", category: "Cat A", price: "$10" },
    { image: "—", name: "Product 2", category: "Cat B", price: "$20" },
    { image: "—", name: "Product 3", category: "Cat C", price: "$30" },
  ]);

  const [editIndex, setEditIndex] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    category: "",
    price: "",
    image: null,
  });

  const maxRows = 5;

  // ===== Functions =====
  const openEdit = (index) => {
    const item = data[index];
    setEditIndex(index);
    setEditForm(item);
  };

  const closeModal = () => {
    setEditIndex(null);
  };

  const saveEdit = () => {
    const newData = [...data];
    newData[editIndex] = editForm;
    setData(newData);
    closeModal();
  };

  const deleteProduct = (index) => {
    if (window.confirm("Are you sure?")) {
      setData(data.filter((_, i) => i !== index));
    }
  };

  const handleImage = (file) => {
    const reader = new FileReader();
    reader.onload = () =>
      setEditForm({ ...editForm, image: reader.result });
    reader.readAsDataURL(file);
  };

  // ✅ return อยู่ใน component
  return (
    <div className="flex flex-col md:flex-row p-4 md:p-6 gap-4">
      {/* Sidebar */}
      <aside className="w-full md:w-52 bg-gray-200 p-2 mt-16">
        <h2 className="text-3xl font-bold text-center mb-4">
          Products
        </h2>
        <ul className="space-y-2">
          {["Products List", "Add Products", "Edit Products"].map(
            (item) => (
              <li key={item}>
                <a className="flex gap-3 items-center p-2 hover:bg-gray-300 rounded">
                  <div className="w-2 h-2 bg-black" />
                  {item}
                </a>
              </li>
            )
          )}
        </ul>
      </aside>

      {/* Main */}
      <main className="flex-1 p-4 md:p-8">
        <section className="bg-gray-200 p-6 rounded">
          <table className="w-full">
            <tbody>
              {[...Array(maxRows)].map((_, i) => (
                <tr key={i}>
                  <td>{data[i]?.name || "—"}</td>
                  <td>
                    {data[i] && (
                      <>
                        <button onClick={() => openEdit(i)}>
                          ✏️
                        </button>
                        <button onClick={() => deleteProduct(i)}>
                          🗑️
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>

      {/* Modal */}
      {editIndex !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-96">
            <input
              value={editForm.name}
              onChange={(e) =>
                setEditForm({ ...editForm, name: e.target.value })
              }
            />
            <input
              type="file"
              onChange={(e) => handleImage(e.target.files[0])}
            />
            <button onClick={saveEdit}>Save</button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};
