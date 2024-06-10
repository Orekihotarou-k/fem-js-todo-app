document.addEventListener('DOMContentLoaded', () => {
    const themeCheckbox = document.getElementById('theme');
    const addItemInput = document.getElementById('addItem');
    const todoList = document.querySelector('.content ul');
    const filterInputs = document.querySelectorAll('.filter input[type="radio"]');
    const clearButton = document.querySelector('.clear');
    const itemsLeft = document.querySelector('.items-left span');

    // 1 - changes the theme #theme input is clicked
    themeCheckbox.addEventListener('change', () => {
        document.body.classList.toggle('light-theme');
        document.body.classList.toggle('dark-theme');
    });

    // 2 - adds a new todo entry when text is entered in the text input and the enter key is pressed
    addItemInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const newTodo = document.createElement('li');
            newTodo.className = 'flex-row';
            newTodo.innerHTML = `
                <label class="list-item">
                    <input type="checkbox" name="todoItem">
                    <span class="checkmark"></span>
                    <span class="text">${addItemInput.value}</span>
                </label>
                <span class="remove"></span>
            `;
            todoList.appendChild(newTodo);
            addItemInput.value = '';
            updateItemsLeft();
        }
    });

    // 3 - The todo's can be dragged and rearranged
  
    let draggedItem = null;

    todoList.addEventListener('mousedown', (e) => {
        if (e.target.tagName === 'LI') {
            draggedItem = e.target;
        }
    });

    todoList.addEventListener('mouseover', (e) => {
        if (draggedItem !== null && e.target.tagName === 'LI') {
            const target = e.target;
            todoList.insertBefore(draggedItem, target);
        }
    });

    document.addEventListener('mouseup', () => {
        draggedItem = null;
    });

    // 4 - The filters are functional
    filterInputs.forEach((input) => {
        input.addEventListener('change', () => {
            const filter = input.id;
            const todos = todoList.querySelectorAll('li');

            todos.forEach((todo) => {
                const checkbox = todo.querySelector('input[type="checkbox"]');
                if (filter === 'all') {
                    todo.classList.remove('hidden');
                } else if (filter === 'active' && checkbox.checked) {
                    todo.classList.add('hidden');
                } else if (filter === 'completed' && !checkbox.checked) {
                    todo.classList.add('hidden');
                } else {
                    todo.classList.remove('hidden');
                }
                updateItemsLeft();
            });
        });
    });

    // 5 - The clear button clears all the todos
    clearButton.addEventListener('click', () => {
        const todos = todoList.querySelectorAll('li');
        todos.forEach((todo) => {
            const checkbox = todo.querySelector('input[type="checkbox"]');
            if (checkbox.checked) {
                todo.remove();
            }
        });
        updateItemsLeft();
    });

    // 6 - the number of items left is updated
    function updateItemsLeft() {
        const todos = todoList.querySelectorAll('li:not(.hidden)');
        itemsLeft.textContent = todos.length + ' ';
    }

    // Select all remove spans
const removeSpans = document.querySelectorAll('.remove');

// Add event listener to each remove span
removeSpans.forEach(removeSpan => {
  removeSpan.addEventListener('click', (e) => {
    // Remove the parent li element of the clicked remove span
    e.target.parentElement.remove();
  });
});
});