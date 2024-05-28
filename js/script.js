// Selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

// Adding event listeners for start, exit, and continue buttons
start_btn.onclick = () => {
    info_box.classList.add("activeInfo"); // Show info box
}

exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); // Hide info box
}

continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); // Hide info box
    quiz_box.classList.add("activeQuiz"); // Show quiz box
    showQuetions(0); // Calling showQestions function
    queCounter(1); // Passing 1 parameter to queCounter
    startTimer(90); // Calling startTimer function
    startTimerLine(0); // Calling startTimerLine function
}

let timeValue = 90;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

restart_quiz.onclick = () => {
    quiz_box.classList.add("activeQuiz"); // Show quiz box
    result_box.classList.remove("activeResult"); // Hide result box
    timeValue = 90;
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); // Calling showQestions function
    queCounter(que_numb); // Passing que_numb value to queCounter
    clearInterval(counter); // Clear counter
    clearInterval(counterLine); // Clear counterLine
    startTimer(timeValue); // Calling startTimer function
    startTimerLine(widthValue); // Calling startTimerLine function
    timeText.textContent = "Time Left"; // Change the text of timeText to Time Left
    next_btn.classList.remove("show"); // Hide the next button
}

quit_quiz.onclick = () => {
    window.location.reload(); // Reload the current window
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

next_btn.onclick = () => {
    if (que_count < questions.length - 1) { // If question count is less than total question length
        que_count++; // Increment the que_count value
        que_numb++; // Increment the que_numb value
        showQuetions(que_count); // Calling showQestions function
        queCounter(que_numb); // Passing que_numb value to queCounter
        clearInterval(counter); // Clear counter
        clearInterval(counterLine); // Clear counterLine
        startTimer(timeValue); // Calling startTimer function
        startTimerLine(widthValue); // Calling startTimerLine function
        timeText.textContent = "Time Left"; // Change the timeText to Time Left
        next_btn.classList.remove("show"); // Hide the next button
    } else {
        clearInterval(counter); // Clear counter
        clearInterval(counterLine); // Clear counterLine
        showResult(); // Calling showResult function
    }
}

// Global object to store the number of times each option is selected
var optionSelectionCount = {
    option1: 0,
    option2: 0,
    option3: 0,
    option4: 0
};

function showQuetions(index) {
    const que_text = document.querySelector(".que_text");
    let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
    let option_tag = '<div class="option"><span>' + questions[index].options[0] + '</span></div>'
        + '<div class="option"><span>' + questions[index].options[1] + '</span></div>'
        + '<div class="option"><span>' + questions[index].options[2] + '</span></div>'
        + '<div class="option"><span>' + questions[index].options[3] + '</span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;

    const option = option_list.querySelectorAll(".option");

    for (i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';

function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    userScore++; // Incrementing user score
    optionSelectionCount["option" + (questions[que_count].options.indexOf(userAns) + 1)]++; // Incrementing count for the selected option

    answer.classList.add("correct");
    answer.insertAdjacentHTML("beforeend", tickIconTag);
    
    for (i = 0; i < option_list.children.length; i++) {
        option_list.children[i].classList.add("disabled");
    }
    next_btn.classList.add("show");
}

function showResult() {
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    const scoreText = result_box.querySelector(".score_text");

    let scoreTag = "<span>Option Selection Count</span><ul>";
    scoreTag += `<li>Analyse : ${optionSelectionCount.option1}</li>`;
    scoreTag += `<li>Algebre : ${optionSelectionCount.option2}</li>`;
    scoreTag += `<li>Proba_Stat : ${optionSelectionCount.option3}</li>`;
    scoreTag += `<li> Recherche Opérationnelle : ${optionSelectionCount.option4}</li>`;
    scoreTag += "</ul>";

    scoreText.innerHTML = scoreTag;
}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time;
        time--;
        if (time < 9) {
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if (time < 0) {
            clearInterval(counter);
            timeText.textContent = "Time Off";
            const allOptions = option_list.children.length;
            let correcAns = questions[que_count].answer;
            for (i = 0; i < allOptions; i++) {
                if (option_list.children[i].textContent == correcAns) {
                    option_list.children[i].setAttribute("class", "option correct");
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for (i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled");
            }
            next_btn.classList.add("show");
        }
    }
}

function startTimerLine(time) {
    counterLine = setInterval(timer, 233);
    function timer() {
        time += 1;
        time_line.style.width = time + "px";
        if (time > 549) {
            clearInterval(counterLine);
        }
    }
}

function queCounter(index) {
    let totalQueCounTag = '<span><p>' + index + '</p> of <p>' + questions.length + '</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;
}

