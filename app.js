

// =====Selectors====== 
const taskBtn = document.querySelector(".task-button");
const modalCont = document.querySelector(".task-modal");
const cancelBtn = document.querySelector(".cancel-btn");
const priorityColor = document.querySelectorAll(".priority-color-big");
const doneBtn = document.querySelector(".done-btn");
const mainCont = document.querySelector(".task-cont");
const textArea = document.querySelector(".text-area");
const priorityContainer = document.querySelector(".priority-container");
const priorityColorSmall = document.querySelectorAll(".priority-color-small");
const taskItem = document.querySelectorAll(".task-item");
// console.log(selectColor);

// =====Global variables====
let priority = ['high', 'medium', 'low', 'no-priority'];
let selectPriority = priority[priority.length - 1];
let lockStatus = true;
let contentEdit = false;
let taskArr = [];
// ===========================Modal======================//
taskBtn.addEventListener("click", (e) => {
    // Display modal
    console.log("Clicked on the button");
    modalCont.style.display = "flex";
    mainCont.classList.toggle("blur")
})

cancelBtn.addEventListener("click", (e) => {
    // hide modal
    modalCont.style.display = "none";
    mainCont.classList.toggle("blur")
})

// Select priority
priorityColor.forEach((element, idx) => {
    // priorityColor.forEach(element)

    element.addEventListener("click", (e) => {
        priorityColor.forEach(em => {
            em.classList.remove("active");

        })
        selectPriority = priority[idx];
        e.target.classList.add("active");

    })
});

// ==========================Create tasks=======================//
doneBtn.addEventListener("click", (e) => {
    createTask(selectPriority, textArea.value, true);
    setModalDefault();
    mainCont.classList.toggle("blur")
})

function setModalDefault() {
    modalCont.style.display = "none";
    textArea.value = "";
    selectPriority = priority[priority.length - 1];
    priorityColor.forEach(em => {
        em.classList.remove("active");

    })

    priorityColor[priorityColor.length - 1].classList.add("active");
}

function createTask(selectPriority, task, newTask = true, id = Date.now(), completed = false) {

    let taskCont = document.createElement("div");
    taskCont.setAttribute("class", "task-item");
    taskCont.innerHTML = `
                                <div class="priority-task ${selectPriority}">
                                </div>
                                <div class="task">
                                    ${task}
                                </div>
                                <div class="action-btns">
                                    <i class="fas fa-check completed"></i>
                                    <i class="far fa-trash-alt delete"></i>
                                    <i class="fas fa-pen edit"></i>
                                    <i class="fas fa-circle color ${selectPriority}"></i>

                                    
                                </div>
                                <div class="lock ${id}">
                                    <i class="fas fa-lock lock-icon "></i>
                                </div>`;
    if (newTask) {
        taskArr.push({ selectPriority, task, id, completed });
    }
    mainCont.appendChild(taskCont);
    // console.log(taskArr)
}

// ==================================Task Item==============================



mainCont.addEventListener('click', (e) => {
    //==========lock unlock feature=================//

    if (e.target.classList.contains('lock-icon')) {
        // console.log(e);


        // console.log(e.target.parentElement.parentElement.parentElement);

        if (lockStatus) {
            e.target.classList.add('fa-lock-open');
            e.target.parentElement.previousElementSibling.style.display = 'flex';
            lockStatus = false;
        } else {

            e.target.classList.remove('fa-lock-open')
            // console.log("lock Icon");
            e.target.parentElement.previousElementSibling.style.display = 'none';
            lockStatus = true;
            e.target.parentElement.parentElement.children[1].setAttribute('contenteditable', 'false');
        }
    }

    //================completed feature==================

    else if (e.target.classList.contains('completed')) {
        let targetId = e.target.parentElement.nextElementSibling.classList[1];
        console.log(targetId);
        e.target.parentElement.parentElement.style.display = 'none';
        taskArr.forEach((el, idx) => {
            // console.log(el.id)
            if (el.id == targetId) {
                el.completed = !el.completed;
            }
        })
    }

    // ============= Delete feature=====================
    else if (e.target.classList.contains('delete')) {
        let targetId = e.target.parentElement.nextElementSibling.classList[1];
        // console.log('targid',targetId)
        e.target.style.color = 'red';
        setTimeout(() => {
            e.target.parentElement.parentElement.remove();
        }, 500);
        taskArr.forEach((el, idx) => {
            // console.log(el.id)
            if (el.id == targetId) {
                taskArr.splice(idx, 1);
            }
        })

    }

    //============= Edit feature========================
    else if (e.target.classList.contains('edit')) {
        let targetId = e.target.parentElement.nextElementSibling.classList[1];
        contentEdit = !contentEdit;
        if (contentEdit) {
            e.target.style.color = 'red';
            e.target.parentElement.previousElementSibling.setAttribute('contenteditable', 'true');
        }
        else {
            e.target.style.color = '';
            e.target.parentElement.previousElementSibling.setAttribute('contenteditable', 'false');
            taskArr.forEach((el, idx) => {
                // console.log(el.id)
                if (el.id == targetId) {
                    el.task = textArea.value;
                }
            })
        }


    }
    // =========== Color fetature
    else if (e.target.classList.contains('color')) {
        let targetId = e.target.parentElement.nextElementSibling.classList[1];

        // console.log('I am color');
        let color = e.target.classList[3];
        console.log(color);
    
          colorIndex = priority.indexOf(color);
        if (colorIndex == 3) {
            colorIndex = -1;
        } 
        e.target.parentElement.parentElement.children[0].classList.remove(color);
        e.target.classList.remove(color);

        e.target.parentElement.parentElement.children[0].classList.add(priority[colorIndex + 1]);
        e.target.classList.add(priority[colorIndex + 1]);
        taskArr.forEach((el, idx) => {
            // console.log(el.id)
            if (el.id == targetId) {
                el.selectPriority = priority[colorIndex + 1];
            }
        })
    }
})

//=============================== Sorting by color========================
priorityContainer.addEventListener('click', (e) => {
        if(e.target.classList.contains("priority-color-small")){
            priorityColorSmall.forEach(em => {
                em.classList.remove("active");
    
            })
            e.target.classList.add("active");

            mainCont.textContent = null;
    if(e.target.classList.contains('all')){
        taskArr.forEach(el => {
            if (!el.completed) {
                createTask(el.selectPriority, el.task, false, el.id, el.completed);
            }
        })

    }
    else if (e.target.classList.contains('complete')) {
        taskArr.forEach(el => {
            if (el.completed) {
                createTask(el.selectPriority, el.task, false, el.id, el.completed);
            }
        })

    } else {
        const targetPriority = e.target.classList[1];

        taskArr.forEach(el => {
            if ((el.selectPriority === targetPriority) && (!el.completed)) {
                createTask(el.selectPriority, el.task, false, el.id, el.completed)
            }
        })

    }
        }
        






})