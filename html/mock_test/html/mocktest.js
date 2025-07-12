let currQ = 0, score = 0, answers = [];
const totalQ = questions.length; // Accessing 'questions' defined in index.html

// Set time to half minute per question
let timerInterval;
let timeLeft = Math.floor(totalQ * 0.5 * 60); // 0.5 min per question, in seconds

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

// Progress bar
function updateProgressBar() {
  const percent = ((currQ)/totalQ)*100;
  document.getElementById('progress-bar').style.width = percent+"%";
}

function showQuestion() {
  updateProgressBar();
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
  document.getElementById('progress-bar').style.width = "100%";
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
  timeLeft = Math.floor(totalQ * 0.5 * 60); // Reset timer dynamically
  document.getElementById('result-section').style.display = "none";
  startTimer(); showQuestion();
};

// Initial
// The script runs immediately after the HTML content (including the 'questions' variable) is loaded.
startTimer();
showQuestion();
