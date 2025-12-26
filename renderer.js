const input = document.getElementById('todo-input');
const timeInput = document.getElementById('todo-time');
const addButton = document.getElementById('add-button');
const list = document.getElementById('todo-list');

const flatpickr = require("flatpickr");
// const { Japanese } = require("flatpickr/dist/l10n/ja.js"); // 日本語化

let fp;

// 1. 起動時にデータを読み込む
window.addEventListener('DOMContentLoaded', () => {
    const savedData = JSON.parse(localStorage.getItem('Todos')) || [];
    savedData.forEach(item => {
        createTodoElement(item.text, item.time, item.notified, item.completed);
    });

    if (Notification.permission !== 'granted') {
        Notification.requestPermission();
    }

    fp = flatpickr("#todo-time", {
        // locale: Japanese,     // 日本語化
        enableTime: true,      // 時間選択を有効
        dateFormat: "Y-m-d H:i", // フォーマット
        defaultDate: new Date(),
        disableMobile: true,   // ネイティブのカレンダーを強制的にオフにする
        animate: true
    });
});

// 2. 状態を保存する関数
function saveTodos() {
    const todos = [];
    document.querySelectorAll('#todo-list li').forEach(li => {
        todos.push({
            text: li.querySelector('.todo-text').textContent,
            time: li.querySelector('.todo-time-display').textContent.replace(' ', 'T'),
            notified: li.getAttribute('data-notified') === 'true',
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('Todos', JSON.stringify(todos));
}

// 3. TODO要素の作成
function createTodoElement(text, time, notified = false, completed = false) {
    const li = document.createElement('li');
    li.setAttribute('data-notified', notified);
    if (completed) li.classList.add('completed');

    // チェック用サークル
    const circle = document.createElement('div');
    circle.classList.add('check-circle');
    circle.addEventListener('click', (e) => {
        e.stopPropagation();
        li.classList.toggle('completed');
        saveTodos();
    });

    // テキスト
    const textSpan = document.createElement('span');
    textSpan.textContent = text;
    textSpan.classList.add('todo-text');

    // 時間
    const timeSpan = document.createElement('span');
    timeSpan.textContent = time ? time.replace('T', ' ') : '';
    timeSpan.classList.add('todo-time-display');

    // 削除ボタン (SVGアイコン)
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.innerHTML = `
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
    `;
    deleteBtn.addEventListener('click', () => {
        li.remove();
        saveTodos();
    });

    li.appendChild(circle);
    li.appendChild(textSpan);
    li.appendChild(timeSpan);
    li.appendChild(deleteBtn);
    list.appendChild(li);
}

// 4. 追加アクション
addButton.addEventListener('click', () => {
    if (input.value.trim() !== "") {
        createTodoElement(input.value, timeInput.value, false, false);
        saveTodos();
        input.value = "";
        timeInput.value = "";
        fp.setDate(new Date());
    }
});

// 5. 通知タイマー (10秒ごと)
setInterval(() => {
    const now = new Date();
    const currentTime = now.getFullYear() + "-" +
        ("0" + (now.getMonth() + 1)).slice(-2) + "-" +
        ("0" + now.getDate()).slice(-2) + "T" +
        ("0" + now.getHours()).slice(-2) + ":" +
        ("0" + now.getMinutes()).slice(-2);

    document.querySelectorAll('#todo-list li:not(.completed)').forEach(li => {
        const timeDisplay = li.querySelector('.todo-time-display').textContent.replace(' ', 'T');
        const isNotified = li.getAttribute('data-notified') === 'true';

        if (timeDisplay && timeDisplay <= currentTime && !isNotified) {
            new Notification("タスクの時間です", { body: li.querySelector('.todo-text').textContent });
            li.setAttribute('data-notified', 'true');
            saveTodos();
        }
    });
}, 10000);