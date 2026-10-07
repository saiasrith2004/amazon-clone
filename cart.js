console.log("cart.js loaded");

function toggleMenu(){
   let menu= document.getElementById("nav-links");
   console.log(menu);
   
   if(menu){
    menu.classList.toggle("show");
   }
}

// function searchProducts(){

//     const keyword =
//     document.getElementById("searchInput")
//     .value
//     .trim();

//     if(keyword === ""){

//         alert("Enter Product Name");
//         return;

//     }

//     window.location.href =
//     `products.html?search=${encodeURIComponent(keyword)}`;
// }
// function checkout() {
//     if(cartItems.length === 0){

//     document.getElementById("message")
//     .textContent =
//     "Your Cart is Empty";

//     return;
// }
//     window.location.href = "payment.html";
// }

async function checkout(){

    const userId =
    sessionStorage.getItem("userId");
    

    const response =
    await fetch(
        `http://localhost:5000/cart/${userId}`
    );

    const cartItems =
    await response.json();

    if(cartItems.length === 0){

          document.getElementById("message")
     .textContent =
     "Your Cart is Empty";

     return;
    }

    window.location.href =
    "payment.html";
}

const userId = sessionStorage.getItem("userId");
console.log(userId);


loadCart();

 async function loadCart(){

       
    fetch(`http://localhost:5000/cart/${userId}`)
    .then(res => res.json())
    .then(data => {
            console.log(data);
            
        let output = "";
        let total = 0;


        data.forEach(item => {

            let subtotal =
            item.price * item.quantity;

            total += subtotal;

            output += `
            <tr>
                <td>${item.name}</td>

                <td>₹${item.price}</td>
<td>
    <button
        class="qty-btn"
        onclick="updateQty(${item.id},-1)">
        -
    </button>

    <span class="qty-value">
        ${item.quantity}
    </span>

    <button
        class="qty-btn"
        onclick="updateQty(${item.id},1)">
        +
    </button>
</td>

                <td>₹${subtotal}</td>

                <td>
                    <button onclick="removeItem(${item.id})">
                    Remove
                    </button>
                </td>
            </tr>
            `;
        });

        document.getElementById("cartBody")
        .innerHTML = output;

        document.getElementById("totalPrice")
        .innerText = `Total: ₹${total}`;
    });
}

// async function loadCart(){

//     if(!userId) return;

//     fetch(`http://localhost:5000/cart/${userId}`)
//     .then(res => res.json())
//     .then(data => {

//         console.log(data);

//         let output = "";
//         let total = 0;

//         data.forEach(item => {

//             let subtotal = item.price * item.quantity;
//             total += subtotal;

//             output += `
//             <tr>
//                 <td>${item.name}</td>
//                 <td>₹${item.price}</td>
//                 <td>${item.quantity}</td>
//                 <td>₹${subtotal}</td>
//                 <td>
//                     <button onclick="removeItem(${item.id})">
//                         Remove
//                     </button>
//                 </td>
//             </tr>
//             `;
//         });

//         document.getElementById("cartBody").innerHTML = output;
//         document.getElementById("totalPrice").innerText =
//         `Total: ₹${total}`;
//     })
//     .catch(err=>{
//         console.error(err);
//     });
// }

// async function loadCart(){

//     const response =
//     await fetch("http://localhost:5000/cart");

//     const cartItems =
//     await response.json();

//     let output = "";

//     cartItems.forEach(item => {

//         output += `

//         <tr>

//             <td>${item.product_name}</td>

//             <td>₹${item.price}</td>

//             <td>

//                 <button
//                 onclick="decreaseQty(${item.id})">
//                 -
//                 </button>

//                 ${item.quantity}

//                 <button
//                 onclick="increaseQty(${item.id})">
//                 +
//                 </button>

//             </td>

//             <td>
//                 ₹${item.price * item.quantity}
//             </td>

//         </tr>

//         `;
//     });

//     document.getElementById("cartTable").innerHTML =
//     output;
// }

// function updateQty(cartId,change){

//     fetch(
//     `http://localhost:5000/cart/update`,
//     {
//         method:"PUT",
//         headers:{
//             "Content-Type":"application/json"
//         },
//         body:JSON.stringify({
//             cartId,
//             change
//         })
//     })
//     .then(res=>res.json())
//     .then(()=>{
//         loadCart();
//     });
// }


async function updateQty(id,change){

    const response = await fetch(
        `http://localhost:5000/cart/update/${id}`,
        {
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({change})
        }
    );

    const data = await response.json();

    if(!data.success){

        alert(data.message);

        return;
    }

    loadCart();
}

function removeItem(cartId){

    fetch(
    `http://localhost:5000/cart/${cartId}`,
    {
        method:"DELETE"
    })
    .then(res=>res.json())
    .then(()=>{
        loadCart();
    });
}


// function checkout(){

//     console.log("User ID:", userId);

//     fetch(
//     "http://localhost:5000/checkout",
//     {
//         method:"POST",
//         headers:{
//             "Content-Type":"application/json"
//         },
//         body:JSON.stringify({
//             userId
//         })
//     })
//     .then(res=>res.json())
//     .then(data=>{

//         console.log(data);

//         alert(data.message);

//         window.location.href="orders.html";

//     });

// }

// function checkout(){

//     fetch(
//     "http://localhost:5000/checkout",
//     {
//         method:"POST",
//         headers:{
//             "Content-Type":"application/json"
//         },
//         body:JSON.stringify({
//             userId
//         })
//     })
//     .then(res=>res.json())
//     .then(data=>{

//         alert(data.message);

//         window.location.href =
//         "orders.html";

//     });
// }

async function increaseQty(id){

    await fetch(
    `http://localhost:5000/cart/increase/${id}`,
    {
        method:"PUT"
    });

    loadCart();
}

async function decreaseQty(id){

    await fetch(
    `http://localhost:5000/cart/decrease/${id}`,
    {
        method:"PUT"
    });

    loadCart();
}
function changeQuantity(cartId, change){

    fetch(`http://localhost:5000/cart/${cartId}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            change
        })
    })
    .then(res=>res.json())
    .then(data=>{
        loadCart();
    });

}
