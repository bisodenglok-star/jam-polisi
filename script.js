const clockFace = document.getElementById('clockFace');
const hourOrbit = document.getElementById('hourOrbit');
const minuteOrbit = document.getElementById('minuteOrbit');
const carOrbit = document.getElementById('carOrbit');
const sirenRed = document.getElementById('sirenRed');
const sirenBlue = document.getElementById('sirenBlue');
const miniDigital = document.getElementById('miniDigital');
const dateText = document.getElementById('dateText');

for (let i = 1; i <= 12; i++) {
  const num = document.createElement('div');
  num.className = 'number';
  num.style.transform = `rotate(${i * 30}deg)`;
  num.innerHTML = `<span style="display:inline-block;transform:rotate(-${i * 30}deg)">${i}</span>`;
  clockFace.appendChild(num);
}

let rot = null, lastSec = null;

function updateClock() {
  const now = new Date();
  const sec = now.getSeconds(), min = now.getMinutes(), hr = now.getHours();

  hourOrbit.style.transform = `rotate(${(hr % 12) * 30 + min * 0.5}deg)`;
  minuteOrbit.style.transform = `rotate(${min * 6 + sec * 0.1}deg)`;

  rot = (rot === null) ? sec * 6 : (sec !== lastSec ? rot + 6 : rot);
  lastSec = sec;
  carOrbit.style.transform = `rotate(${rot}deg)`;

  const isEven = sec % 2 === 0;
  sirenRed.classList.toggle('active-red', isEven);
  sirenBlue.classList.toggle('active-blue', !isEven);
  document.body.className = isEven ? 'red-glow' : 'blue-glow';

  miniDigital.textContent = `${String(hr).padStart(2,'0')}:${String(min).padStart(2,'0')}`;
  dateText.textContent = now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

setInterval(updateClock, 200);
updateClock();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}
