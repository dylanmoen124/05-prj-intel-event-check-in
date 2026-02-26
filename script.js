const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const customAlert = document.getElementById("customAlert");
const customAlertMessage = document.getElementById("customAlertMessage");
const customAlertClose = document.getElementById("customAlertClose");

// Track attendance
let count = 0;
const maxCount = 50;

// track progress bar

function showCustomAlert(message) {
  customAlertMessage.textContent = message;
  customAlert.classList.add("show");
  customAlertClose.focus();
}

function hideCustomAlert() {
  customAlert.classList.remove("show");
}

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

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;

  console.log(name, team, teamName);

  // increment count

  count++;
  console.log("Total check-ins:", count);

  const percentage = Math.round((count / maxCount) * 100);
  console.log("Progress: " + percentage + "%");

  // update team counter

  const teamCounter = document.getElementById(team + "Count");
  teamCounter.textContent = parseInt(teamCounter.textContent) + 1;

  // welcome message
  const message = `Welcome, ${name} from ${teamName}! You have successfully checked in.`;
  console.log(message);

  form.reset();

  showCustomAlert(message);
});
