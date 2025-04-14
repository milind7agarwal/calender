const calendar = document.getElementById("calendar");
const goalModal = document.getElementById("goalModal");
const modalDate = document.getElementById("modalDate");
const goalText = document.getElementById("goalText");
const saveGoal = document.getElementById("saveGoal");
const closeModal = document.getElementById("closeModal");

let currentDate = new Date();
let selectedDate = "";

function createCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${month + 1}-${day}`;
    const dayDiv = document.createElement("div");
    dayDiv.className = "day";
    dayDiv.innerText = day;

    const goal = localStorage.getItem(dateStr);
    if (goal && goal.includes("[DONE]")) {
      dayDiv.classList.add("done");
    }

    dayDiv.addEventListener("click", () => {
      selectedDate = dateStr;
      modalDate.innerText = `Goal for ${dateStr}`;
      goalText.value = goal ? goal.replace("[DONE]", "").trim() : "";
      goalModal.style.display = "block";
    });

    calendar.appendChild(dayDiv);
  }
}

saveGoal.addEventListener("click", () => {
  let text = goalText.value;
  if (text.trim() !== "") {
    // toggle done state if [DONE] is present
    const goal = prompt("Mark as done? Type 'yes' or leave blank");
    if (goal.toLowerCase() === "yes") {
      text = `[DONE] ${text}`;
    }
    localStorage.setItem(selectedDate, text);
  } else {
    localStorage.removeItem(selectedDate);
  }
  goalModal.style.display = "none";
  calendar.innerHTML = "";
  createCalendar();
});

closeModal.addEventListener("click", () => {
  goalModal.style.display = "none";
});

createCalendar();
