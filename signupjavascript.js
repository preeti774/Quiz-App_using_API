const name=document.querySelector('#name')
const email=document.querySelector("#emailname")
const pass=document.querySelector("#passwordname")
const confirms=document.querySelector("#confirmname")
const signup=document.querySelector("#signup")
const name1=document.querySelector(".name1")
const name2=document.querySelector(".text")
const name3=document.querySelector(".text2")
const name4=document.querySelector(".text3")
signup.addEventListener("click",function(e){
  e.preventDefault()
  const first=[name1,name2,name3,name4]
  const second=[name,email,pass,confirms]
  first.forEach((l)=>{
    l.innerHTML=""
  })
  second.forEach((l)=>{
    l.style.border="2px solid black"
  })
  const username=name.value.trim()
  if(username.length<3||username===""){
   name1.innerHTML="please enter a valid name";
   name.style.border="2px solid red"
   return;
  }
  const useremail=email.value.trim().toLowerCase();
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
    name3.innerHTML="please enter atleast one character and one number";
   pass.style.border="2px solid red"
   return;
  }
  const userconfirm=confirms.value
  if(userconfirm===""){
   name4.innerHTML="please enter confirm password";
  confirms.style.border="2px solid red"
  return;
  }
  else if(userconfirm!=userpass){
    name4.innerHTML="please enter correct password";
  confirms.style.border="2px solid red"
  return;
  } 
  if(name1.innerHTML===""&&name2.innerHTML===""&&name3.innerHTML===""&&name4.innerHTML==="")
  {
    const localdata=JSON.parse(localStorage.getItem("key"))||[];
  const final=localdata.find((l)=>(useremail===l.email))
  if(final){
    alert("This email is already Registered ! Please login")
    return;
  }
  else{
    const userobj={
      email:useremail,
      password:userpass
    }
    localdata.push(userobj)
    localStorage.setItem("key",JSON.stringify(localdata))
    alert("Signup successfully")
    second.forEach((l)=>{
      l.value="";
    })
  }
}
})
