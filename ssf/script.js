// Toggle Navigation Menu
document.querySelector('.hamburger').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('active');
});

// Dark Mode Toggle
const toggleMode = document.querySelector('.toggle-mode');
const modeIcon = document.querySelector('.mode-icon');
const body = document.body;

if (localStorage.getItem("dark-mode") === "enabled") {
  body.classList.add("dark-mode");
  modeIcon.src = "assets/icons/moon-icon.png";
}

toggleMode.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  const isDarkMode = body.classList.contains('dark-mode');
  modeIcon.src = isDarkMode ? "assets/icons/moon-icon.png" : "assets/icons/sun-icon.png";
  localStorage.setItem("dark-mode", isDarkMode ? "enabled" : "disabled");
});

//  contacts
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const formMessage = document.getElementById('form-message');

    if (name && email && message) {
      formMessage.textContent = 'Thank you for your message!';
      formMessage.style.color = 'green';
      form.reset();
    } else {
      formMessage.textContent = 'Please fill out all fields.';
      formMessage.style.color = 'red';
    }
  });
}

// Products
const products = [
  { id: 1, name: "ac", price: "$19.99", image: "assets/images/p1.jpg" },
  { id: 2, name: "huh", price: "$29.99", image: "assets/images/p2.jpg" },
  { id: 3, name: "meow 2", price: "$39.99", image: "assets/images/p3.jpg" },
  { id: 4, name: "meow", price: "$49.99", image: "assets/images/p4.jpg" },
  { id: 5, name: "dr meow", price: "$59.99", image: "assets/images/p5.jpg" },
  { id: 6, name: "the meow", price: "$19.99", image: "assets/images/p6.png" },
];

const searchInput = document.getElementById("search-input");
if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm));
    displayProducts(filteredProducts);
  });
  displayProducts(products);
}

function displayProducts(filteredProducts) {
  const productGallery = document.getElementById("product-gallery");
  if (productGallery) {
    productGallery.innerHTML = filteredProducts.map(product => `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.price}</p>
        <button class="add-to-cart">Add to Cart</button>
      </div>
    `).join('');
  }
}

// Cart 
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
  const cartCount = document.querySelector(".cart-count");
  if (cartCount) cartCount.textContent = cart.length;
}

function addToCart(product) {
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${product.name} added to cart!`);
}

function displayCartItems() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  if (cartItems && cartTotal) {
    cartItems.innerHTML = cart.map((item, index) => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>${item.price}</p>
        <button class="remove-button" data-index="${index}">Remove</button>
      </div>
    `).join('');
    cartTotal.textContent = `Total: $${cart.reduce((total, item) => total + parseFloat(item.price.replace("$", "")), 0).toFixed(2)}`;

    document.querySelectorAll(".remove-button").forEach(button => {
      button.addEventListener("click", () => {
        cart.splice(button.getAttribute("data-index"), 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCartItems();
        updateCartCount();
      });
    });
  }
}

document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", () => {
    const productCard = button.closest(".product-card");
    addToCart({
      name: productCard.querySelector("h3").textContent,
      price: productCard.querySelector("p").textContent,
      image: productCard.querySelector("img").src
    });
  });
});

displayCartItems();
updateCartCount();