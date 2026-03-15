// External JavaScript file for Task Manager

// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission
    const form = event.target;
    const inputValue = form.querySelector('input[name="task"]');

    // Basic validation
    if (!inputValue.value) {
        alert('Task cannot be empty!');
        return;
    }

    // Add task logic here...
}

// Attach event listeners on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form[data-task-form]');
    form.addEventListener('submit', handleSubmit);
});