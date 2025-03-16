// Cart Data
let cart = [];

// Function to add item to cart
function addToCart(product) {
  // Check if the product is already in the cart
  const existingItem = cart.find((item) => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += 1; // Increase quantity if already in cart
  } else {
    cart.push({ ...product, quantity: 1 }); // Add new item to cart
  }
  updateCart();

  // Show alert message
  alert(`${product.name} has been added to your cart!`);
}

// Function to remove item from cart
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId); // Remove item from cart
  updateCart();
}

// Function to update item quantity
function updateQuantity(productId, change) {
  const item = cart.find((item) => item.id === productId);
  if (item) {
    item.quantity += change;
    if (item.quantity < 1) {
      item.quantity = 1; // Ensure quantity doesn't go below 1
    }
    updateCart();
  }
}

// Function to update the cart UI
function updateCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");

  // Clear the cart items container
  cartItemsContainer.innerHTML = "";

  // Populate cart items
  cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("card", "mb-3");
    cartItem.innerHTML = `
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${item.image}" class="img-fluid" alt="${item.name}">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text"><strong>Price:</strong> $${item.price.toFixed(2)}</p>
            <p class="card-text"><strong>Size:</strong> ${item.size}</p>
            <p class="card-text"><strong>Color:</strong> ${item.color}</p>
            <p class="card-text"><strong>Description:</strong> ${item.description}</p>
            <div class="d-flex align-items-center">
              <button class="btn btn-outline-secondary btn-sm" onclick="updateQuantity(${item.id}, -1)">-</button>
              <span class="mx-2">${item.quantity}</span>
              <button class="btn btn-outline-secondary btn-sm" onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
            <button class="btn btn-outline-danger btn-sm mt-2" onclick="removeFromCart(${item.id})">Remove</button>
          </div>
        </div>
      </div>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  // Update cart count
  cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);

  // Update cart total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotal.textContent = total.toFixed(2);
}

// Sample Product Data
const products = [
  {
    id: 1,
    name: "Casual Shirt",
    price: 29.99,
    image: "/img/shop/shirt1.jpg",
    size: "M",
    color: "Blue",
    description: "A comfortable and stylish casual shirt for everyday wear.",
  },
  {
    id: 2,
    name: "Denim Jeans",
    price: 49.99,
    image: "/img/shop/denim1.jpg",
    size: "32",
    color: "Dark Blue",
    description: "Classic denim jeans with a modern fit.",
  },
  {
    id: 3,
    name: "T-Shirt",
    price: 39.99,
    image: "/img/shop/tshirt.jpg",
    size: "S",
    color: "Yellow",
    description: "A light and breezy summer dress perfect for sunny days.",
  },
  {
    id: 4,
    name: "Winter Jacket",
    price: 79.99,
    image: "/img/shop/jacket1.jpg",
    size: "L",
    color: "Black",
    description: "A warm and cozy winter jacket for cold weather.",
  },
  {
    id: 5,
    name: "Hoodie",
    price: 59.99,
    image: "/img/shop/hoodie.jpg",
    size: "10",
    color: "White",
    description: "Comfortable and stylish sneakers for everyday use.",
  },
  {
    id: 6,
    name: "Polo",
    price: 69.99,
    image: "/img/shop/polo.jpg",
    size: "One Size",
    color: "Brown",
    description: "A chic and practical handbag for any occasion.",
  },
];

// Add event listeners to "Add to Cart" buttons
document.addEventListener("DOMContentLoaded", () => {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      addToCart(products[index]);
    });
  });

  // Load cart from localStorage (if available)
  const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = savedCart;
  updateCart();
});

// Save cart to localStorage before page unload
window.addEventListener("beforeunload", () => {
  localStorage.setItem("cart", JSON.stringify(cart));
});