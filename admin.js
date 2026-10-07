


function toggleMenu(){
   let menu= document.getElementById("nav-links");
   console.log(menu);
   
   if(menu){
    menu.classList.toggle("show");
   }
}

const API_URL = "http://localhost:5000";




// Load Dashboard
loadDashboard();
loadProducts();
loadUsers();
loadOrders()


async function loadOrders(){

    const response =
    await fetch(`${API_URL}/admin/orders`);

    const orders =
    await response.json();

    let output = "";

    orders.forEach(order=>{

        output += `
        <tr>

            <td>${order.order_id}</td>

            <td>${order.user_id}</td>

            <td>${order.productname}</td>

            <td>${order.quantity}</td>

            <td>${order.paymentmethod}</td>

            <td>

                <select onchange="updateStatus(${order.order_id},this.value)">

                    <option value="Pending"
                    ${order.status==="Pending"?"selected":""}>
                    Pending
                    </option>

                    <option value="Completed"
                    ${order.status==="Completed"?"selected":""}>
                    Completed
                    </option>

                </select>

            </td>

        </tr>
        `;
    });

    document.getElementById("ordersTable").innerHTML =
    output;
}

// =====================
// Dashboard
// =====================

async function loadDashboard() {

    try {

        const users = await fetch(`${API_URL}/admin/users`);
        const usersData = await users.json();

        const products = await fetch(`${API_URL}/admin/products`);
        const productsData = await products.json();

        const orders = await fetch(`${API_URL}/admin/orders`);
        const ordersData = await orders.json();

        document.getElementById("totalUsers").textContent =
            usersData.length;

        document.getElementById("totalProducts").textContent =
            productsData.length;

        document.getElementById("totalOrders").textContent =
            ordersData.length;

    }

    catch (err) {

        console.log(err);

    }

}

// =====================
// Add Product
// =====================

document.getElementById("productForm")
.addEventListener("submit", async (e) => {

    e.preventDefault();

    const name =
        document.getElementById("product_name").value;

    const price =
        document.getElementById("price").value;

    const image =
        document.getElementById("image").value;
        const stock =
document.getElementById("stock").value;

    const description =
        document.getElementById("description").value;

    const response = await fetch(
        `${API_URL}/admin/product`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name,
                price,
                image,
                description,stock
            })
        }
    );

    const data = await response.json();

    alert(data.message);

    document.getElementById("productForm").reset();

    loadProducts();
    loadDashboard();

});

// =====================
// Load Products
// =====================

async function loadProducts() {

    const response =
        await fetch(`${API_URL}/admin/products`);

    const products =
        await response.json();

    let output = "";

    products.forEach(product => {

        output += `

        <tr>

            <td>${product.id}</td>

            <td>${product.name}</td>

            <td>₹${product.price}</td>
            <td>${product.stock}</td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editProduct(${product.id})"
                >
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteProduct(${product.id})"
                >
                    Delete
                </button>

            </td>

        </tr>

        `;

// <tr>
//     <td>${order.id}</td>
//     <td>${order.product_name}</td>
//     <td>${order.quantity}</td>

//     <td>
//         <select onchange="updateStatus(${order.id},this.value)">
//             <option value="Pending"
//             ${order.status==="Pending"?"selected":""}>
//             Pending
//             </option>

//             <option value="Completed"
//             ${order.status==="Completed"?"selected":""}>
//             Completed
//             </option>
//         </select>
//     </td>
// </tr>
// `;
   
   
    });

    document.getElementById("productTable").innerHTML =
        output;

}


function updateStatus(orderId,status){

    fetch(
        `http://localhost:5000/admin/order/${orderId}`,
        {
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                status:status
            })
        }
    )
    .then(res=>res.json())
    .then(data=>{
        alert(data.message);
    })
    .catch(err=>console.log(err));
}

// =====================
// Delete Product
// =====================

async function deleteProduct(id) {

    if (!confirm("Delete Product?")) {
        return;
    }

    await fetch(
        `${API_URL}/admin/product/${id}`,
        {
            method: "DELETE"
        }
    );

    loadProducts();
    loadDashboard();

}

// =====================
// Edit Product
// =====================

async function editProduct(id) {

    const name =
        prompt("Enter Product Name");

    const price =
        prompt("Enter Product Price");

    const image =
        prompt("Enter Image URL");

    const stock=prompt("Enter the stock")    

    const description =
        prompt("Enter Description");

    await fetch(
        `${API_URL}/admin/product/${id}`,
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                name,

                price,

                image,
                stock,

                description

            })

        }
    );

    loadProducts();

}

// =====================
// Load Users
// =====================

async function loadUsers() {

    const response =
        await fetch(`${API_URL}/admin/users`);

    const users =
        await response.json();

    let output = "";

    users.forEach(user => {

        output += `

        <tr>

            <td>${user.id}</td>

            <td>${user.username}</td>

            <td>${user.email}</td>

            <td>${user.phone}</td>

            <td>

                <button
                    class="delete-btn"
                    onclick="deleteUser(${user.id})"
                >
                    Delete
                </button>

            </td>

        </tr>

        `;

    });

    document.getElementById("userTable").innerHTML =
        output;

}

// =====================
// Delete User
// =====================

async function deleteUser(id) {

    if (!confirm("Delete User?")) {
        return;
    }

    await fetch(
        `${API_URL}/admin/user/${id}`,
        {
            method: "DELETE"
        }
    );

    loadUsers();
    loadDashboard();

}