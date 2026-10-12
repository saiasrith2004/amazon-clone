function toggleMenu(){
   let menu= document.getElementById("nav-links");
   console.log(menu);
   
   if(menu){
    menu.classList.toggle("show");
   }
}

loadFeaturedProducts();
loadBestSellers();

async function loadFeaturedProducts(){

    const response =
    await fetch("http://localhost:5000/featured-products");

    const products =
    await response.json();

    let output = "";

    products.forEach(product=>{

        output += `
        <div class="product-card">

            <img src="${product.image}" alt="">

            <h3>${product.name}</h3>

            <p>₹${product.price}</p>

            <button onclick="location.href='products.html'">
                View Product
            </button>

        </div>
        `;
    });

    document.getElementById(
        "featuredProducts"
    ).innerHTML = output;
}

async function loadBestSellers(){

    const response =
    await fetch("http://localhost:5000/best-sellers");

    const products =
    await response.json();

    let output = "";

    products.forEach(product=>{

        output += `
        <div class="product-card">

            <img src="${product.image}" alt="">

            <h3>${product.name}</h3>

            <p>₹${product.price}</p>

            <button onclick="location.href='products.html'">
                View Product
            </button>

        </div>
        `;
    });

    document.getElementById(
        "bestSellers"
    ).innerHTML = output;
}
