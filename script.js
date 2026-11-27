const clocks = ['policeClock', 'trainClock', 'seaClock', 'skyClock'];
clocks.forEach(id => {
  const el = document.getElementById(id);
  for (let i = 1; i <= 12; i++) {
    const num = document.createElement('div');
    num.className = 'number';
    num.style.transform = `rotate(${i * 30}deg)`;
    num.innerHTML = `<span style="display:inline-block;transform:rotate(-${i * 30}deg)">${i}</span>`;
    el.appendChild(num);
  }
});

const orbits = {
  hr: ['ambOrbit', 'steamOrbit', 'ferryOrbit', 'blimpOrbit'].map(id => document.getElementById(id)),
  min: ['motoOrbit', 'krlOrbit', 'navyOrbit', 'heliOrbit'].map(id => document.getElementById(id)),
  sec: ['carOrbit', 'kaiOrbit', 'boatOrbit', 'jetOrbit'].map(id => document.getElementById(id))
};

const sirenRed = document.getElementById('sirenRed');
const sirenBlue = document.getElementById('sirenBlue');
const digitals = ['dig1', 'dig2', 'dig3', 'dig4'].map(id => document.getElementById(id));
const dateText = document.getElementById('dateText');

let rot = null, lastSec = null;

function updateClock() {
  const now = new Date();
  const sec = now.getSeconds(), min = now.getMinutes(), hr = now.getHours();

  const hrDeg = (hr % 12) * 30 + min * 0.5;
  const minDeg = min * 6 + sec * 0.1;

  rot = (rot === null) ? sec * 6 : (sec !== lastSec ? rot + 6 : rot);
  lastSec = sec;

  orbits.hr.forEach(el => el.style.transform = `rotate(${hrDeg}deg)`);
  orbits.min.forEach(el => el.style.transform = `rotate(${minDeg}deg)`);
  orbits.sec.forEach(el => el.style.transform = `rotate(${rot}deg)`);

  const isEven = sec % 2 === 0;
  sirenRed.classList.toggle('active-red', isEven);
  sirenBlue.classList.toggle('active-blue', !isEven);
  document.body.className = isEven ? 'red-glow' : 'blue-glow';

  const timeStr = `${String(hr).padStart(2,'0')}:${String(min).padStart(2,'0')}`;
  digitals.forEach(el => el.textContent = timeStr);
  dateText.textContent = now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

setInterval(updateClock, 200);
updateClock();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}
