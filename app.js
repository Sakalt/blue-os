// グローバル変数
let zIndexCounter = 1; // ウィンドウの z-index を管理するためのカウンター

// 開始メニューの表示切り替え関数
function toggleStartMenu() {
    const startMenu = document.getElementById('start-menu');
    startMenu.style.display = startMenu.style.display === 'block' ? 'none' : 'block';
}

// 新しいウィンドウを作成する関数
function createWindow(title, content) {
    const newWindow = document.createElement('div');
    newWindow.className = 'window';
    newWindow.style.zIndex = zIndexCounter++;
    newWindow.innerHTML = `
        <div class="title-bar">
            ${title}
            <div>
                <button onclick="minimizeWindow(this)">−</button>
                <button onclick="maximizeWindow(this)">□</button>
                <button onclick="closeWindow(this)">×</button>
            </div>
        </div>
        <div class="content">${content}</div>
    `;
    document.getElementById('desktop').appendChild(newWindow);
    makeDraggable(newWindow);
}

// ウィンドウをドラッグ可能にする関数
function makeDraggable(element) {
    let isMouseDown = false;
    let offsetX, offsetY;

    element.querySelector('.title-bar').addEventListener('mousedown', function(e) {
        isMouseDown = true;
        offsetX = e.clientX - element.offsetLeft;
        offsetY = e.clientY - element.offsetTop;

        // ドラッグ中に他の要素がマウスイベントをキャプチャするのを防ぐ
        e.stopPropagation();
        e.preventDefault();
    });

    document.addEventListener('mousemove', function(e) {
        if (isMouseDown) {
            element.style.left = `${e.clientX - offsetX}px`;
            element.style.top = `${e.clientY - offsetY}px`;
        }
    });

    document.addEventListener('mouseup', function() {
        isMouseDown = false;
    });
}

// ウィンドウを閉じる関数
function closeWindow(button) {
    button.closest('.window').remove();
}

// ウィンドウを最小化する関数
function minimizeWindow(button) {
    const window = button.closest('.window');
    window.style.display = 'none';
}

// ウィンドウを最大化／通常サイズにする関数
function maximizeWindow(button) {
    const window = button.closest('.window');
    if (window.classList.contains('maximized')) {
        window.style.width = '';
        window.style.height = '';
        window.classList.remove('maximized');
    } else {
        window.style.width = '100%';
        window.style.height = '100%';
        window.classList.add('maximized');
    }
}

// アプリケーションを開くための関数
function openBrowser() {
    createWindow('ブラウザ', `<iframe src="https://www.example.com"></iframe>`);
}

function openCalculator() {
    createWindow('電卓', `
        <input type="text" id="calc-display" disabled>
        <br>
        <button onclick="inputCalc('1')">1</button>
        <button onclick="inputCalc('2')">2</button>
        <button onclick="inputCalc('3')">3</button>
        <br>
        <button onclick="inputCalc('4')">4</button>
        <button onclick="inputCalc('5')">5</button>
        <button onclick="inputCalc('6')">6</button>
        <br>
        <button onclick="inputCalc('7')">7</button>
        <button onclick="inputCalc('8')">8</button>
        <button onclick="inputCalc('9')">9</button>
        <br>
        <button onclick="inputCalc('0')">0</button>
        <button onclick="inputCalc('+')">+</button>
        <button onclick="inputCalc('-')">-</button>
        <br>
        <button onclick="inputCalc('*')">*</button>
        <button onclick="inputCalc('/')">/</button>
        <button onclick="inputCalc('=')">=</button>
        <br>
        <button onclick="clearCalc()">クリア</button>
    `);
}

function inputCalc(value) {
    const display = document.getElementById('calc-display');
    display.value += value;
}

function clearCalc() {
    const display = document.getElementById('calc-display');
    display.value = '';
}

function openPhotos() {
    createWindow('フォト', 'ここに写真の表示領域を配置します');
}

function openPaint() {
    createWindow('ペイント', 'ここにペイントアプリのキャンバスを配置します');
}

function openExplorer() {
    createWindow('ファイルエクスプローラー', 'ここにファイルエクスプローラーのコンテンツを配置します');
}

function openSettings() {
    createWindow('設定', 'ここに設定アプリのコンテンツを配置します');
}

// 初期設定をシミュレートする関数
function initialSetup() {
    const installScreen = document.getElementById('install-screen');
    const installProgress = document.getElementById('install-progress');
    installScreen.classList.remove('hidden');

    let progress = 0;
    const interval = setInterval(() => {
        progress += 10; // シミュレートされた進捗増加
        if (progress >= 100) {
            clearInterval(interval);
            installScreen.classList.add('hidden');
            alert('インストールが完了しました！');
        }
        installProgress.value = progress;
    }, 1000);
}

// Blue OS 環境を開始するための関数
function startBlueOS() {
    initialSetup(); // 初期設定をシミュレート
}

// イベントリスナー
document.addEventListener('DOMContentLoaded', startBlueOS);
