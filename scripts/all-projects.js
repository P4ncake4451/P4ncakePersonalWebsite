const hourElement = document.getElementById("hour");
const dateElement = document.getElementById("date");

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let showColon = true;

function updateClock() {
  const now = new Date();

  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const isPM = hours >= 12;
  hours = hours % 12 || 12;
  hours = hours.toString().padStart(2, "\u00A0")

  const colon = showColon ? ":" : "\u00A0";
  showColon = !showColon;

  hourElement.textContent = `${hours}${colon}${minutes}${isPM?"㏘":"㏂"}`;

  const dayName = days[now.getDay()];
  const month = now.getMonth() + 1;
  const day = now.getDate();

  dateElement.textContent = `${dayName} ${month}/${day}`;
}

updateClock();
setInterval(updateClock, 1000);