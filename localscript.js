const useremail=document.querySelector("#emailname")
const pass=document.querySelector("#passwordname")
const emailpara=document.querySelector(".text")
const passpara=document.querySelector(".text2")
const loginbutton=document.querySelector("#login")
loginbutton.addEventListener("click",function(e){
  loginbutton.innerHTML="Checking..."
  loginbutton.disabled=true
  e.preventDefault();
  emailpara.innerHTML=""
   useremail.style.border="2px solid black"
     passpara.innerHTML=""
    pass.style.border="2px solid black"
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const email=useremail.value.trim().toLowerCase();
  const password=pass.value.trim();
  if(email===""){
    emailpara.innerHTML="please enter email "
    useremail.style.border="2px solid red"
    loginbutton.innerHTML="login"
        loginbutton.removeAttribute('disabled')
  }
  else if(!email.endsWith("@gmail.com")){
  emailpara.innerHTML="pleses enetr valid format "
    useremail.style.border="2px solid red"
    loginbutton.innerHTML="login"
        loginbutton.removeAttribute('disabled')
  }
  else if(password===""){
    passpara.innerHTML="please enter password "
    pass.style.border="2px solid red"
    loginbutton.innerHTML="login"
        loginbutton.removeAttribute('disabled')
    }
    else if(password.length<6){
       passpara.innerHTML="Please enter atleast 6 character "
    pass.style.border="2px solid red"
    loginbutton.innerHTML="login"
        loginbutton.removeAttribute('disabled')
    }
  else{
    auth.signInWithEmailAndPassword(email,password)
    .then((usercredential)=>{
      const user=usercredential.user;
      if(user.emailVerified){
      alert("Login Successfully! Welcome back .")
      window.location.href="quiz.html"
      }
      else{
        alert("Please verify your email first! if you have signed up")
        auth.signOut();
      }
      loginbutton.innerHTML="login"
        loginbutton.removeAttribute('disabled')
    })
    .catch((error)=>{
      if (
        error.code === "auth/invalid-credential" || 
        error.code === "auth/internal-error" || 
         error.code === "auth/user-not-found"
    ) {
         alert("login failed! if you have signed up plese check your email and password");
        useremail.style.border = "2px solid red";
        pass.style.border = "2px solid red";
        loginbutton.innerHTML="login"
        loginbutton.removeAttribute('disabled')
    } 
    else if (error.code === "auth/invalid-email") {
        emailpara.innerHTML = "Email format sahi nahi hai!";
        useremail.style.border = "2px solid red";
    }
    else {
        // Agar kuch naya error ho toh humein pata chal jaye
        alert("Login failed! Error: " + error.code);
        loginbutton.innerHTML="login"
        loginbutton.removeAttribute('disabled')
    }
    })
  }
})
const forgot=document.querySelector('#forgot')
forgot.addEventListener("click",function(e){
  e.preventDefault();
  const femail=useremail.value.trim()
  if(femail===""){
    emailpara.innerHTML="please enter email"
  }
  else{
    auth.sendPasswordResetEmail(femail)
        .then(() => {
            alert(" agr y email registered hai to Password reset link tumhare email par bhej diya gaya hai!");
        })
        .catch((error) => {
          if(error.code === "auth/user-not-found"){
                emailpara.innerHTML = "Ye email registered nahi hai!";
          }
          else{
 alert("Error: " + error.message);
          }
        });
    }
})
const googleBtn = document.querySelector(".google"); // ID check kar lena

googleBtn.addEventListener("click", (e) => {
  e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    
    // Popup ki jagah Redirect use karo
    auth.signInWithRedirect(provider);
});

// Login hone ke baad results pane ke liye ye code add karo
auth.getRedirectResult().then((result) => {
    if (result.user) {
        window.location.assign("quiz.html");
    }
}).catch((error) => {
    console.log("Redirect Error:", error.message);
})
auth.getRedirectResult()
  .then((result) => {
    if (result.user) {
        console.log("Redirect Login Success!");
        window.location.replace("quiz.html");
    }
  }).catch((error) => {
    console.error("Redirect Error:", error.message);
  });

// Ye sabse important hai: Auth state check karna
auth.onAuthStateChanged((user) => {
    if (user) {
        console.log("User active:", user.email);
        if (window.location.pathname.includes("index.html") || window.location.pathname === "/") {
            window.location.replace("quiz.html");
        }
    }
});
