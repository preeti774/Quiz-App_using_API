const button=document.querySelector(".all")
const nextbutton=document.querySelector(".last")
const data=document.querySelector("#question")
const allbutton=document.querySelectorAll(".button")
const message=document.querySelector(".message")
const time=document.querySelector(".time")
let quizarr=[];
async function quizapp(){
    let  response=await fetch("https://opentdb.com/api.php?amount=20&category=18&difficulty=medium&type=multiple")
    response  = await response.json()
     quizarr=response.results.map((item)=>{
    let arrdata=[
        {
            text:item.correct_answer,
            correct:true
        },
        ...item.incorrect_answers.map((ans)=>({
                text:ans,
                correct:false
            }))
    ]
    arrdata.sort(()=>(Math.random()-0.5));
    return{
        question:item.question,
        answer:arrdata
    }
    })
    startquiz()
}
quizapp()
let currentindex=0;
score=0;
function startquiz(){
    if(currentindex==(quizarr.length-1))
    {
        nextbutton.innerHTML="Finish"
        showfunction()
    }
    else{
     nextbutton.innerHTML="Next"
    showfunction()
    }
   
}
function showfunction(){
   let currently= quizarr[currentindex];
   data.innerHTML=`${currentindex+1}. ${currently.question}`
   currently.answer.forEach((item,index)=>{
   allbutton[index].innerHTML=item.text;
   allbutton[index].dataset.correct=item.correct;
   })
}
button.addEventListener("click",function(e){
   if(e.target.tagName==="BUTTON")
    {
    if(e.target.dataset.correct==="true")
    {
        e.target.style.border="2px solid green"
        e.target.style.backgroundColor="#9fddb9ff"
        score++;
    }
    else
    {
        e.target.style.border="2px solid red"
        e.target.style.backgroundColor="#ecb2b2ff"
        allbutton.forEach((item)=>{
        if(item.dataset.correct==="true")
        {
                item.style.border="2px solid green"
                item.style.backgroundColor="#9fddb9ff"
        }
        })
    }
    allbutton.forEach((l)=>{
        l.setAttribute("disabled","")
    })
    }
})
nextbutton.addEventListener("click",function(e){
    if(nextbutton.innerHTML==="Play Again"){
        location.reload();
        return;
    }
    currentindex++;
    allbutton.forEach((l)=>{
     l.removeAttribute("style")
     l.removeAttribute("disabled")
    })
    if(currentindex<quizarr.length){
      startquiz()
    }
    else{
        endgame()
    }
})
let timeleft=300;
let t=setInterval(function(){
  let minutes=Math.floor(timeleft/60);
  let seconds=timeleft%60;
  time.innerHTML=`${minutes<10?'0':""}${minutes}:${seconds<10?'0':""}${seconds}`
  if(timeleft<=0){
    endgame()
  }
  else{
    timeleft--;
  }
},1000)
function endgame(){
    data.innerHTML=`${score} out of ${quizarr.length}`
        if(score===quizarr.length){
            message.innerHTML="Outstanding! 🏆"
            confetti({
                particleCount:300,
                spread:70,
                angle:60,
                origin:{x:0,y:1}
            })
            confetti({
                particleCount:300,
                spread:70,
                angle:120,
                origin:{x:1,y:1}
            })
        }
        else if(score>(quizarr.length/2)){
            message.innerHTML= "Good job! 👍"
            confetti({
                particleCount:40,
                spread:20,
                angle:60,
                origin:{x:0,y:1}
            })
            confetti({
                particleCount:40,
                spread:20,
                angle:120,
                origin:{x:1,y:1}
            })
        }
        else{
            message.innerHTML=" Keep Learning! 📚 Practice makes perfect "
        }
     button.innerHTML=""
     nextbutton.innerHTML="Play Again"
     clearInterval(t)
}