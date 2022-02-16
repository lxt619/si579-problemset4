// add to-do items
let tasklist = document.querySelector('#task_list');
const input = document.querySelector('input#task_description_input');
const btn = document.querySelector('#add_task');

function addTask(input, dueTime = false) {
    let newtask = document.createElement("ul");
    const dateString = new Date(dueTime)

    if (dueTime) {
        newtask.innerHTML = (input) + "<span class=due>due " + dateString.toLocaleDateString() + " " + dateString.toLocaleTimeString() +  " </span><button class='btn btn-sm btn-outline-danger done;' type=button>Done</button>";
    }
    else {
        newtask.innerHTML = (input) + " <btn class='btn btn-sm btn-outline-danger done;' type=button>Done</button>";
    }

    tasklist.appendChild(newtask);
    document.querySelector('input#duetime_input').value = '';
    document.querySelector('input#task_description_input').value = '';
    return tasklist;
};

// Making the "Add Task" button work
function dateAndTimeToTimestamp(dateInputElement, timeInputElement) {
    const dueDate = dateInputElement.valueAsNumber; // Returns the timestamp at midnight for the given date
    const dueTime = timeInputElement.valueAsNumber; // Returns the number of milliseconds from midnight to the time

    if(dueDate && dueTime) { // The user specified both a due date & due time
        //Add the timezone offset to account for the fact that timestamps are specified by UTC
        const timezoneOffset =  (new Date()).getTimezoneOffset() * 60 * 1000;
        return dueDate + dueTime + timezoneOffset;
    } else {
        // if the user did not specify both a due date and due time, return false
        return false;
    }
};

// Adding a Keyboard Shortcut
btn.addEventListener("click", event => {
    if (input.value) {
        let input = document.querySelector('input#task_description_input');
        let dueDate = document.querySelector('input#duedate_input');
        let dueTime = document.querySelector('input#duetime_input');
        let timestamp = dateAndTimeToTimestamp(dueDate, dueTime);
        addTask(input.value, timestamp)
    }
});

// Clearing the input elements after adding a new todo
input.addEventListener('keydown', event => {
    if (input.value && event.keyCode === 13) {
        let input = document.querySelector('input#task_description_input');
        let dueDate = document.querySelector('input#duedate_input');
        let dueTime = document.querySelector('input#duetime_input');
        let timestamp = dateAndTimeToTimestamp(dueDate, dueTime);
        addTask(input.value, timestamp)
    }
});

// Removing "done" tasks
function removeTask(tasklist, listItem) {
    listItem.remove();
    return tasklist;
};

tasklist.addEventListener("click", event => {
    if (event.target.classList.contains("done;")) {
         removeTask(tasklist, event.target.parentElement);
    }
});

