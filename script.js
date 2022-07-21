//Inicial data
let currentQuestion = 0; // Qual é a questão atual
let correctAnswer = 0

showQuestion();

//Events

document.querySelector('.scoreArea button').addEventListener('click', resetEvent)

//Functions
function showQuestion() {
    if(questions[currentQuestion]) {
        let q = questions[currentQuestion];

        let pct = Math.floor((currentQuestion / questions.length) * 100); // para barrinha de rolagem
        document.querySelector('.progress--bar').style.width = `${pct}%`

        document.querySelector('.scoreArea').style.display = 'none' //Apagar o score
        document.querySelector('.questionArea').style.display = 'block' //Aparecer a area da pergunta

        document.querySelector('.question').innerHTML = q.question; //Aparecer a pergunta
        document.querySelector('.options').innerHTML = ''; //Limpar as questões antes de aparecer

        let optionsHtml = ''; // Montou a manipulação no DOM
        for(let i in q.options) {
            optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i)+1}</span>${q.options[i]}</div>`; //parseInt para transformar i de string para inteiro
        }

        document.querySelector('.options').innerHTML = optionsHtml; // Inseriu as alternativas

        document.querySelectorAll('.options .option').forEach(item => { 
            item.addEventListener('click', optionClickEvent);// Gerou o evento de clique nas alternativas
        });

    } else { //Quando acaba as questões
        finishQuiz();
    }
}

function optionClickEvent(e) {
    let clickedOption = parseInt(e.target.getAttribute('data-op')); //variavel para descobrir onde clicou

    if(questions[currentQuestion].answer === clickedOption) { //comparar se o que clicou é o certo
        correctAnswer++;
    } 

    currentQuestion++;
    showQuestion();
}

function finishQuiz() {
    let points = Math.floor((correctAnswer / questions.length) * 100)

    if(points < 30) {
        document.querySelector('.scoreText1').innerHTML = "Tá ruim hein";
        document.querySelector('.scorePct').style.color = "#FF0000"
    } else if (points >=30 && points < 70) {
        document.querySelector('.scoreText1').innerHTML = "Tá melhorando";
        document.querySelector('.scorePct').style.color = "#FFFF00"
    } else if (points >= 70) {
        document.querySelector('.scoreText1').innerHTML = "MUITO BOM!!!";
        document.querySelector('.scorePct').style.color = "0D630D"
    }

    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
    document.querySelector('.scoreText2').innerHTML = `Voce respondeu ${questions.length} questões e acertou ${correctAnswer}`;

    document.querySelector('.scoreArea').style.display = 'block' //Aparecer o score
    document.querySelector('.questionArea').style.display = 'none' //Apagar a area da pergunta
    document.querySelector('.progress--bar').style.width = `100%`
}

function resetEvent() {
    correctAnswer = 0;
    currentQuestion = 0;
    canClick = true;
    showQuestion();
}