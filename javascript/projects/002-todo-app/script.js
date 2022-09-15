const taskInput = document.getElementById("task-to-add");
const addButton = document.getElementById("add-task");
const taskContainer = document.getElementById("task-container");

let taskCounter = 0;

let savedTasks = {};
// {"1":{"taskContent":"asafsdf","taskStatus":false}}
// {"1":{"taskContent":"asdflhkajshdfü","taskStatus":false},"2":{"taskContent":"asdfasdf","taskStatus":false}}
// {"1":{"taskContent":"asdfasdf","taskStatus":false},"2":{"taskContent":"asdfasdf","taskStatus":false}}

window.addEventListener("load", () => {
    if (localStorage.getItem("tasks")) {
        savedTasks = JSON.parse(localStorage.getItem("tasks"));
        taskCounter = Object.keys(savedTasks).length;
        for (const key in savedTasks) {
            taskContainer.innerHTML += createTaskHTML(
                savedTasks[key].taskContent,
                key,
                savedTasks[key].taskStatus
            );
        }
    }
});

addButton.addEventListener("click", () => {
    if (taskInput.value) {
        savedTasks[++taskCounter] = { taskContent: taskInput.value, taskStatus: false };

        taskContainer.innerHTML += createTaskHTML(taskInput.value, taskCounter);

        localStorage.setItem("tasks", JSON.stringify(savedTasks));

        taskInput.value = "";
    } else {
        const warningModal = new bootstrap.Modal(document.getElementById("warningModal"), {});
        warningModal.show();
    }
});
document.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        if (document.getElementById("warningModal").classList.toString().includes("show")) {
            document.getElementById("modal-close").click();
        } else if (taskInput.value) {
            savedTasks[++taskCounter] = { taskContent: taskInput.value, taskStatus: false };

            taskContainer.innerHTML += createTaskHTML(taskInput.value, taskCounter);

            localStorage.setItem("tasks", JSON.stringify(savedTasks));
            taskInput.value = "";
        } else {
            const warningModal = new bootstrap.Modal(document.getElementById("warningModal"), {});
            warningModal.show();
        }
    }
});

taskContainer.addEventListener("click", function (e) {
    console.log(e.target.id);
    if (e.target && e.target.id.includes("task-close")) {
        const taskID = e.target.id.replace("task-close", "");
        delete savedTasks[taskID];
        console.log(savedTasks);
        document.getElementById(`task-${taskID}`).remove();
        if (Object.keys(savedTasks).length > 0) {
            localStorage.setItem("tasks", JSON.stringify(savedTasks));
        } else {
            localStorage.removeItem("tasks");
            taskCounter = 0;
        }
    } else if (e.target && e.target.id.includes("task-")) {
        //check
        if (e.target.querySelector(`[id^="task-not-checked"]`)) {
            const taskID = e.target.id.replace("task-", "");
            const taskToCheck = document.getElementById(e.target.id);
            const task = savedTasks[taskID].taskContent;
            savedTasks[taskID].taskStatus = true;
            const tempElem = document.createElement("div");
            tempElem.innerHTML = createTaskHTML(task, taskID, true);
            localStorage.setItem("tasks", JSON.stringify(savedTasks));
            const checkedTask = tempElem.firstChild;

            taskToCheck.parentNode.replaceChild(checkedTask, taskToCheck);
        }
        //uncheck
        else {
            const taskID = e.target.id.replace("task-", "");
            const taskToUncheck = document.getElementById(e.target.id);
            const task = savedTasks[taskID].taskContent;
            savedTasks[taskID].taskStatus = false;

            const tempElem = document.createElement("div");
            tempElem.innerHTML = createTaskHTML(task, taskID, false);
            localStorage.setItem("tasks", JSON.stringify(savedTasks));
            const uncheckedTask = tempElem.firstChild;

            taskToUncheck.parentNode.replaceChild(uncheckedTask, taskToUncheck);
        }
    }
});

function createTaskHTML(task, taskNo, checked = false) {
    if (checked) {
        return `<div class="col-sm-12 col-md-12 col-lg-12 bg-success text-light rounded d-flex flex-row justify-content-between align-items-center task mt-1" id="task-${taskNo}"><div class="task-text"><span id="task-checked-${taskNo}"><i class="fa-regular fa-circle-check"></i> &nbsp;</span
    >${task}</div><button class="btn-close btn-close-white task-close" id="task-close${taskNo}"></button></div>`;
    } else {
        return `<div class="col-sm-12 col-md-12 col-lg-12 bg-danger text-light rounded d-flex flex-row justify-content-between align-items-center task mt-1" id="task-${taskNo}"><div class="task-text"><span id="task-not-checked-${taskNo}"><i class="fa-regular fa-circle"></i> &nbsp;</span
    >${task}</div><button class="btn-close btn-close-white task-close" id="task-close${taskNo}"></button></div>`;
    }
}
