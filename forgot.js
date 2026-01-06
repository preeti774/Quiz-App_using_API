const updatebutton=document.querySelector(".update")
const email=document.querySelector("#email")
const pass=document.querySelector("#password")
const name1=document.querySelector(".text1")
const name2=document.querySelector(".text2")
updatebutton.addEventListener("click",function(e){
    name1.innerHTML=""
    email.style.border="2px solid black"
   const useremail=email.value.trim()
   const password=pass.value
   const regex=/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/
   if(useremail==""){
   name1.innerHTML="Please enter Email"
   return;
   }
   if(password===""){
    name2.innerHTML="please enter password"
    pass.style.border="2px solid red"
   }
   else if(password.length<8){
    name2.innerHTML="please enter atleast 8 character"
    pass.style.border="2px solid red"
   }
   else if(!regex.test(password)){
    name2.innerHTML="please enter 6 character , one number and one symbol"
   }
   const savedata=JSON.parse(localStorage.getItem("key"))||[];
   const data=savedata.find((l)=>(useremail===l.email))
   if(data)
   {
      data.password=password
      localStorage.setItem("key",JSON.stringify(savedata))
      alert("Password Reset Done")
   }
   else{
    alert("Email not Matched")
    name1.innerHTML="Please enter registered email"
    email.style.border="2px solid red"
   }
})