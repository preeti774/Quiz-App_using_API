const signbutt=document.querySelector("#signup")
const name=document.querySelector("#name")
const email=document.querySelector("#emailname")
const password=document.querySelector("#passwordname")
const conpass=document.querySelector("#confirmname")
const passtext=document.querySelector(".text2")
const nametext=document.querySelector(".name1")
const emailtext=document.querySelector(".text")
const conpasstext=document.querySelector(".text3")
signbutt.addEventListener("click",function(e){
  e.preventDefault();
    emailtext.innerHTML=""
    nametext.innerHTML=""
   passtext.innerHTML=""
   conpasstext.innerHTML=""
   password.style.border="2px solid black"
   conpass.style.border="2px solid black"
name.style.border="2px solid black"
email.style.border="2px solid black"
   const regexname=/^[A-Za-z\s]+$/;
   const regexemail=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const username=name.value.trim();
  const useremail=email.value.trim().toLowerCase();
  const userpass=password.value.trim();
  const userconpass=conpass.value.trim();
  if(username===""||useremail===""||userpass===""||userconpass===""){
    alert("Please enter all details")
  }
  else if((!regexname.test(username))||username.length<3){
nametext.innerHTML="Please enter valid name"
name.style.border="2px solid red"
  }
  else if(!regexemail.test(useremail)){
 emailtext.innerHTML="Plese enter valid email format"
 email.style.border="2px solid red"
  }
  else if(!useremail.endsWith("@gmail.com")){
    emailtext.innerHTML="Plese enter a valid @gmail.com address"
 email.style.border="2px solid red"
  }
   else if(userpass.length<6){
passtext.innerHTML="Please enter atleast 6 characters"
password.style.border="2px solid red"
  }
 else if(userpass!==userconpass){
conpasstext.innerHTML="Please enter correct password"
conpass.style.border="2px solid red"
}
else{
   auth.createUserWithEmailAndPassword(useremail,userpass)
   .then((userCredential)=>{
    userCredential.user.sendEmailVerification().then(()=>{
     alert("Signup successfully ! ek link bhja hai us pr confirm krlo")
     window.location.href="index.html";
    })
   })
    .catch((error)=>{
   alert("Error"+error)
    })
  }
})