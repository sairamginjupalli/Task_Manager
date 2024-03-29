// Function to add a new task
function addTask() {
    var taskName = document.getElementById("taskName").value.trim();
    var deadline = document.getElementById("deadline").value.trim();

    // Validate task name
    if (taskName === "") {
        alert("Please enter a task name.");
        return;
    }

    // Validate deadline
    if (deadline === "") {
        alert("Please select a deadline for the task.");
        return;
    }

    // Add task if input is valid
    var task = {
        name: taskName,
        deadline: deadline
    };

    var taskList = JSON.parse(localStorage.getItem("tasks")) || [];
    taskList.push(task);
    localStorage.setItem("tasks", JSON.stringify(taskList));

    displayTasksSorted();
}

// Function to delete a task
function deleteTask(index) {
    var taskList = JSON.parse(localStorage.getItem("tasks")) || [];
    taskList.splice(index, 1); // Remove task at the specified index
    localStorage.setItem("tasks", JSON.stringify(taskList));
    displayTasksSorted();
}

// Function to update the timer for tasks
function updateTimer(index, timeDifference) {
    var timerElement = document.getElementById("timer-" + index);
    var intervalId = setInterval(function() {
        var hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        timerElement.textContent = hours + "h " + minutes + "m " + seconds + "s";

        timeDifference -= 1000;
        if (timeDifference < 0) {
            clearInterval(intervalId);
            timerElement.textContent = "Expired";
            // Optionally, you can add additional logic here for tasks that expire
        }
    }, 1000);
}

// Function to display tasks sorted by time left
function displayTasksSorted() {
    var taskList = JSON.parse(localStorage.getItem("tasks")) || [];
    
    // Sort tasks based on time left
    taskList.sort(function(a, b) {
        var deadlineTimeA = new Date(a.deadline).getTime();
        var deadlineTimeB = new Date(b.deadline).getTime();
        var currentTime = new Date().getTime();
        
        var timeLeftA = deadlineTimeA - currentTime;
        var timeLeftB = deadlineTimeB - currentTime;
        
        return timeLeftA - timeLeftB;
    });
    
    var tableBody = document.getElementById("taskList");
    tableBody.innerHTML = "";

    taskList.forEach(function(task, index) {
        var row = tableBody.insertRow();
        var nameCell = row.insertCell(0);
        var deadlineCell = row.insertCell(1);
        var actionCell = row.insertCell(2);

        nameCell.textContent = task.name;

        var deadlineTime = new Date(task.deadline).getTime();
        var currentTime = new Date().getTime();
        var timeDifference = deadlineTime - currentTime;

        if (timeDifference > 0) {
            if (timeDifference < 86400000) { // Less than a day
                var timer = document.createElement("span");
                timer.setAttribute("id", "timer-" + index);
                deadlineCell.appendChild(timer);
                updateTimer(index, timeDifference);
            } else {
                var days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                var hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                var timeLeft = days + "d " + hours + "h " + minutes + "m";
                deadlineCell.textContent = timeLeft;
            }
        } else {
            deadlineCell.textContent = "Expired";
        }

        var deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteButton.classList.add("delete-icon"); // Add the delete-icon class
        deleteButton.onclick = function() {
            deleteTask(index);
        };
        actionCell.classList.add("action-cell");
        actionCell.appendChild(deleteButton);
        
        
    });
}

// Call the function to display sorted tasks when the page loads
displayTasksSorted();
