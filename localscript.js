const email=document.querySelector("#emailname")
const pass=document.querySelector("#passwordname")
const login=document.querySelector("#login")
const name2=document.querySelector(".text")
const name3=document.querySelector(".text2")
login.addEventListener("click",function(e){
  e.preventDefault();
  const useremail=email.value.trim().toLowerCase();
  const first=[name2,name3]
  const second=[email,pass]
  first.forEach((l)=>{
    l.innerHTML=""
  })
  second.forEach((l)=>{
    l.style.border="2px solid black"
  })
  const regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(useremail===""){
   name2.innerHTML="please enter email"
   email.style.border="2px solid red"
   return;
  }
  else if(!regex.test(useremail)){
  name2.innerHTML="please enter valid email format"
   email.style.border="2px solid red"
   return ;
  }
  const userpass=pass.value
  const regexpass=/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/
  if(userpass===""){
    name3.innerHTML="please enter password";
   pass.style.border="2px solid red"
   return;
  }
  else if(userpass.length<8){
    name3.innerHTML="please enter atleast 8 character";
   pass.style.border="2px solid red"
   return;
  }
  else if(!regexpass.test(userpass)){
    name3.innerHTML="please enter 6 alphabets , one symbol and one number";
   pass.style.border="2px solid red"
   return;
  }
 if(name2.innerHTML===""&&name3.innerHTML===""){
   const savedata=JSON.parse(localStorage.getItem("key"))||[]
   const final=savedata.find((l)=>(useremail===l.email&&userpass===l.password))
   const final2=savedata.find((l)=>(useremail===l.email))
   if(final){
    alert("Login Successfully");
    window.location.href="quiz.html"
   }
   else if(final2){
    name3.innerHTML="please enter  correct password";
   pass.style.border="2px solid red"
   }
   else{
    alert("Please Signed Up")
   }
 }
})
