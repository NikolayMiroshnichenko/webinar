function getTimeRemaining(endtime) {
  let t = Date.parse(endtime) - Date.parse(new Date());
  let seconds = Math.floor((t / 1000) % 60);
  let minutes = Math.floor((t / 1000 / 60) % 60);
  let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  let days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    total: t,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
}

function initializeClock(id, endtime) {
  let clock = document.getElementById(id);
  let daysSpan = clock.querySelector(".days");
  let hoursSpan = clock.querySelector(".hours");
  let minutesSpan = clock.querySelector(".minutes");
  let secondsSpan = clock.querySelector(".seconds");

  function updateClock() {
    let t = getTimeRemaining(endtime);

    if (t.total <= 0) {
      localStorage.clear();
      clearInterval(timeinterval);

      startTimer();
    }

    daysSpan.innerHTML = t.days;

    daysSpan.innerHTML = ("0" + t.days).slice(-2);
    hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
    minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
    secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);
  }

  let timeinterval = setInterval(updateClock, 1000);
  updateClock();
}

function startTimer() {
  let deadline = new Date(Date.parse(new Date()) + 300000);

  const items = localStorage.getItem("data");

  if (!items) {
    localStorage.setItem("data", deadline);
    initializeClock("countdown", localStorage.data);
  }

  initializeClock("countdown", localStorage.data);
}

startTimer();
