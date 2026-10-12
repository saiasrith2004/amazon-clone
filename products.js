
function toggleMenu(){
   let menu= document.getElementById("nav-links");
   console.log(menu);
   
   if(menu){
    menu.classList.toggle("show");
   }
}

fetch("http://localhost:5000/products")
.then(res => res.json())
.then(products => {

    let output = "";

    products.forEach(product => {

        output += `
        <div class="product-card">

            <img src="${product.image}" alt="${product.name}">

            <h3>${product.name}</h3>

            <p>Amount: ₹${product.price}</p>
            <p>stock :${product.stock}</p>

            <button onclick="viewProduct(${product.id})">
                View Details
            </button>

            <button onclick="addToCart(${product.id})">
                Add To Cart
            </button>

        </div>
        `;
    });

    document.getElementById("products").innerHTML = output;

})
.catch(err => {
    console.log(err);
});

function viewProduct(id){

    window.location.href =
    `product-details.html?id=${id}`;
}

function addToCart(id){

    const userId = sessionStorage.getItem("userId");

    fetch("http://localhost:5000/cart",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            user_id:userId,
            product_id:id
        })
    })
    .then(res=>res.json())
    .then(data=>{
        alert(data.message);
    });
}





function searchProducts() {

    const keyword =
    document.getElementById("searchInput")
    .value
    .trim()
    .toLowerCase();

    const cards =
    document.querySelectorAll("#products .product-card");

    // If input is empty show all products
    if(keyword === ""){

        cards.forEach(card => {

            card.style.display = "block";

        });

        return;
    }

    let found = false;

    cards.forEach(card => {

        const productName =
        card.querySelector("h3")
        .textContent
        .toLowerCase();

        if(productName.includes(keyword)){

            card.style.display = "block";
            found = true;

        }else{

            card.style.display = "none";

        }

    });

    // If wrong product name entered show all products
    if(!found){

        cards.forEach(card => {

            card.style.display = "block";

        });

    }
}

// Auto search while typing
document
.getElementById("searchInput")
.addEventListener("input", searchProducts);


window.onload = function(){

    const keyword =
    new URLSearchParams(
        window.location.search
    ).get("search");

    if(keyword){

        searchProduct(keyword);

    }else{

        loadProducts();

    }
}


async function searchProduct(keyword){

    const response =
    await fetch(
        `http://localhost:5000/search-products?keyword=${keyword}`
    );

    const products =
    await response.json();

    let output = "";

    products.forEach(product=>{

        output += `
        <div class="product-card">

            <img src="${product.image}">

            <h3>${product.name}</h3>

            <p>₹${product.price}</p>

            <p>Stock: ${product.stock}</p>

            <button
                onclick="viewProduct(${product.id})">
                View Details
            </button>

        </div>
        `;
    });

    document.getElementById(
        "productContainer"
    ).innerHTML = output;
}

function viewproduct(id){
    window.location.href=`product-details.html?id=${id}`;
}



const API_URL = "http://localhost:5000/products";

// HTML elements
const productsContainer = document.getElementById("products");
const priceRange = document.getElementById("priceRange");
const priceValue = document.getElementById("priceValue");
const sortFilter = document.getElementById("sortFilter");
const searchInput = document.getElementById("searchInput");
const resultCount = document.getElementById("resultCount");
const resetFilter = document.getElementById("resetFilter");
const searchBtn = document.getElementById("searchBtn");

let allProducts = [];

// Load products from MySQL through the backend
async function loadProducts() {
    if (!productsContainer) {
        console.error("Products container #products not found.");
        return;
    }

    productsContainer.innerHTML = "<p>Loading products...</p>";

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
            throw new Error("Products API must return an array.");
        }

        // Remove duplicate product IDs from API results
        const uniqueProducts = new Map();

        data.forEach(product => {
            const id = product.id ?? product.product_id;

            if (id != null && !uniqueProducts.has(String(id))) {
                uniqueProducts.set(String(id), {
                    ...product,
                    id,
                    price: Number(product.price)
                });
            }
        });

        allProducts = Array.from(uniqueProducts.values())
            .filter(product =>
                Number.isFinite(product.price) &&
                product.price >= 0
            );

        applyFilters();

    } catch (error) {
        console.error("Product loading error:", error);

        productsContainer.replaceChildren();

        const message = document.createElement("p");
        message.className = "empty-message";
        message.textContent =
            "Unable to load products. Check your backend and database connection.";

        productsContainer.appendChild(message);

        if (resultCount) {
            resultCount.textContent = "Products could not be loaded.";
        }
    }
}

// Search, price range and sorting
function applyFilters() {
    if (!productsContainer) return;

    const maxPrice = Number(priceRange?.value ?? 100000);
    const searchText = searchInput?.value.trim().toLowerCase() ?? "";
    const sortOption = sortFilter?.value ?? "relevance";

    if (priceValue) {
        priceValue.textContent = maxPrice.toLocaleString("en-IN");
    }

    let filteredProducts = allProducts.filter(product => {
        const name = String(product.name ?? "").toLowerCase();
        const description = String(product.description ?? "").toLowerCase();

        return (
            product.price <= maxPrice &&
            (name.includes(searchText) ||
             description.includes(searchText))
        );
    });

    if (sortOption === "low-high") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "high-low") {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    displayProducts(filteredProducts);
}

// Display products in ONE container
function displayProducts(products) {
    // Clear previous cards to prevent duplicate rendering
    productsContainer.replaceChildren();

    if (resultCount) {
        resultCount.textContent =
            `${products.length} product(s) found`;
    }

    if (products.length === 0) {
        const message = document.createElement("p");
        message.className = "empty-message";
        message.textContent = "No products found.";
        productsContainer.appendChild(message);
        return;
    }

    products.forEach(product => {
        const card = document.createElement("article");
        card.className = "product-card";

        const image = document.createElement("img");
        image.src = product.image || "";
        image.alt = product.name || "Product";
        image.loading = "lazy";

        image.onerror = function () {
            this.style.display = "none";
        };

        const name = document.createElement("h3");
        name.textContent = product.name || "Unnamed Product";

        const price = document.createElement("p");
        price.className = "price";
        price.textContent =
            `₹${product.price.toLocaleString("en-IN")}`;

        const button = document.createElement("button");
        button.type = "button";
        button.className = "view-btn";
        button.textContent = "View Product";

        button.addEventListener("click", () => {
            if (product.id == null) {
                alert("Product ID is missing.");
                return;
            }

            window.location.href =
                `product-details.html?id=${encodeURIComponent(product.id)}`;
        });

        card.append(image, name, price, button);
        productsContainer.appendChild(card);
    });
}

// Event listeners
priceRange?.addEventListener("input", applyFilters);
sortFilter?.addEventListener("change", applyFilters);
searchInput?.addEventListener("input", applyFilters);
searchBtn?.addEventListener("click", applyFilters);

// Reset filters
resetFilter?.addEventListener("click", () => {
    if (priceRange) priceRange.value = priceRange.max || 100000;
    if (sortFilter) sortFilter.value = "relevance";
    if (searchInput) searchInput.value = "";

    applyFilters();
});

// Start
loadProducts();
