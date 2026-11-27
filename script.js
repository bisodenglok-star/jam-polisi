const policeClock = document.getElementById('policeClock');
const trainClock = document.getElementById('trainClock');
const ambOrbit = document.getElementById('ambOrbit');
const motoOrbit = document.getElementById('motoOrbit');
const carOrbit = document.getElementById('carOrbit');
const steamOrbit = document.getElementById('steamOrbit');
const krlOrbit = document.getElementById('krlOrbit');
const bulletOrbit = document.getElementById('bulletOrbit');
const sirenRed = document.getElementById('sirenRed');
const sirenBlue = document.getElementById('sirenBlue');
const digital1 = document.getElementById('digital1');
const digital2 = document.getElementById('digital2');
const dateText = document.getElementById('dateText');

function addNumbers(clockEl) {
  for (let i = 1; i <= 12; i++) {
    const num = document.createElement('div');
    num.className = 'number';
    num.style.transform = `rotate(${i * 30}deg)`;
    num.innerHTML = `<span style="display:inline-block;transform:rotate(-${i * 30}deg)">${i}</span>`;
    clockEl.appendChild(num);
  }
}
addNumbers(policeClock);
addNumbers(trainClock);

let rot = null, lastSec = null;

function updateClock() {
  const now = new Date();
  const sec = now.getSeconds(), min = now.getMinutes(), hr = now.getHours();

  const hrDeg = (hr % 12) * 30 + min * 0.5;
  const minDeg = min * 6 + sec * 0.1;

  rot = (rot === null) ? sec * 6 : (sec !== lastSec ? rot + 6 : rot);
  lastSec = sec;

  // Gerakkan Jam Polisi
  ambOrbit.style.transform = `rotate(${hrDeg}deg)`;
  motoOrbit.style.transform = `rotate(${minDeg}deg)`;
  carOrbit.style.transform = `rotate(${rot}deg)`;

  // Gerakkan Jam Kereta Api
  steamOrbit.style.transform = `rotate(${hrDeg}deg)`;
  krlOrbit.style.transform = `rotate(${minDeg}deg)`;
  bulletOrbit.style.transform = `rotate(${rot}deg)`;

  // Lampu Strobo Mobil Polisi
  const isEven = sec % 2 === 0;
  sirenRed.classList.toggle('active-red', isEven);
  sirenBlue.classList.toggle('active-blue', !isEven);
  document.body.className = isEven ? 'red-glow' : 'blue-glow';

  const timeStr = `${String(hr).padStart(2,'0')}:${String(min).padStart(2,'0')}`;
  digital1.textContent = timeStr;
  digital2.textContent = timeStr;
  dateText.textContent = now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

setInterval(updateClock, 200);
updateClock();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}
