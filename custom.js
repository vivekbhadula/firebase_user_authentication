let globalQIndex = 0;
window.globalQIndex = globalQIndex;

let questionIndex = globalQIndex + 1;

const submitModal = new bootstrap.Modal(document.getElementById('submitModal'), {})

function showQuestion(index) {
    let questions = document.querySelectorAll(".question");
    questions.forEach((q, i) => {
        if (i == index) {
            q.style.display = "block";
        }
        else q.style.display = "none";
    });
};

function incrementIndex(){
    if (globalQIndex + 1 > 4) {
        globalQIndex = 0;
    } else {
        submitModal.hide();
        globalQIndex = globalQIndex + 1;        
    }
    showQuestion(globalQIndex)
}

showQuestion(0);



