const taskInput = document.getElementById("task-to-add");
const addButton = document.getElementById("add-task");
const taskContainer = document.getElementById("task-container");
const warningModal = new bootstrap.Modal(document.getElementById("warningModal"), {});

let taskCounter = 0;

let savedTasks = {};

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
        taskInput.focus();
    } else {
        warningModal.show();
    }
});
document.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        if (document.getElementById("warningModal").classList.toString().includes("show")) {
            document.getElementById("modal-close").click();
        } else if (taskInput.value) {
            addButton.click();
        } else {
            warningModal.show();
        }
    }
});

taskContainer.addEventListener("click", function (e) {
    const taskElem = getParentByClass(e.target, "task");
    if (e.target && e.target.id.includes("task-close")) {
        const taskID = e.target.id.replace("task-close", "");
        delete savedTasks[taskID];
        document.getElementById(`task-${taskID}`).remove();
        if (Object.keys(savedTasks).length > 0) {
            localStorage.setItem("tasks", JSON.stringify(savedTasks));
        } else {
            localStorage.removeItem("tasks");
            taskCounter = 0;
        }
    } else if (e.target && e.target.classList.toString().includes("btn-save")) {
        const taskID = e.target.id.replace("task-edit-", "");
        const textBox = taskElem.querySelector(`#task-text-${taskID}`);
        textBox.disabled = true;

        savedTasks[taskID].taskContent = textBox.value;
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
        e.target.classList.replace("btn-save", "btn-edit");
    } else if (e.target && e.target.id.includes("task-edit")) {
        e.target.classList.replace("btn-edit", "btn-save");
        const taskID = e.target.id.replace("task-edit-", "");
        const textBox = taskElem.querySelector(`#task-text-${taskID}`);
        textBox.disabled = false;
        textBox.focus();
    } else if (!taskElem.querySelector(".btn-save")) {
        const taskID = taskElem.id.replace("task-", "");

        //check
        if (taskElem.querySelector(`[id^="task-not-checked"]`)) {
            const task = savedTasks[taskID].taskContent;
            savedTasks[taskID].taskStatus = true;
            const tempElem = document.createElement("div");
            tempElem.innerHTML = createTaskHTML(task, taskID, true);
            localStorage.setItem("tasks", JSON.stringify(savedTasks));
            const checkedTask = tempElem.firstChild;

            taskContainer.replaceChild(checkedTask, taskElem);
        }
        //uncheck
        else {
            const task = savedTasks[taskID].taskContent;
            savedTasks[taskID].taskStatus = false;

            const tempElem = document.createElement("div");
            tempElem.innerHTML = createTaskHTML(task, taskID, false);
            localStorage.setItem("tasks", JSON.stringify(savedTasks));
            const uncheckedTask = tempElem.firstChild;

            taskContainer.replaceChild(uncheckedTask, taskElem);
        }
    }
});

function createTaskHTML(task, taskNo, checked = false) {
    if (checked) {
        return `<div class="col-sm-12 col-md-12 col-lg-12 bg-success text-light rounded d-flex flex-row justify-content-between align-items-center task mt-1" id="task-${taskNo}"><div class="task-text"><span><i class="fa-regular fa-circle-check" id="task-checked-${taskNo}"></i> &nbsp;</span><input type="text" class="text-light" id="task-text-${taskNo}" disabled value="${task}"/></div><div><button class="btn-edit btn-close-white task-edit float-right" id="task-edit-${taskNo}"></button><button class="btn-close btn-close-white task-close" id="task-close${taskNo}"></button></div></div>`;
    } else {
        return `<div class="col-sm-12 col-md-12 col-lg-12 bg-danger text-light rounded d-flex flex-row justify-content-between align-items-center task mt-1" id="task-${taskNo}"><div class="task-text"><span><i class="fa-regular fa-circle" id="task-not-checked-${taskNo}"></i> &nbsp;</span><input type="text" class="text-light" id="task-text-${taskNo}" disabled value="${task}"/></div><div><button class="btn-edit btn-close-white task-edit float-right" id="task-edit-${taskNo}"></button><button class="btn-close btn-close-white task-close" id="task-close${taskNo}"></button></div></div>`;
    }
}

function getParentByClass(el, className) {
    do {
        if (el.classList.contains(className)) {
            return el;
        } else {
            el = el.parentNode;
        }
        console.log(el);
    } while (el && el.parentNode);
}
