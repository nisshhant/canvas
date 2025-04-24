
let undoStack = [];
let redoStack = [];

// Save initial state
function saveState() {
    redoStack = []; // Clear redo stack on new action
    undoStack.push(canvas.toJSON());
    console.log("State Saved:", undoStack.length);
}

// Undo Function
function undo() {
    if (undoStack.length > 1) {
        redoStack.push(undoStack.pop());
        canvas.loadFromJSON(undoStack[undoStack.length - 1], canvas.renderAll.bind(canvas));
    }
}

// Redo Function
function redo() {
    if (redoStack.length > 0) {
        const state = redoStack.pop();
        undoStack.push(state);
        canvas.loadFromJSON(state, canvas.renderAll.bind(canvas));
    }
}

// Capture Changes
canvas.on("object:added", saveState);
canvas.on("object:modified", saveState);
canvas.on("object:removed", saveState);

// Keyboard Shortcuts for Ctrl+Z and Ctrl+Y
document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.key === "z") {
        event.preventDefault();
        undo();
    }
    if (event.ctrlKey && event.key === "y") {
        event.preventDefault();
        redo();
    }
});


document.getElementById('undo').addEventListener("click", function()
{
    undo();
}) 


document.getElementById('redo').addEventListener("click", function()
{
    redo();
}) 