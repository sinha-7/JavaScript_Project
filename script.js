let task = [];
document.addEventListener("DOMContentLoaded", () => {
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

  const reminderTime = new Date();
  const [hours, minutes] = time.split(":");
  reminderTime.setHours(hours);
  reminderTime.setMinutes(minutes);
  reminderTime.setSeconds(0);

  const now = new Date();
  const timeDifference = reminderTime.getTime() - now.getTime();

  if (timeDifference < 0) {
    alert("The selected time is in the past. Please choose a future time.");
    return;
  } else {
    if (day && time && activity) {
      const taskData = {
        activity: activity,
        day: day,
        time: time,
      };
      task.push(taskData);
    }
    saveData();
    displayTask(task);
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
function saveData() {
  localStorage.setItem("task", JSON.stringify(task));
}

//load data from Local Storage
function loadData() {
  const storedData = localStorage.getItem("task");
  if (storedData) {
    task = JSON.parse(storedData);
    displayTask(task);
  }
}

function startTime() {
  var today = new Date();
  var hr = today.getHours();
  var min = today.getMinutes();
  var sec = today.getSeconds();
  ap = (hr < 12) ? "<span>AM</span>" : "<span>PM</span>";
  hr = (hr == 0) ? 12 : hr;
  hr = (hr > 12) ? hr - 12 : hr;
  //Add a zero in front of numbers<10
  hr = checkTime(hr);
  min = checkTime(min);
  sec = checkTime(sec);
  document.getElementById("clock").innerHTML = hr + ":" + min + ":" + sec + " " + ap;
  
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var curWeekDay = days[today.getDay()];
  var curDay = today.getDate();
  var curMonth = months[today.getMonth()];
  var curYear = today.getFullYear();
  var date = curWeekDay+", "+curDay+" "+curMonth+" "+curYear;
  document.getElementById("date").innerHTML = date;
  
  var time = setTimeout(function(){ startTime() }, 500);
}
function checkTime(i) {
  if (i < 10) {
      i = "0" + i;
  }
  return i;
}
