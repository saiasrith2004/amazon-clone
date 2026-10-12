function toggleMenu(){
   let menu= document.getElementById("nav-links");
   console.log(menu);
   
   if(menu){
    menu.classList.toggle("show");
   }
}

const userId = sessionStorage.getItem("userId");

fetch(`http://localhost:5000/profile/${userId}`)
.then(res => res.json())
.then(user => {

    document.getElementById("username").textContent =
    user.username;

    document.getElementById("email").textContent =
    user.email;

    document.getElementById("phone").textContent =
    user.phone;

    document.getElementById("address").textContent =
    user.address;
})
.catch(err => console.log(err));

function logout(){

    sessionStorage.clear();

    alert("Logged Out Successfully");

    window.location.href = "login.html";
}