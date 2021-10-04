// input variables
const currentDay = moment().format('dddd, MMMM Do');
const timeBlocks = [
  { hour: "9AM", time: 9 },
  { hour: "10AM", time: 10 },
  { hour: "11AM", time: 11 },
  { hour: "12PM", time: 12 },
  { hour: "1PM", time: 13 },
  { hour: "2PM", time: 14 },
  { hour: "3PM", time: 15 },
  { hour: "4PM", time: 16 },
  { hour: "5PM", time: 17 }
];
let tasks = ["", "", "", "", "", "", "", "", ""];
function renderTimeBlocks() {
  // time block render
  $(".container").empty();
  for (let i = 0; i < timeBlocks.length; i++) {
    let taskContent = tasks[i];
    let hourName = timeBlocks[i].hour;
    let presentHour = parseInt(moment().format("HH"));
    let thisHour = timeBlocks[i].time;
    let inputElStyle = "";
    // past, present, future show
    if (thisHour < presentHour) {
      inputElStyle = "past";
    } else {
      inputElStyle = "future";
    }
    if (thisHour === presentHour) {
      inputElStyle = "present";
    }
    // time bloks show
    let timeBlockEl = $("<form>").attr("class", "input-group row");
    let hourContainer = $("<div>").attr("class", "col-2");
    let hourEl = $("<div>").attr("class", "hour").text(hourName).css("text-align", "right");
    let inputEl = $("<textarea>").attr("class", `form-control textarea ${inputElStyle}`).attr("type", "text").attr("id", "input" + i).val(taskContent);
    let buttonEl = $("<div>").attr("class", "input-group-append");
    let button = $("<button>").attr("class", "saveBtn").attr("data-index", i);
    let lockIcon = $("<i>").attr("class", "fas fa-lock");
    $(".container").append(timeBlockEl);
    button.append(lockIcon);
    buttonEl.append(button);
    hourContainer.append(hourEl);
    timeBlockEl.append(hourContainer).append(inputEl).append(buttonEl);
  }
}
// function get stored tasks from local storage
function init() {
  let storedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (storedTasks !== null) {
    tasks = storedTasks;
  }
  renderTimeBlocks();
}
// function set tasks in local storage
function storeTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
$(document).ready(function () {
  init();
  // current day show
  $("#currentDay").append(currentDay);
  $(".saveBtn").on("click", function (event) {
    event.preventDefault();
    console.log('test');
    //get the data index number after the button is clicked.
    let dataIndex = $(this).attr("data-index");
    let textInput = $(`#input${dataIndex}`).val();
    tasks.splice(dataIndex, 1, textInput);
    storeTasks();
  });
  // update time blocks
  setInterval(function () {
    presentHour = parseInt(moment().format("HH"));
    renderTimeBlocks();
  }, 300000);
})