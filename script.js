// Topic: Get references to HTML elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const attendeeCount = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");
const greeting = document.getElementById("greeting");
const waterCountElement = document.getElementById("waterCount");
const zeroCountElement = document.getElementById("zeroCount");
const powerCountElement = document.getElementById("powerCount");
const customAlert = document.getElementById("customAlert");
const customAlertMessage = document.getElementById("customAlertMessage");
const customAlertClose = document.getElementById("customAlertClose");

// Topic: Track attendance data
let count = 0;
const maxCount = 50;
const totalCountStorageKey = "intelCheckInTotalCount";
const waterCountStorageKey = "intelCheckInWaterCount";
const zeroCountStorageKey = "intelCheckInZeroCount";
const powerCountStorageKey = "intelCheckInPowerCount";

// Topic: Show a success message (custom popup)

function showCustomAlert(message) {
  customAlertMessage.textContent = message;
  customAlert.classList.add("show");
  customAlertClose.focus();
}

function hideCustomAlert() {
  customAlert.classList.remove("show");
}

// Topic: Read a number from local storage
function getStoredNumber(storageKey, fallbackNumber) {
  const storedValue = localStorage.getItem(storageKey);
  const parsedNumber = parseInt(storedValue);

  if (Number.isNaN(parsedNumber)) {
    return fallbackNumber;
  }

  return parsedNumber;
}

// Topic: Update the progress bar from current count
function updateProgressBarFromCount() {
  const percentage = Math.round((count / maxCount) * 100);
  const cappedPercentage = Math.min(percentage, 100);
  progressBar.style.width = `${cappedPercentage}%`;
}

// Topic: Save attendance data to local storage
function saveAttendanceData() {
  localStorage.setItem(totalCountStorageKey, count);
  localStorage.setItem(waterCountStorageKey, waterCountElement.textContent);
  localStorage.setItem(zeroCountStorageKey, zeroCountElement.textContent);
  localStorage.setItem(powerCountStorageKey, powerCountElement.textContent);
}

// Topic: Load attendance data from local storage
function loadAttendanceData() {
  count = getStoredNumber(totalCountStorageKey, 0);
  attendeeCount.textContent = count;

  waterCountElement.textContent = getStoredNumber(waterCountStorageKey, 0);
  zeroCountElement.textContent = getStoredNumber(zeroCountStorageKey, 0);
  powerCountElement.textContent = getStoredNumber(powerCountStorageKey, 0);

  updateProgressBarFromCount();
}

// Topic: Find the winning team at goal (supports ties)
function getWinningTeamNames() {
  const waterCount = parseInt(waterCountElement.textContent);
  const zeroCount = parseInt(zeroCountElement.textContent);
  const powerCount = parseInt(powerCountElement.textContent);

  const highestCount = Math.max(waterCount, zeroCount, powerCount);
  const winningTeams = [];

  if (waterCount === highestCount) {
    winningTeams.push("Team Water Wise");
  }

  if (zeroCount === highestCount) {
    winningTeams.push("Team Net Zero");
  }

  if (powerCount === highestCount) {
    winningTeams.push("Team Renewables");
  }

  return winningTeams;
}

// Topic: Format team names for display
function formatWinningTeams(teamNames) {
  if (teamNames.length === 1) {
    return teamNames[0];
  }

  if (teamNames.length === 2) {
    return `${teamNames[0]} and ${teamNames[1]}`;
  }

  const lastTeamName = teamNames[teamNames.length - 1];
  const firstTeams = teamNames.slice(0, teamNames.length - 1);

  return `${firstTeams.join(", ")}, and ${lastTeamName}`;
}

// Topic: Show celebration message when goal is reached
function showGoalCelebration() {
  const winningTeamNames = getWinningTeamNames();
  const winningTeamsText = formatWinningTeams(winningTeamNames);

  greeting.innerHTML = `🎉 Goal reached! Winning team(s): <strong>${winningTeamsText}</strong>!`;
  greeting.classList.add("success-message");
  greeting.style.display = "block";
}

loadAttendanceData();

customAlertClose.addEventListener("click", function () {
  hideCustomAlert();
});

customAlert.addEventListener("click", function (event) {
  if (event.target === customAlert) {
    hideCustomAlert();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && customAlert.classList.contains("show")) {
    hideCustomAlert();
  }
});

// Topic: Listen for a form submission and run code
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Topic: Get the values from an input and a dropdown
  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;

  console.log(name, team, teamName);

  // Topic: Increment a total and store it in a variable

  count++;
  console.log("Total check-ins:", count);

  // Topic: Show the updated total count on the page
  attendeeCount.textContent = count;

  // Topic: Calculate the percentage of a goal completed
  const percentage = Math.round((count / maxCount) * 100);
  console.log("Progress: " + percentage + "%");

  // Topic: Update the width of a progress bar using a percentage
  updateProgressBarFromCount();

  // Topic: Update the correct team's count on the page

  const teamCounter = document.getElementById(team + "Count");
  teamCounter.textContent = parseInt(teamCounter.textContent) + 1;

  // Topic: Save counts so they persist after refresh
  saveAttendanceData();

  // Topic: Combine a name and team into a welcome message
  const message = `Welcome, ${name} from ${teamName}! You have successfully checked in.`;
  console.log(message);

  // Topic: Reset the form after it's submitted
  form.reset();

  // Topic: Show a success message with someone's name and team
  showCustomAlert(message);

  if (count === maxCount) {
    showGoalCelebration();
  }
});
