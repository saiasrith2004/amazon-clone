//   function toggleMenu(){
//    let menu= document.getElementById("nav-links");
//    console.log(menu);
   
//    if(menu){
//     menu.classList.toggle("show");
//    }
// }
  
//   console.log("loaded");
  
  



// function addToCart(){

//     const userId =
//     sessionStorage.getItem("userId");

//     if(!userId){

//         alert("Please Login First");
//         window.location.href = "login.html";
//         return;

//     }

//     if(currentProduct.stock <= 0){

//         alert("Out Of Stock");
//         return;

//     }

//     fetch("http://localhost:5000/cart",{
//         method:"POST",
//         headers:{
//             "Content-Type":"application/json"
//         },
//         body:JSON.stringify({
//             user_id:userId,
//             product_id:productId
//         })
//     })
//     .then(res=>res.json())
//     .then(data=>{

//         alert(data.message);

//     })
//     .catch(err=>{

//         console.log(err);

//     });

// }

// // function buyNow(){

// //     const userId =
// //     sessionStorage.getItem("userId");

// //     fetch("http://localhost:5000/place-order",{
// //         method:"POST",
// //         headers:{
// //             "Content-Type":"application/json"
// //         },
// //         body:JSON.stringify({
// //             user_id:userId,
// //             product_id:productId,
// //             quantity:1
// //         })
// //     })
// //     .then(res=>res.json())
// //     .then(data=>{

// //         alert(data.message);

// //         window.location.href =
// //         "orders.html";

// //     });

// // }

// function buyNow(){

//     const userId =
//     sessionStorage.getItem("userId");

//     if(!userId){

//         alert("Please Login First");
//         window.location.href = "login.html";
//         return;

//     }

//     if(currentProduct.stock <= 0){

//         alert("Out Of Stock");
//         return;

//     }

//     fetch("http://localhost:5000/place-order",{
//         method:"POST",
//         headers:{
//             "Content-Type":"application/json"
//         },
//         body:JSON.stringify({
//             user_id:userId,
//             product_id:productId,
//             quantity:1
//         })
//     })
//     .then(res=>res.json())
//     .then(data=>{

//         if(!data.success){

//             alert(data.message);
//             return;

//         }

//         alert(data.message);

//         window.location.href =
//         "orders.html";

//     })
//     .catch(err=>{

//         console.log(err);

//     });

// }

// const productId =
// new URLSearchParams(
// window.location.search
// ).get("id");

// if(!productId){

//     document.getElementById("detailImage").src =
//     "images/hplaptop.png";

//     document.getElementById("detailName").textContent =
//     "HP Laptop";

//     document.getElementById("detailPrice").textContent =
//     "₹45000";

//     document.getElementById("detailDescription").textContent =
//     "HP Laptop with 8GB RAM, 512GB SSD and Windows 11.";
//     Document.getElementById("stock").textContent=10

// }
// else{

//     fetch(`http://localhost:5000/product/${productId}`)
//     .then(res => res.json())
//     .then(product => {

//         document.getElementById("detailImage").src =
//         product.image;

//         document.getElementById("detailName").textContent =
//         product.name;

//         document.getElementById("detailPrice").textContent =
//         "Amount :₹" + product.price;

//         document.getElementById("detailDescription").textContent =
//         product.description;
//           document.getElementById("stock").textContent="stock :"+product.stock

//     });

// }



console.log("loaded");

let currentProduct = null;

function toggleMenu(){

    let menu =
    document.getElementById("nav-links");

    if(menu){
        menu.classList.toggle("show");
    }

}

// ====================
// Add To Cart
// ====================

function addToCart(){

    if(!currentProduct){

        alert("Product Not Loaded");
        return;

    }

    const userId =
    sessionStorage.getItem("userId");

    if(!userId){

        alert("Please Login First");
        window.location.href =
        "login.html";

        return;
    }

    if(currentProduct.stock <= 0){

        alert("Out Of Stock");
        return;

    }

    fetch("http://localhost:5000/cart",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            user_id:userId,
            product_id:productId

        })

    })
    .then(res=>res.json())
    .then(data=>{

        alert(data.message);

    })
    .catch(err=>{

        console.log(err);

    });
    window.location.href="cart.html"

}

// ====================
// Buy Now
// ====================

// function buyNow(){
//     // window.location.href="payment.html";

//     if(!currentProduct){

//         alert("Product Not Loaded");
//         return;

//     }

//     const userId =
//     sessionStorage.getItem("userId");

//     if(!userId){

//         alert("Please Login First");

//         window.location.href =
//         "login.html";

//         return;

//     }

//     if(currentProduct.stock <= 0){

//         alert("Out Of Stock");
//         return;

//     }
   

//     fetch("http://localhost:5000/place-order",{

//         method:"POST",

//         headers:{
//             "Content-Type":"application/json"
//         },

//         body:JSON.stringify({

//             user_id:userId,
//             product_id:productId,
//             quantity:1

//         })

//     })
//     .then(res=>res.json())
//     .then(data=>{

//         if(!data.success){

//             alert(data.message);
//             return;

//         }

//         alert(data.message);

//         window.location.href =
//         "orders.html";

//     })
//     .catch(err=>{

//         console.log(err);

//     });

// }

function buyNow(){

    const userId =
    sessionStorage.getItem("userId");

    if(!userId){

        alert("Please Login First");

        window.location.href =
        "login.html";

        return;
    }

    if(currentProduct.stock <= 0){

        alert("Out Of Stock");
        return;
    }

    fetch("http://localhost:5000/cart",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            user_id:userId,
            product_id:productId,
            quantity:1

        })

    })
    .then(res=>res.json())
    .then(data=>{

        if(!data.success){

            alert(data.message);
            return;
        }

        alert("Added To Cart");

        window.location.href =
        "cart.html";

    })
    .catch(err=>{

        console.log(err);

    });

}


// ====================
// Load Product
// ====================

const productId =
new URLSearchParams(
window.location.search
).get("id");

if(!productId){

    currentProduct = {

        id:0,
        name:"HP Laptop",
        price:45000,
        stock:10,
        image:"images/hplaptop.png",
        description:
        "HP Laptop with 8GB RAM, 512GB SSD and Windows 11."

    };

    document.getElementById("detailImage").src =
    currentProduct.image;

    document.getElementById("detailName").textContent =
    currentProduct.name;

    document.getElementById("detailPrice").textContent =
    "Amount : ₹" + currentProduct.price;

    document.getElementById("detailDescription").textContent =
    currentProduct.description;

    document.getElementById("stock").textContent =
    "Stock : " + currentProduct.stock;

}
else{

    fetch(
        `http://localhost:5000/product/${productId}`
    )
    .then(res=>res.json())
    .then(product=>{

        console.log(product);

        currentProduct = product;

        document.getElementById("detailImage").src =
        product.image;

        document.getElementById("detailName").textContent =
        product.name;

        document.getElementById("detailPrice").textContent =
        "Amount : ₹" + product.price;

        document.getElementById("detailDescription").textContent =
        product.description;

        if(product.stock <= 0){

            document.getElementById("stock").textContent =
            "Out Of Stock";

            document.getElementById("stock").style.color =
            "red";

        }
        else{

            document.getElementById("stock").textContent =
            "Stock : " + product.stock;

        }

    })
    .catch(err=>{

        console.log(err);

    });

}
