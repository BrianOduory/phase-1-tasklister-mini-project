document.addEventListener('DOMContentLoaded', () => {
  const taskForm = document.getElementById('create-task-form');
  const taskInput = document.getElementById('new-task-description');
  
  let taskList = document.getElementById('tasks');
  if (!taskList) {
    taskList = document.createElement('ul');
    taskList.id = 'tasks';
    document.body.appendChild(taskList);
  }

  taskForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const taskDescription = taskInput.value.trim();
    
    if (taskDescription !== '') {
      const taskItem = document.createElement('li');
      taskItem.className = 'task-item';
      taskItem.textContent = taskDescription;
      
      taskList.appendChild(taskItem);
      taskInput.value = '';
      taskInput.focus();
    }
  });
});