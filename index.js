const taskinput = document.getElementById("taskinput");
const addbtn = document.getElementById("addbtn");
const tasklist = document.getElementById("tasklist");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

document.addEventListener("DOMContentLoaded", rendertask);

addbtn.addEventListener("click", ()=>{
    const task = taskinput.value.trim();
    if (task ==="" ) return;

    tasks.push({ text: task, completed: false });
    savetask();
    rendertask();

    taskinput.value ="";
});


function rendertask(){
    tasklist.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        
        li.classList.toggle("completed", task.completed);   
        li.innerHTML = `
      <span>${task.text}</span>
      <span class="remove">X</span>
    `;

        li.addEventListener("click", () => toggleTask(index));

    li.querySelector(".remove").addEventListener("click", (e) => {
      e.stopPropagation(); // impede marcar como concluído
      deleteTask(index);
    });

    tasklist.appendChild(li);
    });

}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  savetask();
  rendertask();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  savetask();
  rendertask();
}

function savetask() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
