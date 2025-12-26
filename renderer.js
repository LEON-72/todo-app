const input = document.getElementById('todo-input');
const timeInput = document.getElementById('todo-time');
const button = document.getElementById('add-button');
const list = document.getElementById('todo-list');

// 起動時に保存されたデータを読み込む
window.addEventListener('DOMContentLoaded', () => {
    const savedData = JSON.parse(localStorage.getItem('Todos')) || [];
    savedData.forEach(item => {
        createTodoElement(item.text, item.time, item.notifid);
    });

    if(Notification.permission !== 'granted'){
        Notification.requestPermission();
    }
});

// 現在の状態を保存する
function saveTodos() {
    const todos = [];
    document.querySelectorAll('#todo-list li').forEach(li => {
        const text = li.querySelector('.todo-text').textContent;
        const time = li.querySelector('.todo-time-display').textContent.replace(' ', 'T');
        const notifid = li.getAttribute('data-notified') === true;
        todos.push({text, time, notifid});
    });

    localStorage.setItem('Todos', JSON.stringify(todos));
}

// TODOを追加する
function createTodoElement(text, time, notifid = false) {
    // リスト項目を作る
    const li = document.createElement('li');
    li.setAttribute('data-notified', notifid);

    // テキスト部分
    const textSpan = document.createElement('span');
    textSpan.textContent = text;
    textSpan.classList.add('todo-text');

    // 時間表示
    const timeSpan = document.createElement('span');
    timeSpan.textContent = time ? time.replace('T', ' ') : '';
    timeSpan.classList.add('todo-time-display');

    // 削除ボタン
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '削除';
    deleteButton.classList.add('delete-button');

    // 削除ボタンが押されたとき
    deleteButton.addEventListener('click', () => {
        li.remove();
        saveTodos();
    });

    li.appendChild(textSpan);
    li.appendChild(timeSpan);
    li.appendChild(deleteButton);
    list.appendChild(li);

    input.value = "";
    console.log("リストに追加完了！");
}

// 追加ボタン
button.addEventListener('click', () => {
    const text = input.value;
    const time = timeInput.value;
    
    if(text.trim() !== ""){
        createTodoElement(text, time, false);
        saveTodos();
        input.value = "";
        timeInput.value = "";
    }
});

setInterval(() => {
    const now = new Date();
    // 1分未満の誤差は許容
    const currentTime = now.getFullYear() + "-" +
        ("0" + (now.getMonth() + 1)).slice(-2) + "-" +
        ("0" + now.getDate()).slice(-2) + "T" +
        ("0" + now.getHours()).slice(-2) + ":" +
        ("0" + now.getMinutes()).slice(-2);

        document.querySelectorAll('#todo-list li').forEach(li => {
            const timeDisplay = li.querySelector('.todo-time-display').textContent.replace(' ', 'T');
            const isNotified = li.getAttribute('data-notified') === 'true';

            if(timeDisplay && timeDisplay <= currentTime && !isNotified){
                const taskName = li.querySelector('.todo-text').textContent;

                new Notification("TODOの時間です!", {
                    body: taskName,
                    // icon: "path/to/icon.png"
                });

                li.setAttribute('data-notified', 'true');
                saveTodos();
            }
        });
}, 10000);