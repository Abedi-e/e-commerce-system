
// --- Mock Product Database ---

const products = [
    { id: 1, name: "Premium Leather Loafers", price: 850, category: "clothes", available: true, img: "https://images.unsplash.com/photo-1616406432452-07bc5938759d?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGVhdGhlciUyMHNob2VzfGVufDB8fDB8fHww" },
    { id: 2, name: "Vintage Denim Jacket", price: 650, category: "clothes", available: true, img: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVuaW0lMjBqYWNrZXR8ZW58MHx8MHx8fDA%3D" },
    { id: 3, name: "Minimalist Silver Accent", price: 1200, category: "clothes", available: false, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfV23TaYn0JrvkD6k78Wa-dXUkI1psZsZZWw&s=10" },

    { id: 4, name: "Pro Smartphone 5G", price: 5900, category: "electronics", available: true, img: "https://images.unsplash.com/photo-1559723944-6913027cf19a?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvJTIwc2hhcGV8ZW58MHx8MHx8fDA%3D" },
    { id: 5, name: "Ultrabook Laptop 14", price: 12500, category: "electronics", available: true, img: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGFwdG9wfGVufDB8fDB8fHww" },
    { id: 6, name: "Mechanical Gaming Keyboard", price: 450, category: "electronics", available: false, img: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z2FtaW5nJTIwa2V5Ym9hcmR8ZW58MHx8MHx8fDA%3D" },
   
    { id: 7, name: "Hydrating Hyaluronic Serum", price: 350, category: "beauty", available: true, img: "https://images.unsplash.com/photo-1629380108599-ea06489d66f5?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHlkcmF0aW5nJTIwaGFsYXVyb25pYyUyMHNlcm1lbnxlbnwwfHwwfHx8MA%3D%3D" },
    { id: 8, name: "Velvet Matte Set", price: 280, category: "beauty", available: true, img: "https://images.unsplash.com/photo-1583209814683-c023dd293cc6?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmVsdmV0JTIwbWFubGUlMjBsaXBzdGljayUyMHNldHxlbnwwfHwwfHx8MA%3D%3D" },
    { id: 9, name: "Luxury Oud Perfume", price: 1500, category: "beauty", available: true, img: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bHV4dXJ5JTIwb3VkJTIwcGVyZnVtZXxlbnwwfHwwfHx8MA%3D%3D" }
];

let cart = [];

document.addEventListener("DOMContentLoaded", () => {
    buildAllGrids(products);
    updateCartUI();
});

// --- Builds product grids dynamically ---
function buildAllGrids(productsList) {
    const categories = ['clothes', 'electronics', 'beauty'];
    
    categories.forEach(cat => {
        const gridContainer = document.getElementById(`grid-${cat}`);
        const catProducts = productsList.filter(p => p.category === cat);
        
        gridContainer.innerHTML = '';
        
        if (catProducts.length === 0) {
            gridContainer.innerHTML = `<div class="col-10 mx-auto text-center py-3"><p class="text-muted">No products match your search parameters.</p></div>`;
            return;
        }

        catProducts.forEach(prod => {
            gridContainer.innerHTML += `
                <div class="col">
                    <div class="card h-100 product-card">
                        <img src="${prod.img}" class="card-img-top" style="height: 180px; object-fit: cover;" alt="${prod.name}">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title h6 mb-1">${prod.name}</h5>
                            <p class="card-text fw-bold text-dark mb-2">Ksh ${prod.price.toLocaleString()}</p>
                            <p class="card-text small mb-3 ${prod.available ? 'text-success' : 'text-danger'}">
                                ${prod.available ? '● In Stock' : '✕ Out of Stock'}
                            </p>
                            <button class="btn btn-dark w-100 mt-auto btn-sm" onclick="addToCart(${prod.id})" ${!prod.available ? 'disabled' : ''}>
                                ${prod.available ? 'Add to Cart' : 'Sold Out'}
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
    });
}

// --- Direct Toggle Function Using Absolute Button Target IDs ---
function toggleCategoryGrid(category) {
    const targetGrid = document.getElementById(`grid-${category}`);
    const targetBtn = document.getElementById(`btn-${category}`);
    
    if (targetGrid.classList.contains('product-grid-hidden')) {
        targetGrid.classList.remove('product-grid-hidden');
        targetGrid.classList.add('product-grid-visible');
        targetBtn.textContent = `Hide ${category.charAt(0).toUpperCase() + category.slice(1)}`;
    } else {
        targetGrid.classList.remove('product-grid-visible');
        targetGrid.classList.add('product-grid-hidden');
        targetBtn.textContent = `See More ${category.charAt(0).toUpperCase() + category.slice(1)}`;
    }
}

// --- Global Search System ---
// --- Updated Event Initialization Hook ---
document.addEventListener("DOMContentLoaded", () => {
    buildAllGrids(products);
    updateCartUI();

    // Live typing listener: executes search instantly on keypress
    const textInputField = document.getElementById('searchInput');
    if (textInputField) {
        textInputField.addEventListener('input', searchProducts);
    }

    // Dropdown updates: executes searches automatically on selection modifications
    const catDropdown = document.getElementById('categoryFilter');
    const sortDropdown = document.getElementById('sortSelect');
    
    if (catDropdown) catDropdown.addEventListener('change', searchProducts);
    if (sortDropdown) sortDropdown.addEventListener('change', searchProducts);
});


// --- Global Search & Element Filtering Engine ---
function searchProducts() {
    const searchVal = document.getElementById('searchInput').value.toLowerCase().trim();
    const categoryVal = document.getElementById('categoryFilter').value;
    const sortVal = document.getElementById('sortSelect').value;

    // 1. Filter out raw items array matching search rules
    let filtered = products.filter(p => {
        const matchName = p.name.toLowerCase().includes(searchVal);
        const matchCategory = (categoryVal === 'all' || p.category === categoryVal);
        return matchName && matchCategory;
    });

    // 2. Sort results if applicable
    if (sortVal === 'low') filtered.sort((a, b) => a.price - b.price);
    if (sortVal === 'high') filtered.sort((a, b) => b.price - a.price);

    // 3. Render filtered items inside matching category sections
    buildAllGrids(filtered);

    // Track if global grid content is totally empty across categories
    let visibleProductsCount = filtered.length;

    // 4. Clean structural section state tracking loops
    ['clothes', 'electronics', 'beauty'].forEach(cat => {
        const grid = document.getElementById(`grid-${cat}`);
        const btn = document.getElementById(`btn-${cat}`);
        const section = document.getElementById(`section-${cat}`);
        const carousel = document.getElementById(`carousel${cat.charAt(0).toUpperCase() + cat.slice(1)}`);

        // Check category products count inside current collection subset
        const catProductsCount = filtered.filter(p => p.category === cat).length;

        // If a specific text query string is present, FORCE hide all promotional carousels
        if (carousel) {
            if (searchVal.length > 0) {
                carousel.style.setProperty("display", "none", "important");
            } else {
                carousel.style.setProperty("display", "block", "important");
            }
        }

        // Logic routing visibility arrangements
        if (categoryVal !== 'all' && cat !== categoryVal) {
            // Hide if user selected a different specific option inside dropdown filter
            if (section) section.style.display = 'none';
        } else if (searchVal.length > 0 && catProductsCount === 0) {
            // Hide section heading if text string is active but yields zero records here
            if (section) section.style.display = 'none';
        } else {
            // Display valid search results layout blocks
            if (section) section.style.display = 'block';
            if (grid) {
                grid.classList.remove('product-grid-hidden');
                grid.classList.add('product-grid-visible');
            }
            if (btn) btn.textContent = `Hide ${cat.charAt(0).toUpperCase() + cat.slice(1)}`;
        }
    });

    // 5. Dynamic Global Error Notification Handler Injection
    let fallbackAlert = document.getElementById('global-search-empty-fallback');
    
    if (visibleProductsCount === 0) {
        if (!fallbackAlert) {
            fallbackAlert = document.createElement('div');
            fallbackAlert.id = 'global-search-empty-fallback';
            fallbackAlert.className = 'text-center py-5 my-4 bg-white rounded shadow-sm col-12';
            fallbackAlert.innerHTML = `
                <h3 class="fw-bold text-dark h4 mb-2">No Matching Products Found</h3>
                <p class="text-muted mb-0 px-3">We couldn't find items for "${searchVal}". Check your spelling or tweak filters!</p>
            `;
            // Insert cleanly into main interface container node
            document.getElementById('products').prepend(fallbackAlert);
        }
    } else {
        if (fallbackAlert) fallbackAlert.remove();
    }
}
// --- Cart Core Engine ---
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product || !product.available) return;

    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartUI();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

function updateCartUI() {
    const badge = document.getElementById('cart-count');
    const container = document.getElementById('cart-items');
    const totalDisplay = document.getElementById('total-price');
    const checkoutWrapper = document.getElementById('checkout-wrapper');

    const count = cart.reduce((acc, item) => acc + item.quantity, 0);
    badge.textContent = count;

    if (cart.length === 0) {
        container.innerHTML = `<p class="text-muted text-center mb-0 py-2">Your shopping cart is completely empty.</p>`;
        totalDisplay.textContent = "Total: $0";
        checkoutWrapper.innerHTML = ''; // Hide Checkout button if empty
        return;
    }

    let html = '';
    let runningTotal = 0;

    cart.forEach(item => {
        runningTotal += (item.price * item.quantity);
        html += `
            <div class="cart-item d-flex align-items-center justify-content-between p-3 mb-2 bg-light rounded shadow-sm">
                <div class="d-flex align-items-center">
                    <img src="${item.img}" alt="${item.name}" class="rounded me-3" style="width: 50px; height: 50px; object-fit: cover;">
                    <div>
                        <h6 class="mb-0 fw-bold text-dark">${item.name}</h6>
                        <small class="text-muted">Ksh ${item.price.toLocaleString()} * ${item.quantity}</small>
                    </div>
                </div>
                <div class="d-flex align-items-center">
                    <span class="fw-bold me-3 text-dark">Ksh ${(item.price * item.quantity).toLocaleString()}</span>
                    <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${item.id})">✕ Remove</button>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
    totalDisplay.textContent = `Total: Ksh ${runningTotal.toLocaleString()}`;
    
    // Inject the Checkout Button if items exist
    checkoutWrapper.innerHTML = `
        <button class="btn btn-warning btn-lg fw-bold px-5" onclick="executeCheckout(${runningTotal})">
            Proceed to Checkout
        </button>
    `;
}

// --- Checkout Handler ---
function executeCheckout(finalAmount) {
    alert(`Thank you for shopping at Pamoja Stores!\nYour order totaling Ksh ${finalAmount.toLocaleString()} has been processed successfully.`);
    cart = []; // Empty the cart state
    updateCartUI(); // Reset UI layout 
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll back up to the home section
}