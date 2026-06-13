const classForm = document.getElementById("classForm");
const scheduleList = document.getElementById("scheduleList");
const alertMessage = document.getElementById("alertMessage");

let classes = [];

classForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const className = document.getElementById("className").value.trim();
  const startTime = document.getElementById("startTime").value;
  const endTime = document.getElementById("endTime").value;

  // Validation: End time must be after start time
  if (endTime <= startTime) {
    alertMessage.textContent = "❌ End time must be later than start time.";
    return;
  }

  // Check for conflicts
  const conflict = classes.some(cls => 
    (startTime < cls.end && endTime > cls.start)
  );

  if (conflict) {
    alertMessage.textContent = "⚠️ Conflict detected! Time slot overlaps with another class.";
    return;
  }

  // Add class if valid
  const newClass = { name: className, start: startTime, end: endTime };
  classes.push(newClass);

  const li = document.createElement("li");
  li.textContent = `${className} — ${startTime} to ${endTime}`;
  scheduleList.appendChild(li);

  alertMessage.textContent = "";
  classForm.reset();
});
