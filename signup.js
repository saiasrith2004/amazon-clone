
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

document.getElementById("signupForm").addEventListener("submit",async (e)=>{
    e.preventDefault();
    let username=document.getElementById("username").value.trim();
    let email=document.getElementById("email").value.trim();
    let phone=document.getElementById("phone").value.trim();
    let dob=document.getElementById("dob").value.trim();
    let password=document.getElementById("signupPassword").value.trim();
    let address =document.getElementById("address").value.trim();
    let confirmPassword=document.getElementById("confirmPassword").value.trim();
     if(username===""||email===""||phone===""|| dob===""||password===""||confirmPassword===""||address===""){
        alert("please enter all details");
        return;
     }
     let emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if(!emailRegex.test(email)){
        alert("invalid Email");
        return;
     }
     if(!/^[0-9]{10}$/.test(phone)){
        alert("phone must contain 10 digits")
        return;
     }
     if(password!==confirmPassword){
        alert("password does not match");
        return;
     }
     let response=await fetch("http://localhost:5000/signup",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                username,email,phone,dob,password,address
            })
        }
     );
     let data=await response.json();
     alert(data.message);
     if(data.success){
        location.href="login.html"
     }
});