
function togglePassword(inputId, icon) {
    const input = document.getElementById(inputId);

    if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    } else {
        input.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
}

// document.getElementById("loginForm").addEventListener("submit", async (e)=>{
//     e.preventDefault();
    
//     let loginInput =document.getElementById("loginInput").value.trim();
//     console.log(loginInput);
    
//     let password=document.getElementById("password").value.trim();
//     console.log(password);
    
//     if(loginInput===""||password===""){
//         alert("please enter all details")
//         return;
//     }
//     let response =await fetch("http://localhost:5000/login",
//         {
//             method:"POST",
//             headers:{
//                 "Content-Type":"application/json"
//             },
//             body:JSON.stringify({
//                 loginInput,password
//             })
//         }
//     )
//     let data=await response.json();
//     console.log(data);
    
//     if(data.success){
//         sessionStorage.setItem("userId",data.user.id)
//         window.location.href="index.html"
//     }
//     else{
//         alert(data.message)
//     }
// })



document.getElementById("loginForm")
.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email =
    document.getElementById("loginInput").value.trim();

    const password =
    document.getElementById("password").value.trim();
    console.log(document.getElementById("loginInput"));
console.log(document.getElementById("email"));

    const response = await fetch(
        "http://localhost:5000/login",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                password
            })
        }
    );

    const data = await response.json();

    if(data.success){

        if(data.role === "admin"){

            window.location.href = "admin.html";

        }else{

            sessionStorage.setItem(
                "userId",
                data.userId
            );

            window.location.href = "index.html";
        }

    }else{

        alert("Invalid Credentials");

    }

});

// document.getElementById("loginForm")
// .addEventListener("submit", async (e) => {

//     e.preventDefault();

//     const email =
//     document.getElementById("loginInput").value.trim();

//     const password =
//     document.getElementById("password").value.trim();

//     const response = await fetch(
//         "http://localhost:5000/login",
//         {
//             method:"POST",
//             headers:{
//                 "Content-Type":"application/json"
//             },
//             body:JSON.stringify({
//                 email,
//                 password
//             })
//         }
//     );

//     const data = await response.json();

//     if(data.success){

//         if(
//     email === "admin@gmail.com" &&
//     password === "admin123"
// ){
//     return res.json({
//         success:true,
//         role:"admin"
//     });
// }else{

//             sessionStorage.setItem(
//                 "userId",
//                 data.userId
//             );

//             window.location.href="index.html";
//         }

//     }else{

//         alert("Invalid Credentials");
//     }

// });
function googleLogin(){
    window.location.href="index.html";
}


// const data = await response.json();

// if(data.success){

//     if(data.role === "admin"){

//         window.location.href = "admin.html";

//     }else{

//         sessionStorage.setItem(
//             "userId",
//             data.userId
//         );

//         window.location.href = "index.html";

//     }

// }else{

//     alert("Invalid Credentials");

// }