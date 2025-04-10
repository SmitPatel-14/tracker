const goals = ['wakeup', 'workout', 'read', 'lesssm', 'study'];
const tbody = document.getElementById("tracker-body");
const reportBox = document.getElementById("progressReport");
let notifiedDays = JSON.parse(localStorage.getItem("notifiedDays") || "[]");

// Quotes
const quotes = [
  "Discipline is the bridge between goals and accomplishment.",
  "Push yourself, no one else is going to do it for you.",
  "The pain you feel today will be the strength you feel tomorrow.",
  "Small daily improvements lead to stunning results.",
  "Success is not for the lazy."
];

// Build the table
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

// Checkbox listeners
goals.forEach(goal => {
  for (let i = 1; i <= 21; i++) {
    const id = `day${i}_${goal}`;
    document.getElementById(id).addEventListener('change', (e) => {
      localStorage.setItem(id, e.target.checked);
      updateProgressReport();
    });
  }
});

// Save name
function saveUsername() {
  const nameInput = document.getElementById('usernameInput');
  const container = document.getElementById('nameContainer');
  if (nameInput.value.trim()) {
    localStorage.setItem("username", nameInput.value.trim());
    container.style.display = 'none';
    updateProgressReport();
  }
}

// Notification button
const notifyBtn = document.getElementById('notifyBtn');
if (notifyBtn) {
  notifyBtn.addEventListener('click', () => {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          alert("Notifications enabled!");
          notifyBtn.style.display = 'none';
        } else {
          alert("Notifications denied.");
        }
      });
    }
  });
}

// Report update + notification
function updateProgressReport() {
  let completeDays = 0;
  const newNotifiedDays = [...notifiedDays];
  const name = localStorage.getItem("username") || "champ";

  for (let i = 1; i <= 21; i++) {
    let allChecked = true;
    for (const goal of goals) {
      const id = `day${i}_${goal}`;
      if (localStorage.getItem(id) !== 'true') {
        allChecked = false;
        break;
      }
    }

    if (allChecked) {
      completeDays++;
      if (!notifiedDays.includes(i)) {
        const quote = quotes[Math.floor(Math.random() * quotes.length)];
        const message = `🎉 Great job, ${name}, on completing Day ${i}!\n"${quote}"`;

        if (Notification.permission === 'granted') {
          new Notification("Daily Achievement Unlocked!", {
            body: message,
            icon: 'gicon.png',
            badge: 'icons/icon-192.png'
          });
        }
        newNotifiedDays.push(i);
      }
    }
  }

  localStorage.setItem("notifiedDays", JSON.stringify(newNotifiedDays));
  notifiedDays = newNotifiedDays;

  let message = `<strong>Progress:</strong> ${completeDays} / 21 days fully completed.`;
  if (completeDays === 21) {
    message += `<br><span class="reward">🎉 You’ve completed all 21 days! Stay disciplined!</span>`;
  }
  reportBox.innerHTML = message;
}

// Show quote
const quoteBox = document.getElementById("quote");
function showRandomQuote() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteBox.innerText = `"${quote}"`;
}
showRandomQuote();
setInterval(showRandomQuote, 10000);

// Install button
let deferredPrompt;
const installBtn = document.getElementById('installBtn');
if (installBtn) {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = 'block';
  });

  installBtn.addEventListener('click', () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(choiceResult => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        }
        deferredPrompt = null;
        installBtn.style.display = 'none';
      });
    }
  });
}

// Init
window.addEventListener('DOMContentLoaded', () => {
  const savedName = localStorage.getItem("username");
  if (savedName) {
    const nameContainer = document.getElementById('nameContainer');
    if (nameContainer) nameContainer.style.display = 'none';
  }
  updateProgressReport();
});
