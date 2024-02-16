let globalQIndex = 0;
window.globalQIndex = globalQIndex;

let questionIndex = globalQIndex + 1;

const submitModal = new bootstrap.Modal(document.getElementById('submitModal'), {});
const toast = new bootstrap.Toast(document.getElementById('liveToast'), {});
let answersSubmitIndex = [];

function showQuestion(index) {
    let questions = document.querySelectorAll(".question");
    questions.forEach((q, i) => {
        if (i == index) {
            q.style.display = "block";
        }
        else q.style.display = "none";
    });
};

function submitAnswer(index) {
    let question = Array.from(document.querySelectorAll(".question")).filter( (q, i) => i === index)[0];
    let answers = question.querySelectorAll('.answer-box input[type="radio"]');
    let checkIfAnswered = Array.from(answers).filter( (a, i) => a.checked === true);
    if (checkIfAnswered.length == 0) {
        toast.show();
        return -1;
    }
    answers.forEach((answer, answerIndex) => {
        if (answer.checked) {
            answersSubmitIndex.push(answerIndex + 1);
        }
    });
};

function incrementIndex(){
    if (globalQIndex + 1 > 4) {
        globalQIndex = 0;
    } else {
        let submitResult = submitAnswer(globalQIndex);
        if (submitResult == -1) return;
        globalQIndex = globalQIndex + 1;       
    }
    submitModal.hide();
    showQuestion(globalQIndex)
}

showQuestion(0);



