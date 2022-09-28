const globalState = {
  intervalRef: null,
  currentTime: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  isCounting: false
};

const incrementTime = field => {
  let fieldRef = document.getElementById(field);
  let currentFieldValue = parseInt(fieldRef.value);
  let maxValue = parseInt(fieldRef.getAttribute('max'));

  if (currentFieldValue < maxValue)
    formatValue(field, ++currentFieldValue);

  globalState[field] = currentFieldValue;
  setCurrentTime();
};

const decrementTime = field => {
  let fieldRef = document.getElementById(field);
  let currentFieldValue = parseInt(fieldRef.value);
  let minValue = parseInt(fieldRef.getAttribute('min'));

  if (currentFieldValue > minValue)
    formatValue(field, --currentFieldValue);
  
  globalState[field] = currentFieldValue;
  setCurrentTime();
}

const setCurrentTime = () => {
  globalState.currentTime = (globalState.hours * 3600) + (globalState.minutes * 60) + globalState.seconds;
}

const startTimerCounting = () => {
  if (globalState.currentTime <= 0)
    return;
  
  globalState.isCounting = true;
  let btn = document.getElementById('start-stop');
  btn.innerHTML = 'Stop';

  globalState.intervalRef = setInterval(() => {
    let hours = parseInt(globalState.currentTime / 3600);
    let minutes = parseInt((globalState.currentTime % 3600) / 60);
    let seconds = parseInt((globalState.currentTime % 3600) % 60);

    formatValue('hours', hours);
    formatValue('minutes', minutes);
    formatValue('seconds', seconds);
    globalState.currentTime = globalState.currentTime - 1;
    validateTime();
  }, 200);
}

const stopTimerCounting = () => {
  clearInterval(globalState.intervalRef);
  globalState.isCounting = false;
  btn = document.getElementById('start-stop');
  btn.innerHTML = 'Start';
}

const resetTimerCounting = () => {
  stopTimerCounting();

  formatValue('hours', globalState.hours);
  formatValue('minutes', globalState.minutes);
  formatValue('seconds', globalState.seconds);
}

const validateTime = () => {
  if (globalState.currentTime <= -1) {
    stopTimerCounting();
    displayAlarm();
  }
}

const displayAlarm = () => {
  const alarm = new Audio("./alarm.mp3");
  alarm.play();
  setTimeout(() => alarm.pause(), 5000);
}

const formatValue = (field, value) => {
  document.getElementById(field).value = value < 10 ? '0' + value : value;
}


document.addEventListener('keyup', (event) => {
  if ((event.key === 'i' || event.key === 'I') && !globalState.isCounting)
    return startTimerCounting();
  
  if ((event.key === 'p' || event.key === 'P') && globalState.isCounting)
    return stopTimerCounting();
});