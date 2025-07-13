// The JavaScript code fixed to restore the display of MCQs and other content, 
// while keeping the requested features (fixed timer, total questions count, and status display above the footer).

let currQ = 0, score = 0, answers = [];
const totalQ = questions.length; // Accessing 'questions' defined in index.html

// Set time to half minute per question
let timerInterval;
let timeLeft = Math.floor(totalQ * 0.5 * 60); // 0.5 min per question, in seconds

// --- Global variable for the dedicated status container near the footer ---
let statusContainer; 

// Format time mm:ss
function formatTime(t) {
  const m = Math.floor(t/60), s = t%60;
  return `${m<10?'0':''}${m}:${s<10?'0':''}${s}`;
}

// Timer
function startTimer() {
  document.getElementById('timer').textContent = "समय: " + formatTime(timeLeft);
  timerInterval = setInterval(()=>{
    timeLeft--;
    document.getElementById('timer').textContent = "समय: " + formatTime(timeLeft);
    if(timeLeft<=0) {
      clearInterval(timerInterval);
      showResult();
    }
  },1000);
}

// Function to update Question Status with Attempted, Remaining, Correct, and Incorrect counts
// This function now updates the 'statusContainer' element inserted above the footer.
function updateQuestionStatus() {
  const attempted = currQ;
  const remaining = totalQ - currQ;
  const correct = score;
  const incorrect = attempted - correct;

  // Format the status text including all requested information
  const statusText = `
    Questions's Status: ${attempted} Attempted, ${remaining} Remaining<br>
    correct: ${correct}, incorrect: ${incorrect}
  `;
  
  // Update the HTML content of the dedicated status container (if it exists)
  if (statusContainer) {
    statusContainer.innerHTML = statusText;
    
    // Add/maintain basic styling for visibility
    statusContainer.style.textAlign = 'center';
    statusContainer.style.fontWeight = 'bold';
    statusContainer.style.padding = '10px 0';
  }
}

// Display Total Question Count 
function displayQuestionCount() {
    const header = document.querySelector('.container h1');
    const questionCountElement = document.createElement('div');
    questionCountElement.id = 'question-count-display';
    questionCountElement.style.padding = '10px 0';
    questionCountElement.style.textAlign = 'center';
    questionCountElement.style.fontWeight = 'bold';
    questionCountElement.style.backgroundColor = '#f0f0f0';
    questionCountElement.style.borderRadius = '5px';
    questionCountElement.style.marginBottom = '10px';
    questionCountElement.textContent = `कुल प्रश्न: ${totalQ}`;

    if (header && header.parentNode) {
        header.parentNode.insertBefore(questionCountElement, header.nextSibling);
    }
}

function showQuestion() {
  // Call the status update function
  updateQuestionStatus();

  if(currQ >= totalQ) {
    showResult();
    return;
  }
  const qObj = questions[currQ];
  let html = `<div class="question-card">
    <div style="font-size:1.15em;"><b>Q${currQ+1}:</b> ${qObj.q}</div>
    <form id="optionsForm" class="options">`;
  for(let i=0;i<qObj.opts.length;i++) {
    html += `<input type="radio" id="opt${i}" name="option" value="${i}" style="display:none;">
      <label for="opt${i}" data-index="${i}">${String.fromCharCode(65+i)}. ${qObj.opts[i]}</label>`;
  }
  html += `</form>
    <button class="btn" id="nextBtn" disabled>अगला</button>
  </div>`;
  // The MCQs are loaded into test-section. This was previously broken by moving progressBarBg.
  document.getElementById('test-section').innerHTML = html;

  const form = document.getElementById('optionsForm');
  const nextBtn = document.getElementById('nextBtn');
  let answered = false;
  form.addEventListener('change', ()=>{
    if(answered) return;
    nextBtn.disabled = false;
    answered = true;
    const selected = +form.option.value;
    answers[currQ] = selected;
    const labels = form.querySelectorAll('label');
    labels.forEach(label => {
      label.classList.add('disabled-option');
    });
    const rightIdx = qObj.ans;
    if(selected === rightIdx) {
      labels[selected].classList.remove('disabled-option');
      labels[selected].classList.add('right-answer');
      score++;
    } else {
      labels[selected].classList.remove('disabled-option');
      labels[selected].classList.add('wrong-answer');
      labels[rightIdx].classList.remove('disabled-option');
      labels[rightIdx].classList.add('right-answer');
    }
  });

  nextBtn.onclick = ()=>{
    currQ++;
    showQuestion();
  };
}

function showResult() {
  clearInterval(timerInterval);
  document.getElementById('test-section').innerHTML = '';
  
  // Update the status display one last time
  updateQuestionStatus(); 

  document.getElementById('result-section').style.display = "block";
  document.getElementById('score').textContent = `${score}/${totalQ}`;
  let msg = '';
  if(score>=45) msg = "बहुत अच्छा! आप सुरक्षा में एक्सपर्ट हैं।";
  else if(score>=35) msg = "अच्छा प्रयास! थोड़ा और अभ्यास करें।";
  else msg = "अभ्यास की आवश्यकता है, कृपया पुनः प्रयास करें।";
  document.getElementById('result-msg').textContent = msg;
}

document.getElementById('restart-btn').onclick = ()=>{
  currQ=0; score=0; answers=[];
  timeLeft = Math.floor(totalQ * 0.5 * 60);
  document.getElementById('result-section').style.display = "none";
  
  // Clear status text on restart
  if (statusContainer) statusContainer.innerHTML = '';
  
  // We can optionally clear the contents of the original progress bar containers 
  // if they were used for visual bars (depends on the HTML/CSS setup)
  const progressBarBg = document.getElementById('progress-bar-bg');
  const progressBar = document.getElementById('progress-bar');
  if (progressBarBg) progressBarBg.textContent = ''; 
  if (progressBar) progressBar.style.display = 'block'; 

  startTimer(); 
  showQuestion();
};

// Initial setup and DOM manipulation
document.addEventListener('DOMContentLoaded', () => {
    // 1. Display the total question count below the header
    displayQuestionCount();

    // 2. Make the Timer Fixed
    const timerElement = document.getElementById('timer');
    if (timerElement) {
        timerElement.style.position = 'fixed';
        timerElement.style.top = '10px';
        timerElement.style.right = '10px';
        timerElement.style.backgroundColor = '#fff';
        timerElement.style.padding = '5px 10px';
        timerElement.style.zIndex = '1000'; 
        timerElement.style.border = '1px solid #ccc';
        timerElement.style.borderRadius = '5px';
    }

    // 3. Create and position the dedicated status container above the footer
    statusContainer = document.createElement('div');
    statusContainer.id = 'question-status-footer';
    
    const footer = document.querySelector('footer');

    if (statusContainer && footer) {
        // Insert the new status element just before the footer
        footer.parentNode.insertBefore(statusContainer, footer);
        statusContainer.style.position = 'relative'; // Ensure proper positioning
    }

    // 4. Start the test flow
    startTimer();
    showQuestion();
});
