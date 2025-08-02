let duration = 1500; // 25 minutes in seconds
let timeLeft = duration;
let interval;
let isRunning = false;
let isPaused = false;

const canvas = document.getElementById('progressCanvas');
const ctx = canvas.getContext('2d');
const timeDisplay = document.getElementById('timeDisplay');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');

function drawProgress(percent) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw background circle
  ctx.beginPath();
  ctx.arc(80, 80, 70, 0, Math.PI * 2);
  ctx.strokeStyle = '#eee';
  ctx.lineWidth = 4;
  ctx.stroke();

  // Draw progress with individual strips based on minutes
  const totalMinutes = Math.ceil(duration / 60);
  const minutesCompleted = Math.floor((duration - timeLeft) / 60);
  const currentMinuteProgress = ((duration - timeLeft) % 60) / 60;
  
  // Draw completed minute strips
  for (let i = 0; i < minutesCompleted; i++) {
    const startAngle = (i / totalMinutes) * Math.PI * 2 - Math.PI / 2;
    const endAngle = ((i + 1) / totalMinutes) * Math.PI * 2 - Math.PI / 2;
    
    ctx.beginPath();
    ctx.arc(80, 80, 70, startAngle, endAngle);
    ctx.strokeStyle = '#f65f3e';
    ctx.lineWidth = 4;
    ctx.stroke();
  }
  
  // Draw current minute progress
  if (minutesCompleted < totalMinutes) {
    const startAngle = (minutesCompleted / totalMinutes) * Math.PI * 2 - Math.PI / 2;
    const endAngle = startAngle + (currentMinuteProgress / totalMinutes) * Math.PI * 2;
    
    ctx.beginPath();
    ctx.arc(80, 80, 70, startAngle, endAngle);
    ctx.strokeStyle = '#f65f3e';
    ctx.lineWidth = 4;
    ctx.stroke();
  }
}

function updateTimeDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    isPaused = false;
    
    interval = setInterval(() => {
      timeLeft--;
      updateTimeDisplay();
      drawProgress((duration - timeLeft) / duration);
      
      if (timeLeft <= 0) {
        clearInterval(interval);
        isRunning = false;
        // Play ding sound or show completion notification
        resetToInitialState();
      }
    }, 1000);
    
    // Update button visibility
    startButton.classList.add('hidden');
    pauseButton.classList.remove('hidden');
    resetButton.classList.remove('hidden');
  }
}

function pauseTimer() {
  if (isRunning) {
    clearInterval(interval);
    isRunning = false;
    isPaused = true;
    
    // Update button text and visibility
    startButton.textContent = 'Resume';
    startButton.classList.remove('hidden');
    pauseButton.classList.add('hidden');
  }
}

function resetTimer() {
  clearInterval(interval);
  isRunning = false;
  isPaused = false;
  timeLeft = duration;
  
  updateTimeDisplay();
  drawProgress(0);
  resetToInitialState();
}

function resetToInitialState() {
  startButton.textContent = 'Start';
  startButton.classList.remove('hidden');
  pauseButton.classList.add('hidden');
  resetButton.classList.add('hidden');
}

// Event listeners
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

// Initialize the timer display and progress circle
updateTimeDisplay();
drawProgress(0);