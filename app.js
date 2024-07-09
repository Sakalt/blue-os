// Global variables
let zIndexCounter = 1; // For managing z-index of windows

// Function to toggle Start Menu visibility
function toggleStartMenu() {
    const startMenu = document.getElementById('start-menu');
    startMenu.style.display = startMenu.style.display === 'block' ? 'none' : 'block';
}

// Function to create a new window
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

// Function to make a window draggable
function makeDraggable(element) {
    let isMouseDown = false;
    let offsetX, offsetY;

    element.querySelector('.title-bar').addEventListener('mousedown', function(e) {
        isMouseDown = true;
        offsetX = e.clientX - element.offsetLeft;
        offsetY = e.clientY - element.offsetTop;

        // Prevent other elements from capturing mouse events during drag
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

// Function to close a window
function closeWindow(button) {
    button.closest('.window').remove();
}

// Function to minimize a window
function minimizeWindow(button) {
    const window = button.closest('.window');
    window.style.display = 'none';
}

// Function to maximize/restore a window
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

// Functions to open applications
function openBrowser() {
    createWindow('Browser', `<iframe src="https://www.example.com"></iframe>`);
}

function openCalculator() {
    createWindow('Calculator', `
        <input type="text" id="calc-display" disabled>
        <br>
        <button onclick="inputCalc('1')">1</button>
        <button onclick="inputCalc('2')">2</button>
        <button onclick="inputCalc('3')">3</button>
        <!-- Add calculator buttons -->
    `);
}

function openPhotos() {
    createWindow('Photos', `<p>Placeholder for Photos application</p>`);
}

function openPaint() {
    createWindow('Paint', `<canvas id="paint-canvas" width="800" height="600"></canvas>`);
    setupPaintApp();
}

function openExplorer() {
    createWindow('File Explorer', `<p>Placeholder for File Explorer</p>`);
}

function openSettings() {
    createWindow('Settings', `<h2>Settings</h2><p>Placeholder for Settings</p>`);
}

// Function to initialize Paint application
function setupPaintApp() {
    const canvas = document.getElementById('paint-canvas');
    const ctx = canvas.getContext('2d');

    canvas.addEventListener('mousemove', function(e) {
        if (e.buttons !== 1) return; // Only draw when mouse is clicked

        ctx.beginPath(); // Begin drawing path
        ctx.lineWidth = 5; // Set line width
        ctx.lineCap = 'round'; // Set line cap to round
        ctx.strokeStyle = '#000'; // Set stroke color

        ctx.moveTo(e.offsetX, e.offsetY); // Move to mouse position
        ctx.lineTo(e.offsetX + 1, e.offsetY + 1); // Draw line to slightly offset position
        ctx.stroke(); // Perform the actual drawing
    });
}

// Function to simulate initial setup
function initialSetup() {
    const settings = {
        language: 'English',
        theme: 'Light'
    };

    // Simulate saving settings to browser storage
    localStorage.setItem('blueOS_settings', JSON.stringify(settings));
}

// Function to load initial settings from browser storage
function loadInitialSettings() {
    const storedSettings = localStorage.getItem('blueOS_settings');
    if (storedSettings) {
        const settings = JSON.parse(storedSettings);
        // Apply settings here (for example, change language or theme)
    }
}

// Initialize: Load initial settings and add event listener to Start button
loadInitialSettings();
document.querySelector('.start-button').addEventListener('click', toggleStartMenu);
initialSetup(); // Run initial setup
