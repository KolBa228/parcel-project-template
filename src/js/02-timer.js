import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
// import Notiflix from 'notiflix';

const startButton = document.querySelector('button[data-start]');
const timerValues = document.querySelectorAll('.value');
let timerId = null;

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

startButton.addEventListener('click', (e) => {
  const selectedDate = new Date(e.target.dataset.date);
  const currentDate = Date.now();
  if (selectedDate < currentDate) {
    clearInterval(timerId);
    return;
  }
  timerId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = selectedDate - currentTime;
    const timeLeft = convertMs(deltaTime);
    timerValues[0].textContent = addLeadingZero(timeLeft.days);
    timerValues[1].textContent = addLeadingZero(timeLeft.hours);
    timerValues[2].textContent = addLeadingZero(timeLeft.minutes);
    timerValues[3].textContent = addLeadingZero(timeLeft.seconds);
    if (deltaTime <= 0) clearInterval(timerId);
  }, 1000);
});

flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate < Date.now()) {
      window.alert("Please choose a date in the future");
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
      startButton.dataset.date = selectedDate;
    }
  },
});