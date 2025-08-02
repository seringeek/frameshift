let duration = 1500;
let interval;
const canvas = document.getElementById('progressCanvas');
const ctx = canvas.getContext('2d');
function drawProgress(percent) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(80, 80, 70, 0, Math.PI * 2);
  ctx.strokeStyle = '#eee';
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(80, 80, 70, -Math.PI / 2, (Math.PI * 2) * percent - Math.PI / 2);
  ctx.strokeStyle = '#f65f3e';
  ctx.lineWidth = 4;
  ctx.stroke();
}
function startTimer() {
  let timeLeft = duration;
  interval = setInterval(() => {
    timeLeft--;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timeDisplay').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    drawProgress(1 - timeLeft / duration);
    if (timeLeft <= 0) {
      clearInterval(interval);
    }
  }, 1000);
}
document.getElementById('startButton').addEventListener('click', () => {
  startTimer();
  document.getElementById('startButton').classList.add('hidden');
  document.getElementById('pauseButton').classList.remove('hidden');
  document.getElementById('restButton').classList.remove('hidden');
});