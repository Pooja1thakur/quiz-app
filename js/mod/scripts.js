
const start_btn=document.querySelector(".start_btn");
const info_box=document.querySelector(".info_box");

const exit_btn=document.querySelector(".buttons .quit");

const continue_btn =document.querySelector(".buttons .restart");
const quiz_box=document.querySelector(".quiz_box");
const result_box=document.querySelector(".result_box");
const option_list=document.querySelector(".option_list");
const timeText=document.querySelector(".timer .time_left_txt");
const timeCount=document.querySelector(".timer .timer_sec");
const time_line=document.querySelector("header .time_line");
const score_text=document.querySelector(".score_text");

start_btn.onclick=function(){
    
    info_box.classList.add("activeInfo")
}
exit_btn.onclick=function(){
    info_box.classList.remove("activeInfo");
}
continue_btn.onclick=function(){
    info_box.classList.remove("activeInfo")
    quiz_box.classList.add("activeQuiz");
    showQuestions(0);
    queCounter(1);
    startTimer(15);
    startTimerLine(0);

next_btn.classList.remove("show");

}

let que_count=0;
let userScore=0;
let que_numb=1;
let timeValue=15;
let counter=0;
let counterLine;
function showQuestions(index){
   const  que_text=document.querySelector(".que_text");
   
      let que_tag="<span>"+questions[index].numb+' '+questions[index].question+"</span>";
      let option_tag='<div class="option ">'+questions[index].options[0]+'</div>'
      +'<div class="option ">'+questions[index].options[1]+'</div>'
     +' <div class="option">'+questions[index].options[2]+'</div>'
      +'<div class="option">'+questions[index].options[3]+'</div>'


      que_text.innerHTML=que_tag;
      option_list.innerHTML=option_tag;

      const option=option_list.querySelectorAll(".option");
      
for(i=0;i<option.length;i++){
    option[i].setAttribute("onclick","optionSelected(this)");
}



}

let tickIconTag='<div class="icon tick><i class="fas-fa-check"><i/></div>'



let crossIconTag='<div class="icon cross><i class="fas-fa-times"></i></div>'

function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counter);
let userAns=answer.textContent;
let correctAns=questions[que_count].answer;
let alloptions=option_list.children.length;
if(userAns == correctAns){
    userScore+=1;
    answer.classList.add("correct");
    answer.insertAdjacentHTML("beforeend",tickIconTag);
    console.log("Correct  Answer");
    console.log("your score:"+userScore);
}
else{
    answer.classList.add("incorrect");
    answer.insertAdjacentHTML("beforeend",crossIconTag);
    console.log("wrong  Answer");
    for(i=0;i<alloptions;i++){
        if(option_list.children[i].textContent == correctAns){
            option_list.children[i].setAttribute("class","option correct");
            answer.children[i].insertAdjacentHTML("beforeend",tickIconTag);

        }
    }
}
    for(i=0;i<alloptions;i++){
        option_list.children[i].classList.add("disabled");
        next_btn.classList.add("show");
    }

}

function queCounter(index){
    let totalQueCountTag='<span><p>'+index+'</p>of <p>'+questions.length+'</p> Questions</span>'
  bottom_ques_counter.innerHTML=totalQueCountTag;
}
function startTimer(time){
    counter=setInterval(timer,1000);


    function timer(){
timeCount.textContent=time;
time--;
    if(time <0){
        timeCount.textContent=-'0'+timeCount.textContent;
    }

    if(time <0){
        clearInterval(counter);
        timeText.textContent="time off";
        const alloptions=option_list.children.length;
        let correctAns=questions[que_count].answer;
        for(i=0;i<alloptions;i++){
            if(option_list.children[i].textContent == correctAns){
                option_list.children[i].setAttribute("class","option correct");
                answer.children[i].insertAdjacentHTML("beforeend",tickIconTag);
    
            }
    }
    
    for(i=0;i<alloptions;i++){
        option_list.children[i].classList.add("disabled");
        next_btn.classList.add("show");
    }
}

}
}

function startTimerLine(time){
     counterLine = setInterval(timer,29);
     function timer() {
        time+=1;
        time_line.style.width=time+"px";
        if(time>549){
            clearInterval(counterLine);
        }
     }

}

const next_btn=document.querySelector("footer .next_btn");
const bottom_ques_counter=document.querySelector("footer .total_que");
next_btn.onclick=()=>{
    if(que_count<questions.length-1){
que_count++;
que_numb++;

showQuestions(que_count);
queCounter(que_numb);
clearInterval(counter);
startTimer(timeValue);
clearInterval(counterLine);
startTimerLine(0);
timeText.textContent='time left';
next_btn.classList.remove("show");
}
else{
    clearInterval(counter);
    clearInterval(counterLine);
showResult();
}

}
function showResult(){
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    const score_text=document.querySelector(".score_text");
    
    if(userScore>=3){
        let scoreTag='<span>and congrats,  You got '+userScore+' out of '+questions.length+'</span>'
        score_text.innerHTML=scoreTag;
    
    }
    else if(userScore>1){
        let scoreTag='<span>and nice,  You got '+userScore+' out of '+questions.length+'</span>'
        score_text.innerHTML=scoreTag;
    }
    else {
        let scoreTag='<span>and sorry,  You got '+userScore+' out of '+questions.length+'</span>'
        score_text.innerHTML=scoreTag;
    }
    
}