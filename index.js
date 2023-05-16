const addTaskForm = document.getElementById('add_task_form');
const taskNameInput = document.getElementById('task_name');
const taskList = document.getElementById('task_list');

let tasks = [];

// Load tasks from localStorage on page load
window.addEventListener("load", () => {
	let storedTasks = [];
  storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    renderTasks();
  }

});

addTaskForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent page refresh
  const taskName = taskNameInput.value.trim();
  if (taskName.length > 0) {
    addTask(taskName);
    taskNameInput.value = ""; // Clear input field
    taskNameInput.focus(); // Put focus back on input field
  }
});

function addTask(taskName) {
  tasks.push(taskName);
  localStorage.setItem("tasks", JSON.stringify(tasks));
	console.log(tasks)
  renderTasks();
}

function renderTasks() { 
	taskList.innerHTML="";
	tasks.forEach((task, index) => {
		const li = document.createElement('li');
		li.innerHTML = `${task}
		<div>
		<button data-index="${index}" class="delete_task">❌</button>
		<button data-index="${index}" ${index===0 ? 'disabled' : ''} class="up_task">🡱</button>
		<button data-index="${index}" ${index===tasks.length-1 ? 'disabled' : ''} class="down_task">🡳</button>
		</div>`;
		taskList.appendChild(li);
	});

	const deleteButtons = document.querySelectorAll('.delete_task')
	deleteButtons.forEach((button) => {
		button.addEventListener('click', () => {
			const index = button.dataset.index;
			tasks.splice(index, 1);
			localStorage.setItem("tasks", JSON.stringify(tasks));
			renderTasks();
		});
	});
	
	const moveUpButtons = document.querySelectorAll('.up_task')
	moveUpButtons.forEach((button) => {
		button.addEventListener('click', () => {
			const index = button.dataset.index;
			swapTasks(index, parseInt(index)-1);
		});
	});

	const moveDownButtons = document.querySelectorAll('.down_task')
	moveDownButtons.forEach((button) => {
		button.addEventListener('click', () => {
			const index = button.dataset.index;
			swapTasks(index, parseInt(index)+1);
		});
	});
}


function swapTasks(index1, index2) {
	[tasks[index1], tasks[index2]] = [tasks[index2], tasks[index1]]
	localStorage.setItem("tasks", JSON.stringify(tasks));
	renderTasks();
}
