const form = document.getElementById('checkInForm');
const nameInput = document.getElementById('attendeeName');
const teamSelect = document.getElementById('teamSelect');

// Track attendance 
let count = 0;
const maxCount = 50;

// track progress bar



form.addEventListener('submit', function (event) {
    event.preventDefault();
    
    const name = nameInput.value;
    const team = teamSelect.value;
    const teamName = teamSelect.selectedOptions[0].text;

    console.log(name, team, teamName); 

// increment count

    count++;
    console.log("Total check-ins:", count);

    const percentage = Math.round((count / maxCount) * 100); + '%';
    console.log('Progress: ' + percentage + '%');

    // update team counter

    const teamCounter = document.getElementById(team + 'Count');
    teamCounter.textContent = parseInt(teamCounter.textContent) + 1;

// welcome message
const message = `Welcome, ${name} from ${teamName}! You have successfully checked in.`;
console.log(message);

form.reset();
});