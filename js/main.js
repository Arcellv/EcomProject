document.addEventListener("DOMContentLoaded", () => {
  const searchIcon = document.getElementById("searchIcon");
  const searchInput = document.getElementById("searchInput");
  const filter = document.getElementById("categoryFilter");
  const products = document.querySelectorAll(".product-card");
  const cartTable = document.querySelector(".cart-table tbody");
  const subtotalElem = document.getElementById("subtotal-amount");
  const totalElem = document.getElementById("total-amount");
  const deliveryFee = 20;
  const menuToggle = document.getElementById("menuToggle");
  const navbar = document.querySelector(".navbar");

  menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("active");
  });

  let isSearchOpen = false;

  // Search Box
  searchIcon?.addEventListener("click", () => {
    if (!isSearchOpen) {
      searchInput.style.display = "inline-block";
      searchInput.focus();
      isSearchOpen = true;
    } else {
      const query = searchInput.value.trim();
      if (query) alert("Searching for: " + query);
      searchInput.style.display = "none";
      searchInput.value = "";
      isSearchOpen = false;
    }
  });

  // Filter Products
  filter?.addEventListener("change", function () {
    const category = this.value;
    products.forEach((product) => {
      const productCategory = product.getAttribute("data-category");
      product.style.display =
        category === "all" || productCategory === category ? "block" : "none";
    });
  });

  // ADD TO CART
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".product-card");
      const title = card.querySelector(".product-info h4").innerText;
      const price = card.querySelector(".price").innerText.replace("$", "");
      const quantity = parseInt(card.querySelector(".quantity").value);

      const existing = cart.find((item) => item.title === title);
      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.push({ title, price: parseFloat(price), quantity });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${quantity} x ${title} added to your cart!`);

      // Update cart icon count
      const cartCount = document.querySelector(".cart-count");
      if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? "inline-block" : "none";
      }

      // Optionally refresh cart if on cart page
      if (window.location.href.includes("cart.html")) {
        renderCart();
      }
    });
  });

  // Render CART TABLE if it exists
  function renderCart() {
    if (!cartTable) return;

    cartTable.innerHTML = "";
    let subtotal = 0;

    cart.forEach((item, index) => {
      const total = item.price * item.quantity;
      subtotal += total;

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.title}</td>
        <td>$${item.price}</td>
        <td><input type="number" min="1" value="${item.quantity}" data-index="${index}" class="qty-input" /></td>
        <td>$${total}</td>
        <td><button class="remove-btn" data-index="index">X</button></td>
      `;
      cartTable.appendChild(row);
    });

    if (subtotalElem && totalElem) {
      subtotalElem.textContent = `$${subtotal}`;
      totalElem.textContent = `$${subtotal + deliveryFee}`;
    }
  }

  // Event Delegation for Qty & Remove
  if (cartTable) {
    cartTable.addEventListener("input", (e) => {
      if (e.target.classList.contains("qty-input")) {
        const index = e.target.dataset.index;
        const newQty = parseInt(e.target.value);
        if (newQty > 0) {
          cart[index].quantity = newQty;
          localStorage.setItem("cart", JSON.stringify(cart));
          renderCart();
        }
      }
    });

    cartTable.addEventListener("click", (e) => {
      if (e.target.classList.contains("remove-btn")) {
        const index = e.target.dataset.index;
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      }
    });

    renderCart(); // Initial render
  }
});
