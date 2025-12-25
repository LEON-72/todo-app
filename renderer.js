const input = document.getElementById('todo-input');
const button = document.getElementById('add-button');
const list = document.getElementById('todo-list');

button.addEventListener('click', () => {
    const text = input.value;

    if(text != ""){
        const li = document.getElementById('li');
        li.textContent = text;

        list.appendChild(li);

        input.value = "";
    }
});