const goals = ['wakeup', 'workout', 'read', 'lesssm', 'nopm'];
const tbody = document.getElementById("tracker-body");
const reportBox = document.getElementById("progressReport");

function updateProgressReport() {
  let completeDays = 0;

  for (let i = 1; i <= 21; i++) {
    let allChecked = true;
    for (const goal of goals) {
      const id = `day${i}_${goal}`;
      if (localStorage.getItem(id) !== 'true') {
        allChecked = false;
        break;
      }
    }
    if (allChecked) completeDays++;
  }

  let message = `<strong>Progress:</strong> ${completeDays} / 21 days fully completed.`;
  if (completeDays === 21) {
    message += `<br><span class="reward">🎉 You’ve completed all 21 days! Stay disciplined!</span>`;
  }
  reportBox.innerHTML = message;
}

for (let i = 1; i <= 21; i++) {
  const row = document.createElement("tr");
  let rowHTML = `<td class="sticky-col">Day ${i}</td>`;
  goals.forEach(goal => {
    const id = `day${i}_${goal}`;
    const checked = localStorage.getItem(id) === 'true' ? 'checked' : '';
    rowHTML += `<td><input type="checkbox" id="${id}" ${checked}></td>`;
  });
  row.innerHTML = rowHTML;
  tbody.appendChild(row);
}

goals.forEach(goal => {
  for (let i = 1; i <= 21; i++) {
    const id = `day${i}_${goal}`;
    document.getElementById(id).addEventListener('change', (e) => {
      localStorage.setItem(id, e.target.checked);
      updateProgressReport();
    });
  }
});

const quotes = [
  "Discipline is the bridge between goals and accomplishment.",
  "Push yourself, no one else is going to do it for you.",
  "The pain you feel today will be the strength you feel tomorrow.",
  "Small daily improvements lead to stunning results.",
  "Success is not for the lazy."
];

const quoteBox = document.getElementById("quote");
function showRandomQuote() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteBox.innerText = `"${quote}"`;
}

showRandomQuote();
setInterval(showRandomQuote, 10000);
updateProgressReport();
