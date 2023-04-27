import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

function addLeadingZero(value) {
  return value.padStart(2, '0');
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

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < dateToday) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
});

let timeOut;
const userDateFromInput = document.querySelector('input');
const startButton = document.querySelector('button');
const daysRemains = document.querySelector('[data-days]');
const hoursRemains = document.querySelector('[data-hours]');
const minutesRemains = document.querySelector('[data-minutes]');
const secondsRemains = document.querySelector('[data-seconds]');

const dateToday = new Date(userDateFromInput.value);

startButton.addEventListener('click', onStartButton);

function onStartButton() {
  startButton.disabled = true;
  const userDate = new Date(userDateFromInput.value);
  let timeRenains = userDate - dateToday;

  timeOut = setInterval(() => {
    if (timeRenains < 0) {
      clearInterval(timeOut);
    }
    secondsRemains.textContent = addLeadingZero(
      convertMs(timeRenains).seconds.toString()
    );
    minutesRemains.textContent = addLeadingZero(
      convertMs(timeRenains).minutes.toString()
    );
    hoursRemains.textContent = addLeadingZero(
      convertMs(timeRenains).hours.toString()
    );
    daysRemains.textContent = addLeadingZero(
      convertMs(timeRenains).days.toString()
    );
    timeRenains -= 1000;
  }, 1000);
}
startButton.disabled = true;
