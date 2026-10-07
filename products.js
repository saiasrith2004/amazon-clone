
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


// async function searchProducts() {

//     const keyword =
//         document.getElementById("searchInput").value.trim();

//     const response = await fetch(
//         `http://localhost:5000/search-products?keyword=${keyword}`
//     );

//     const products = await response.json();

//     let output = "";

//     products.forEach(product => {

//         output += `
//         <div class="product-card">
//             <img src="${product.image}">
//             <h3>${product.name}</h3>
//             <p>₹${product.price}</p>
//             <h2>${product.stock}</h2>
//         </div>
//         `;
//     });

//     document.getElementById("productContainer").innerHTML = output;
// }
// document
// .getElementById("searchInput")
// .addEventListener("keyup", searchProducts);

// async function searchProducts() {

//     const keyword =
//     document.getElementById("searchInput").value.trim();

//     const response = await fetch(
//         `http://localhost:5000/search-products?keyword=${keyword}`
//     );

//     const products = await response.json();

//     let output = "";

//     products.forEach(product => {

//         output += `
//         <div class="product-card">
//             <img src="${product.image}">
//             <h3>${product.name}</h3>
//             <p>₹${product.price}</p>
//             <p>Stock: ${product.stock}</p>

//             <button onclick="viewproduct(${product.id})">
//                 View Details
//             </button>
//         </div>
//         `;
//     });

//     document.getElementById("productContainer").innerHTML +=
//     output;
// }

// document
// .getElementById("searchInput")
// .addEventListener("keyup", searchProducts);





// async function searchProducts(){

//     const keyword =
//     document.getElementById("searchInput")
//     .value
//     .trim();

//     const response = await fetch(
//         `http://localhost:5000/search-products?keyword=${keyword}`
//     );

//     const products = await response.json();

//     let output = "";

//     products.forEach(product=>{

//         output += `
//         <div class="product-card">
//             <img src="${product.image}">
//             <h3>${product.name}</h3>
//             <p>₹${product.price}</p>
//             <p>Stock: ${product.stock}</p>

//             <button onclick="viewProduct(${product.id})">
//                 View Details
//             </button>
//         </div>
//         `;
//     });

//     document.getElementById("productContainer").innerHTML =
//     output;
// }



// window.onload = function(){

//     const keyword =
//     new URLSearchParams(
//         window.location.search
//     ).get("search");

//     if(keyword){

//         searchProduct(keyword);

//     }else{

//         loadProducts();

//     }
// }


// async function searchProduct(keyword){

//     const response =
//     await fetch(
//         `http://localhost:5000/search-products?keyword=${keyword}`
//     );

//     const products =
//     await response.json();

//     let output = "";

//     products.forEach(product=>{

//         output += `
//         <div class="product-card">

//             <img src="${product.image}">

//             <h3>${product.name}</h3>

//             <p>₹${product.price}</p>

//             <p>Stock: ${product.stock}</p>

//             <button
//                 onclick="viewProduct(${product.id})">
//                 View Details
//             </button>

//         </div>
//         `;
//     });

//     document.getElementById(
//         "productContainer"
//     ).innerHTML = output;
// }

function viewproduct(id){
    window.location.href=`product-details.html?id=${id}`;
}