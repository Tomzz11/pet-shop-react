import React from 'react'

export const AdminProducts = () => {
  return (
    <div>AdminProducts</div>
  )
}

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

  // ===== Edit =====
  const openEdit = (index) => {
    const item = data[index];
    setEditIndex(index);
    setEditForm({
      name: item.name,
      category: item.category,
      price: item.price,
      image: item.image,
    });
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

  // ===== Delete =====
  const deleteProduct = (index) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setData(data.filter((_, i) => i !== index));
    }
  };

  // ===== Image Upload =====
  const handleImage = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setEditForm({ ...editForm, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col md:flex-row p-4 md:p-6 gap-4">
      {/* Sidebar */}
      <aside className="w-full md:w-52 bg-gray-200 p-2 max-h-96 overflow-y-auto mt-16 mx-auto md:mx-0">
        <h2 className="text-3xl font-bold text-center px-4 py-3 mb-4">
          Products
        </h2>
        <ul className="space-y-2">
          {["Products List", "Add Products", "Edit Products"].map((item) => (
            <li key={item}>
              <a className="flex gap-3 items-center p-2 rounded hover:bg-gray-300">
                <div className="w-2 h-2 bg-black" />
                {item}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main */}
      <main className="flex-1 p-4 md:p-8">
        {/* Buttons */}
        <div className="flex justify-end gap-4 mb-6">
          <button className="bg-yellow-100 px-6 py-2 rounded-md font-semibold">
            🔔 Notification
          </button>
          <button className="bg-cyan-700 text-white px-6 py-2 rounded-md font-semibold">
            🔄 Refresh List
          </button>
        </div>

        {/* Panel */}
        <section className="bg-gray-200 p-4 md:p-8 rounded-md">
          <h3 className="text-lg font-semibold mb-3">
            Products Management
          </h3>

          <input
            type="text"
            placeholder="Search"
            className="w-full p-2 border rounded mb-4"
          />

          <div className="bg-white p-4 rounded-md border overflow-x-auto">
            <table className="w-full min-w-[600px] text-left">
              <thead className="border-b">
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(maxRows)].map((_, i) => (
                  <tr key={i} className="border-b">
                    <td className="py-2">
                      {data[i]?.image?.includes("data:image") ? (
                        <img
                          src={data[i].image}
                          className="w-12 h-12 object-cover rounded"
                        />
                      ) : (
                        data[i]?.image || "—"
                      )}
                    </td>
                    <td>{data[i]?.name || "—"}</td>
                    <td>{data[i]?.category || "—"}</td>
                    <td>{data[i]?.price || "—"}</td>
                    <td>
                      {data[i] && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEdit(i)}
                            className="bg-blue-500 text-white px-3 py-1 rounded"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => deleteProduct(i)}
                            className="bg-red-500 text-white px-3 py-1 rounded"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Modal */}
      {editIndex !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Product</h2>

            <input
              className="border p-2 w-full mb-2"
              value={editForm.name}
              onChange={(e) =>
                setEditForm({ ...editForm, name: e.target.value })
              }
              placeholder="Name"
            />

            <input
              className="border p-2 w-full mb-2"
              value={editForm.category}
              onChange={(e) =>
                setEditForm({ ...editForm, category: e.target.value })
              }
              placeholder="Category"
            />

            <input
              className="border p-2 w-full mb-2"
              value={editForm.price}
              onChange={(e) =>
                setEditForm({ ...editForm, price: e.target.value })
              }
              placeholder="Price"
            />

            <input
              type="file"
              onChange={(e) => handleImage(e.target.files[0])}
              className="mb-4"
            />

            <div className="flex justify-end gap-2">
              <button onClick={closeModal} className="border px-4 py-1 rounded">
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="bg-blue-600 text-white px-4 py-1 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
