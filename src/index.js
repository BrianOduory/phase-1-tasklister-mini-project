document.addEventListener('DOMContentLoaded', () => {
  const taskForm = document.getElementById('create-task-form');
  
  let tasksContainer = document.getElementById('tasks');
  if (!tasksContainer) {
    tasksContainer = document.createElement('div');
    tasksContainer.id = 'tasks';
    document.body.appendChild(tasksContainer);
    
    const tasksHeading = document.createElement('h2');
    tasksHeading.textContent = 'My Tasks';
    tasksContainer.before(tasksHeading);
  }
  
  let prioritySelect = document.getElementById('task-priority');
  if (!prioritySelect) {
    const priorityLabel = document.createElement('label');
    priorityLabel.setAttribute('for', 'task-priority');
    priorityLabel.textContent = 'Priority: ';
    prioritySelect = document.createElement('select');
    prioritySelect.id = 'task-priority';
    prioritySelect.name = 'task-priority';
    
    const priorities = [
      { value: 'low', text: 'Low', color: 'green' },
      { value: 'medium', text: 'Medium', color: 'orange' },
      { value: 'high', text: 'High', color: 'red' }
    ];
    
    priorities.forEach(priority => {
      const option = document.createElement('option');
      option.value = priority.value;
      option.textContent = priority.text;
      prioritySelect.appendChild(option);
    });
    
    const submitButton = taskForm.querySelector('input[type="submit"]');
    taskForm.insertBefore(priorityLabel, submitButton);
    taskForm.insertBefore(prioritySelect, submitButton);
    
    const spacer = document.createElement('br');
    taskForm.insertBefore(spacer, submitButton);
  }
  taskForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const taskInput = document.getElementById('new-task-description');
    const priorityInput = document.getElementById('task-priority');
    
    const taskDescription = taskInput.value.trim();
    const taskPriority = priorityInput.value;
    
    if (taskDescription !== '') {
      addTask(taskDescription, taskPriority);
      taskInput.value = '';
    }
  });
  
  function addTask(description, priority) {
    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';
    taskItem.dataset.priority = priority;

    const taskText = document.createElement('span');
    taskText.textContent = description;
    
    switch (priority) {
      case 'high':
        taskText.style.color = 'red';
        break;
      case 'medium':
        taskText.style.color = 'orange';
        break;
      case 'low':
        taskText.style.color = 'green';
        break;
    }
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', function() {
      taskItem.remove();
    });
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit-btn';
    editBtn.addEventListener('click', function() {
      const newDescription = prompt('Edit task:', description);
      if (newDescription !== null && newDescription.trim() !== '') {
        taskText.textContent = newDescription.trim();
      }
    });
    
    taskItem.appendChild(taskText);
    taskItem.appendChild(editBtn);
    taskItem.appendChild(deleteBtn);
    
    tasksContainer.appendChild(taskItem);
  }
  
  const sortButton = document.createElement('button');
  sortButton.textContent = 'Sort by Priority';
  sortButton.id = 'sort-button';
  taskForm.after(sortButton);
  
  sortButton.addEventListener('click', function() {
    const taskItems = Array.from(tasksContainer.querySelectorAll('.task-item'));
    
    taskItems.sort((a, b) => {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      return priorityOrder[a.dataset.priority] - priorityOrder[b.dataset.priority];
    });
    while (tasksContainer.firstChild) {
      tasksContainer.removeChild(tasksContainer.firstChild);
    }
    
    taskItems.forEach(task => {
      tasksContainer.appendChild(task);
    });
  });
});