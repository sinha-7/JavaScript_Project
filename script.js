let task = [];
document.addEventListener('DOMContentLoaded', () => {
loadData();
});
let taskAddButton = document.getElementById("taskAddButton");

//function for adding task
taskAddButton.addEventListener("click", () => {
  let day = document.getElementById("day").value;
  let time = document.getElementById("time").value;
  let activity = document.getElementById("activity").value;
  if (!time) {
    alert("Please select a time.");
    return;
  }
  if (day && time && activity) {
    const taskData = {
      activity: activity,
      day: day,
      time: time,
    };
    task.push(taskData);
    // console.log(task)
  }
  saveData();
  displayTask(task);
  const reminderTime = new Date();
  const [hours, minutes] = time.split(":");
  reminderTime.setHours(hours);
  reminderTime.setMinutes(minutes);
  reminderTime.setSeconds(0);

  const now = new Date();
  const timeDifference = reminderTime.getTime() - now.getTime();

  if (timeDifference < 0) {
    alert(
      "The selected time is in the past. Please choose a future time."
    );
    return;
  }

  setTimeout(() => {
  document.getElementById("sound").play();
    alert(`Time for: ${activity}`);
  }, timeDifference);

  alert(`Reminder set for ${activity} on ${day} at ${time}`);
});

//display data
function displayTask(tasks) {
  let taskDetails = document.getElementById("task-details");
  taskDetails.innerHTML = "";
  task.forEach((tasks, index) => {
    let row = document.createElement("tr");
    row.innerHTML = `<td>${tasks.activity}</td>
                      <td>${tasks.day}</td>
                      <td>${tasks.time}</td>
                      <td><button id="delete" onclick="deleteItem(${index})">&#10008</button></td>`;
    taskDetails.appendChild(row);
  });
}

//delete data from array
function deleteItem(index) {
  task.splice(index, 1);
  saveData();
  displayTask(task);
  // alert("Task Deleted")
}

//save data in Local Storage
function saveData(){
  localStorage.setItem("task",JSON.stringify(task))
}

//load data from Local Storage
function loadData() {
const storedData = localStorage.getItem('task');
if (storedData) {
  task = JSON.parse(storedData);
  displayTask();
}
}

function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('txt').innerHTML =  h + ":" + m + ":" + s;
    setTimeout(startTime, 1000);
  }
  
  function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
  }