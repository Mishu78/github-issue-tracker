const loginBtn=document.getElementById('login-btn');
loginBtn.addEventListener('click',function(){
//1.get the username
const inputName=document.getElementById("input-name");
const username=inputName.value;
console.log(username);
//2.get the password
const inputPassword=document.getElementById("input-password");
const password=inputPassword.value; 
console.log(password);
//3.math username and password
if(username=="admin" && password=="admin123"){
    alert('login success');

    window.location.assign("./home.html");
}
else{
    alert("login failed");
    return;
}
//true::alert>homepage
//false::alert>return
});