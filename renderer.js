const input = document.getElementById('todo-input');
const button = document.getElementById('add-button');
const list = document.getElementById('todo-list');

button.addEventListener('click', () => {
    const text = input.value;
    console.log("ボタンが押されました。入力内容:", text);

    if (text.trim() !== "") {
        const li = document.createElement('li');
        li.textContent = text;
        list.appendChild(li); // リストに追加
        input.value = "";     // 入力欄を空にする
        console.log("リストに追加完了！");
    } else {
        console.log("入力が空です");
    }
});