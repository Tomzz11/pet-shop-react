import React from 'react'

export const AdminProducts = () => {
  return (
    <div>AdminProducts</div>
  )
}

<html> <body>
 <div class="flex flex-col md:flex-row p-4 md:p-6 gap-4">

    <!-- Sidebar -->
    <aside class="w-full md:w-52 bg-gray-200 p-2 max-h-96 overflow-y-auto mt-16 md:mt-15 mx-auto md:mx-0 ">
  <h2 class="text-3xl font-bold text-center px-4 py-3 mb-4">Products</h2>

  <ul class="space-y-2">
    <li>
      <a href="#" class="flex gap-3 items-center p-2 rounded hover:bg-gray-300">
        <div class="w-2 h-2 bg-black"></div>
        Products List
      </a>
    </li>
    <li>
      <a href="#" class="flex gap-3 items-center p-2 rounded hover:bg-gray-300">
        <div class="w-2 h-2 bg-black"></div>
        Add Products
      </a>
    </li>
    <li>
      <a href="#" class="flex gap-3 items-center p-2 rounded hover:bg-gray-300">
        <div class="w-2 h-2 bg-black"></div>
        Edit Products
      </a>
    </li>
  </ul>
</aside>

    <!-- Main Content -->
    <main class="flex-1 p-4 md:p-8">

      <!-- Buttons Row -->
<div class="flex flex-wrap justify-end gap-2 md:gap-4 mb-6">
  <button class="bg-yellow-100 px-4 md:px-6 py-2 rounded-md font-semibold md:-mt-8">
    🔔 Notification
  </button>
  <button class="bg-cyan-700 text-white px-4 md:px-6 py-2 rounded-md font-semibold md:-mt-8">
    🔄 Refresh List
  </button>
</div>


      <!-- Panel -->
      <section class="bg-gray-200 p-4 md:p-8 rounded-md">

        <h3 class="text-lg font-semibold mb-3">Products Management</h3>

        <input type="text" placeholder="Search" class="w-full p-2 border rounded mb-4" />

        <!-- Table -->
        <div class="bg-white p-4 rounded-md border overflow-x-auto">
          <table class="w-full min-w-[600px] text-left">
            <thead class="border-b">
              <tr class="text-gray-700">
                <th class="py-2">Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="product-body"></tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div id="pagination" class="flex justify-center gap-2 pt-4 text-white font-semibold flex-wrap"></div>

      </section>
    </main>
  </div>

  <!-- Edit Modal -->
  <div id="editModal" class="hidden fixed inset-0 bg-black/50 flex items-center justify-center p-2">
    <div class="bg-white p-6 rounded shadow-lg w-11/12 max-w-md">
      <h2 class="text-xl font-semibold mb-4">Edit Product</h2>

      <input id="editName" class="border p-2 w-full mb-2" placeholder="Name" />
      <input id="editCategory" class="border p-2 w-full mb-2" placeholder="Category" />
      <input id="editPrice" class="border p-2 w-full mb-2" placeholder="Price" />

      <label class="block mb-2">Image</label>
      <input type="file" id="editImage" class="mb-4" />

      <div class="flex justify-end gap-2">
        <button onclick="closeModal()" class="px-4 py-1 border rounded">Cancel</button>
        <button onclick="saveEdit()" class="px-4 py-1 bg-blue-600 text-white rounded">Save</button>
      </div>
    </div>
  </div>

  <!-- Scripts -->
  <script>
    // Data
    let data = [
      { image: "—", name: "Product 1", category: "Cat A", price: "$10" },
      { image: "—", name: "Product 2", category: "Cat B", price: "$20" },
      { image: "—", name: "Product 3", category: "Cat C", price: "$30" },
    ];

    const maxRows = 5;
    let editIndex = null;

    // Render Table
    function renderTable() {
      const body = document.getElementById("product-body");
      body.innerHTML = "";

      for (let i = 0; i < maxRows; i++) {
        const item = data[i];
        body.innerHTML += `
          <tr class="border-b text-gray-600">
            <td class="py-2">
              ${item ? (item.image.includes("data:image")
                ? `<img src="${item.image}" class="w-12 h-12 object-cover rounded" />`
                : item.image) : "—"}
            </td>
            <td>${item ? item.name : "—"}</td>
            <td>${item ? item.category : "—"}</td>
            <td>${item ? item.price : "—"}</td>
            <td class="py-2">
              <div class="flex gap-2 flex-wrap">
                ${item ? `<button onclick="openEdit(${i})" class="px-3 py-1 bg-blue-500 text-white rounded-md text-sm">✏️ Edit</button>
                          <button onclick="deleteProduct(${i})" class="px-3 py-1 bg-red-500 text-white rounded-md text-sm">🗑️ Delete</button>` : ""}
              </div>
            </td>
          </tr>
        `;
      }
    }

    renderTable();

    // Edit Modal Functions
    function openEdit(index) {
      if (!data[index]) return;
      editIndex = index;
      const item = data[index];
      document.getElementById("editName").value = item.name;
      document.getElementById("editCategory").value = item.category;
      document.getElementById("editPrice").value = item.price;
      document.getElementById("editModal").classList.remove("hidden");
    }

    function closeModal() {
      document.getElementById("editModal").classList.add("hidden");
    }

    function saveEdit() {
      if (editIndex === null) return;

      const name = document.getElementById("editName").value;
      const category = document.getElementById("editCategory").value;
      const price = document.getElementById("editPrice").value;
      const imageInput = document.getElementById("editImage");

      data[editIndex].name = name;
      data[editIndex].category = category;
      data[editIndex].price = price;

      if (imageInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = () => {
          data[editIndex].image = reader.result;
          renderTable();
        };
        reader.readAsDataURL(imageInput.files[0]);
      } else {
        renderTable();
      }

      closeModal();
    }

    // Delete Product
    function deleteProduct(index) {
      if (!data[index]) return;
      if (confirm("Are you sure you want to delete this product?")) {
        data.splice(index, 1); // ลบสินค้าออกจากระบบ
        renderTable();          // แสดงสินค้าที่เหลือแทน
      }
    }

    // Pagination Example
    const totalItems = 45;
    const itemsPerPage = 5;
    const maxPageButtons = 3;
    let currentPage = 1;
    const pagination = document.getElementById("pagination");
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    function renderPagination() {
      pagination.innerHTML = "";

      const prevBtn = document.createElement("button");
      prevBtn.textContent = "Previous";
      prevBtn.className = "px-3 py-1 bg-gray-600 rounded";
      prevBtn.disabled = currentPage === 1;
      prevBtn.onclick = () => { currentPage--; renderPagination(); };
      pagination.appendChild(prevBtn);

      let startPage = Math.max(1, currentPage - 1);
      let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

      if (endPage - startPage + 1 < maxPageButtons) {
        startPage = Math.max(1, endPage - maxPageButtons + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        const pageBtn = document.createElement("button");
        pageBtn.textContent = i;
        pageBtn.className = `px-3 py-1 rounded ${i === currentPage ? "bg-blue-500 font-bold" : "bg-gray-600"}`;
        pageBtn.onclick = () => { currentPage = i; renderPagination(); };
        pagination.appendChild(pageBtn);
      }

      const nextBtn = document.createElement("button");
      nextBtn.textContent = "Next";
      nextBtn.className = "px-3 py-1 bg-gray-600 rounded";
      nextBtn.disabled = currentPage === totalPages;
      nextBtn.onclick = () => { currentPage++; renderPagination(); };
      pagination.appendChild(nextBtn);
    }

    renderPagination();
  </script>