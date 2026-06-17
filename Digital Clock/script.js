let timeElement = document.getElementById("time");
let dateElement = document.getElementById("date");

let is24Hour = false; // consistent naming

function updateTime() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let amPm = '';

  if (!is24Hour) {
    // 12-hour format
    amPm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // 0 → 12
  }

  // Date parts
  let day = now.getDate();
  let month = now.getMonth() + 1;
  let year = now.getFullYear();

  // Leading zeros
  hours = String(hours).padStart(2, '0');
  minutes = String(minutes).padStart(2, '0');
  seconds = String(seconds).padStart(2, '0');

  // Build time string
  let timeString = is24Hour
    ? `${hours}:${minutes}:${seconds}`
    : `${hours}:${minutes}:${seconds} ${amPm}`;

  timeElement.innerText = timeString;
  dateElement.innerText = `${day}-${month}-${year}`;
}

// Toggle button
const toggleBtn = document.getElementById("toggle-btn");
toggleBtn.addEventListener("click", function () {
  is24Hour = !is24Hour;
  toggleBtn.textContent = is24Hour ? "Switch to 12-hours Format" : "Switch to 24-hour Format";
  updateTime(); // refresh immediately
});

// Run clock
updateTime();
setInterval(updateTime, 1000);





