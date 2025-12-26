const input = document.getElementById('todo-input');
const button = document.getElementById('add-button');
const list = document.getElementById('todo-list');

// 起動時に保存されたデータを読み込む
window.addEventListener('DOMContentLoaded', () => {
    const savedData = JSON.parse(localStorage.getItem('Todos')) || [];
    savedData.forEach(todoText => {
        createTodoElement(todoText)
    });
});

// 現在の状態を保存する
function saveTodos() {
    const todos = [];

    document.querySelectorAll('#todo-list li span').forEach(span => {
        todos.push(span.textContent);
    });

    localStorage.setItem('Todos', JSON.stringify(todos));
    console.log()
}

// TODOを追加する
function createTodoElement(text) {
    // リスト項目(li)を作る
    const li = document.createElement('li');

    // テキスト用のスパンを作る(文字とボタンを分けるため)
    const span = document.createElement('span');
    span.textContent = text;
    li.appendChild(span);

    // 削除ボタンを作る
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '削除';
    deleteButton.classList.add('delete-button');

    // 削除ボタンが押されたとき
    deleteButton.addEventListener('click', () => {
        li.remove();
        saveTodos();
    });

    li.appendChild(deleteButton);
    list.appendChild(li);

    input.value = "";
    console.log("リストに追加完了！");
}

// 追加ボタンのイベント
button.addEventListener('click', () => {
    const text = input.value;
    if(text.trim() !== ""){
        createTodoElement(text);
        saveTodos();
        input.value = "";
    }
});