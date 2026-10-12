function toggleMenu(){
   let menu= document.getElementById("nav-links");
   console.log(menu);
   
   if(menu){
    menu.classList.toggle("show");
   }
}
// const userId = sessionStorage.getItem("userId");

// fetch(`http://localhost:5000/orders/${userId}`)
// .then(res => res.json())
// .then(data => {

//     let output = "";

//     data.forEach(order => {

//         output += `
//         <tr>
//             <td>${order.id}</td>
//             <td>${order.product_name}</td>
//             <td>${order.quantity}</td>
//             <td>${new Date(order.order_date).toLocaleDateString()}</td>
//             <td class="${order.status.toLowerCase()}">
//                 ${order.status}
//             </td>
//         </tr>
//         `;
//     });

//     document.getElementById("ordersTable").innerHTML = output;
// })
// .catch(err => console.log(err));



// const userId = localStorage.getItem("userId");

// fetch(`http://localhost:5000/orders/${userId}`)
//     .then(res => res.json())
//     .then(data => {

//         console.log(data);

//         const ordersTable = document.getElementById("ordersTable");

//         if (!Array.isArray(data)) {
//             ordersTable.innerHTML =
//                 `<tr>
//                     <td colspan="8">No Orders Found</td>
//                 </tr>`;
//             return;
//         }

//         let output = "";

//         data.forEach(order => {

//             output += `
//             <tr>
//                 <td>${order.order_id}</td>
//                 <td>${order.username}</td>
//                 <td>${order.product_name}</td>
//                 <td>₹${order.price}</td>
//                 <td>${order.quantity}</td>
//                 <td>${order.payment_method}</td>
//                 <td>${new Date(order.order_date).toLocaleDateString()}</td>
//             </tr>
//             `;
//         });

//         ordersTable.innerHTML = output;
//     })
//     .catch(err => {
//         console.error(err);

//         document.getElementById("ordersTable").innerHTML =
//             `<tr>
//                 <td colspan="8">Error Loading Orders</td>
//             </tr>`;
//     });
const userId = sessionStorage.getItem("userId");

fetch(`http://localhost:5000/orders/${userId}`)
.then(res => res.json())
.then(data => {

    console.log(data);

    let output = "";

    data.forEach(order => {

        output += `
        <tr>
            <td>${order.order_id}</td>
            <td>${order.username}</td>
            <td>${order.productname}</td>
            <td>${order.quantity}</td>
            <td>₹${order.price}</td>
            <td>${order.paymentmethod}</td>
            <td>${new Date(order.order_date).toLocaleDateString()}</td>
           <td class="${order.status.toLowerCase()}">
    ${order.status}
</td>
        </tr>
        `;
    });

    document.getElementById("ordersTable").innerHTML = output;
})
.catch(err => console.log(err));