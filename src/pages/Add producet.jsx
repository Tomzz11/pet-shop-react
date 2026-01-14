import { useState } from "react";

export default function ProductsPage() {
  // ===== Data =====
  const [data, setData] = useState([
    { image: "—", name: "Product 1", category: "Cat A", price: "$10" },
    { image: "—", name: "Product 2", category: "Cat B", price: "$20" },
    { image: "—", name: "Product 3", category: "Cat C", price: "$30" },
  ]);

  const maxRows = 5;
  const [editIndex, setEditIndex] = useState(null);

  // ===== Pagination (ตัวแปรเดิม) =====
  const totalItems = 45;
  const itemsPerPage = 5;
  const maxPageButtons = 3;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  // ===== Functions เดิม =====
  function openEdit(index) {
    if (!data[index]) return;
    setEditIndex(index);

    document.getElementById("editName").value = data[index].name;
    document.getElementById("editCategory").value = data[index].category;
    document.getElementById("editPrice").value = data[index].price;
  }

  function closeModal() {
    setEditIndex(null);
  }

  function saveEdit() {
    if (editIndex === null) return;

    const name = document.getElementById("editName").value;
    const category = document.getElementById("editCategory").value;
    const price = document.getElementById("editPrice").value;
    const imageInput = document.getElementById("editImage");

    const newData = [...data];
    newData[editIndex].name = name;
    newData[editIndex].category = category;
    newData[editIndex].price = price;

    if (imageInput.files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        newData[editIndex].image = reader.result;
        setData(newData);
      };
      reader.readAsDataURL(imageInput.files[0]);
    } else {
      setData(newData);
    }

    closeModal();
  }

  function deleteProduct(index) {
    if (!data[index]) return;
    if (window.confirm("Are you sure you want to delete this product?")) {
      const newData = [...data];
      newData.splice(index, 1);
      setData(newData);
    }
  }

  // ===== Pagination Render =====
  function renderPagination() {
    let pages = [];

    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

    if (endPage - startPage + 1 < maxPageButtons) {
      startPage = Math.max(1, endPage - maxPageButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  return (
    <>
      {/* Header */}
      <header className="bg-gray-200 flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-3 gap-2">
        <div className="bg-yellow-200 px-6 py-2 rounded-md font-semibold">
          Logo
        </div>
        <nav className="flex gap-6 text-lg font-medium">
          <a>🧴 Products</a>
          <a>👤 Profile Account</a>
          <a>🗝️ Logout</a>
        </nav>
      </header>

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
          <div className="flex justify-end gap-4 mb-6">
            <button className="bg-yellow-100 px-6 py-2 rounded">
              🔔 Notification
            </button>
            <button className="bg-cyan-700 text-white px-6 py-2 rounded">
              🔄 Refresh List
            </button>
          </div>

          <section className="bg-gray-200 p-6 rounded">
            <h3 className="font-semibold mb-3">
              Products Management
            </h3>

            <input
              placeholder="Search"
              className="w-full p-2 border rounded mb-4"
            />

            <div className="bg-white p-4 rounded border overflow-x-auto">
              <table className="w-full min-w-[600px]">
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
                      <td>
                        {data[i]?.image?.includes("data:image") ? (
                          <img
                            src={data[i].image}
                            className="w-12 h-12 rounded"
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

            {/* Pagination */}
            <div className="flex justify-center gap-2 pt-4 text-white">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="bg-gray-600 px-3 py-1 rounded"
              >
                Previous
              </button>

              {renderPagination().map((p) => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`px-3 py-1 rounded ${
                    p === currentPage
                      ? "bg-blue-500 font-bold"
                      : "bg-gray-600"
                  }`}
                >
                  {p}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="bg-gray-600 px-3 py-1 rounded"
              >
                Next
              </button>
            </div>
          </section>
        </main>
      </div>

      {/* Edit Modal */}
      {editIndex !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="text-xl font-semibold mb-4">
              Edit Product
            </h2>

            <input id="editName" className="border p-2 w-full mb-2" />
            <input
              id="editCategory"
              className="border p-2 w-full mb-2"
            />
            <input
              id="editPrice"
              className="border p-2 w-full mb-2"
            />

            <input type="file" id="editImage" />

            <div className="flex justify-end gap-2 mt-4">
              <button onClick={closeModal} className="border px-4 py-1">
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="bg-blue-600 text-white px-4 py-1"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
