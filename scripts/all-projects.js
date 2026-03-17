// Clock

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

// Navigation

let selectedChannel = 0;
let maxChannels = 12;

const leftArrow = document.getElementById("left-arrow");
const rightArrow = document.getElementById("right-arrow");

let channelContainer = document.getElementById("channels");
let channels = Array.from(document.getElementById("channel-container").children);
let gridHeight = 3;
let gridWidth = 1;

let fullPages = channels.length / (gridHeight * gridWidth);
let emptyChannels = [];

const emptyChannel = document.createElement("div");
emptyChannel.classList.add("channel");

setupChannels();
updatePosition(0);

addEventListener("resize", (event) => {
  setupChannels();
  updatePosition(0);
});

console.log(emptyChannels)

function scrollChannelsLeft(){
  if(selectedChannel>0){
    selectedChannel--;  
    updatePosition(selectedChannel);
  }
}
  
function scrollChannelsRight(){
  if(selectedChannel<=fullPages-1){
      selectedChannel++;
    updatePosition(selectedChannel);
  }
}


function updatePosition(position) {
  for(i=0;i<fullPages+1;i++){
    const element = document.getElementById("channel-container-"+i);
    element.classList.remove("channel-container-right", "channel-container-left");
    if(i<position){
      element.classList.add("channel-container-left");
    }
    if(i>position){
      element.classList.add("channel-container-right");
    }
  }

  leftArrow.classList.add("hidden-arrow");
  rightArrow.classList.add("hidden-arrow");

  if(selectedChannel>0){
    leftArrow.classList.remove("hidden-arrow");
  }
  if(selectedChannel<=fullPages-1){
    rightArrow.classList.remove("hidden-arrow");
  }
}

function setupChannels() {
  selectedChannel = 0;

  gridHeight = 3;
  gridWidth = 4;

  if (window.innerWidth <= 500) {
    gridWidth = 1;
  } else if (window.innerWidth <= 850) {
    gridWidth = 2;
  } else if (window.innerWidth <= 1200) {
    gridWidth = 3;
  }
  maxChannels = gridWidth * gridHeight
  fullPages = Math.floor(channels.length / maxChannels);

  emptyChannels = [];
  for ( let i=0; i<fullPages+1; i++) {
    if( i<fullPages ) {
      emptyChannels.push(0);
      continue;
    }
    emptyChannels.push( maxChannels - channels.length % maxChannels );
  }

  channelContainer.innerHTML='';

  let lastElement = 0;
  for (i=0; i<emptyChannels.length; i++){
    const newContainer = document.createElement("div");
    newContainer.classList.add("channel-container", "channel-container-right");
    newContainer.setAttribute("id", "channel-container-"+i);

    for(j = 0; j<maxChannels; j++){
      if(channels[lastElement]){
        newContainer.appendChild(channels[lastElement]);
      }
      lastElement++;
    }

    for(j = 0; j<emptyChannels[i]; j++) {
      newContainer.appendChild(emptyChannel.cloneNode());
    }

    channelContainer.appendChild(newContainer);
  }

  document.getElementById("channel-container-0").classList.remove("channel-container-right");
}