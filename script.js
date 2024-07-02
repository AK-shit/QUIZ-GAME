const questions = [
    {
        question: "1. Who is the MC of One Piece?",
        options: ["A. Naruto", "B. Luffy", "C. Dio", "D. Your mom"],
        answer: "B"
    },
    {
        question: "2. Junji Ito is known for making what genre of manga?",
        options: ["A. Comedy", "B. Moe", "C. Horror", "D. Action"],
        answer: "C"
    },
    {
        question: "3. Who is the mangaka of Berserk?",
        options: ["A. Eiichiro Oda", "B. Hirihiko Araki", "C. Kentaro Miura", "D. Tatsuki Fujimoto"],
        answer: "C"
    },
    {
        question: "4. IS THAT A JOJO REFERENCE?",
        options: ["A. Yes", "B. Yes", "C. Yes", "D. Yes"],
        answer: "A"
    },
    {
        question: "5. Best waifu?",
        options: ["A. Speedwagon", "B. Megumin", "C. Rias", "D. Emilia"],
        answer: "A"
    }
];

let currentQuestion = 0;
let score = 0;

const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const questionContainer = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const nextButton = document.getElementById('next-button');
const scoreDisplay = document.getElementById('score');

function startQuiz() {
    startScreen.style.display = 'none';
    showQuestion();
    quizScreen.style.display = 'block';
}

function showQuestion() {
    const current = questions[currentQuestion];
    questionContainer.textContent = current.question;

    optionsContainer.innerHTML = '';
    current.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(button));
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedButton) {
    const selectedOption = selectedButton.textContent.charAt(0); // Extract option letter
    const correctOption = questions[currentQuestion].answer;

    if (currentQuestion === 3) { // Question 4 (index 3)
        // Mark selected option as correct
        selectedButton.classList.add('correct');
        score++;
    } else {
        if (selectedOption === correctOption) {
            selectedButton.classList.add('correct');
            score++;
        } else {
            selectedButton.classList.add('incorrect');
            // Find the correct answer button and highlight it
            optionsContainer.childNodes.forEach(button => {
                if (button.textContent.charAt(0) === correctOption) {
                    button.classList.add('correct');
                }
            });
        }
    }

    // Disable all buttons after selection
    optionsContainer.childNodes.forEach(button => {
        button.disabled = true;
    });

    // Show next button
    nextButton.style.display = 'block';
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
        // Reset button styles
        nextButton.style.display = 'none';
        optionsContainer.childNodes.forEach(button => {
            button.disabled = false;
            button.classList.remove('correct', 'incorrect');
        });
    } else {
        showResult();
    }
}

function showResult() {
    quizScreen.style.display = 'none';
    resultScreen.style.display = 'block';
    scoreDisplay.textContent = `You scored ${score} out of ${questions.length}`;
}

function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    resultScreen.style.display = 'none';
    startScreen.style.display = 'block';
}
