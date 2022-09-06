const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');

// Current day
let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

// Adding 10 days to current day
const futureDate = new Date(tempYear, tempMonth, tempDay + 10, 11, 30, 0)

// Divide futureDate into single values of year, month, day, etc.
const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();
const month = months[futureDate.getMonth()];
const monthday = futureDate.getDate();
const weekday = weekdays[futureDate.getUTCDay()];

// Text of when countdown will end
giveaway.textContent = `giveaway ends on ${weekday}, ${monthday} ${month} ${year} ${hours}:${minutes}.`

// future time in ms
const futureTime = futureDate.getTime(); 

// countdown of remaining time
function getRemainingTime(){
  // todays date in ms
  const today = new Date().getTime();
  // diffrence between futureDate and current date
  const t = futureTime - today;

  const oneDay = 24*60*60*1000;
  const oneHour = 60*60*1000;
  const oneMinute = 60*1000;

  // Getting and rounding exact values
  let days = Math.floor(t / oneDay);
  let hours = Math.floor((t % oneDay) / oneHour);
  let minutes = Math.floor((t % oneHour)/ oneMinute);
  let seconds = Math.floor((t % oneMinute)/ 1000);

  // set values arrays
  const values = [days, hours, minutes, seconds];

  // Add 0 in front of single numbers
  function format(item){
    if(item < 10){
      return item = `0${item}`
    }
    return item
  }

  // Setting value for each time square
  items.forEach(function(item, index){
    item.innerHTML = format(values[index]);
  })
  // Message when countdown ends
  if (t < 0){
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class=expired>Sorry, this giveaway has expired</h4>`
  }
}

// countdown every second
let countdown = setInterval(getRemainingTime, 1000);

// Invoke function
getRemainingTime();