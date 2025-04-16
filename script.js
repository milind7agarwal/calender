let gameseq=[];
let userseq=[];

let btns = ["yellow","red","green","purple"]

let started=false;
let level = 0;

let h2 =document.querySelector("h2");

document.addEventListener("keypress" , function(){
    if(started == false){
        console.log("Game is started");
        started = true

        levelUp();
    }
})   

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash")
    },100);
}

function levelUp() {
    userseq=[];
    level++;
    h2.innerText = `level ${level}`;

    let randIdx = Math.floor(Math.random()*3)
    let randColor = btns[randIdx];
    let randBtn=document.querySelector(`.${randColor}`)
    gameseq.push(randColor)
    btnFlash(randBtn);
}

function checkAns(){
   let idx = level-1;

   if(userseq[idx] === gameseq[idx]){
    if(userseq.length === gameseq.length){
        setTimeout(levelUp,1000)
    }
   }else{
    h2.innerHTML= `Game Over! YOUR SCORE WAS <B> ${level}</B>`
    reset();
   }
}

function btnPress() {
    let btn = this;
    btnFlash(btn)

    userColor= btn.getAttribute("id");
    userseq.push(userColor);

    checkAns(userseq.length-1);
}

let allBtns = document.querySelectorAll(".btn")
for (btn of allBtns){
    btn.addEventListener("click", btnPress)
}

function reset(){
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}