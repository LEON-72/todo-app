const input = document.getElementById('todo-input');
const button = document.getElementById('add-button');
const list = document.getElementById('todo-list');

button.addEventListener('click', () => {
    const text = input.value;
    console.log("ボタンが押されました。入力内容:", text);

    if (text.trim() !== "") {
        // 1.リスト項目(li)を作る
        const li = document.createElement('li');

        // 2.テキスト用のスパンを作る(文字とボタンを分けるため)
        const span = document.createElement('span');
        span.textContent = text;
        li.appendChild(span);

        // 3.削除ボタンを作る
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '削除';
        deleteButton.style.marginLeft = '10px';

        // 4.削除ボタンが押されたとき
        deleteButton.addEventListener('click', () => {
            li.remove();
        });

        li.appendChild(deleteButton);
        list.appendChild(li);

        input.value = "";
        console.log("リストに追加完了！");
    }
});