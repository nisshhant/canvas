var zoomLevel = 1; // Default Zoom Level
var zoomStep = 0.1; // Zoom increment step
var canvasWidth = 1100; // Initial canvas width
var canvasHeight = 750; // Initial canvas height

// Function to Zoom In
function zoomIn() {
    if (zoomLevel < 3) { // Max Zoom Limit
        zoomLevel += zoomStep;
        updateCanvasSize();
        canvas.setZoom(zoomLevel);
    }
}

// Function to Zoom Out
function zoomOut() {
    if (zoomLevel > 0.3) { // Min Zoom Limit
        zoomLevel -= zoomStep;
        updateCanvasSize();
        canvas.setZoom(zoomLevel);
    }
}

// Function to Update Canvas Size Based on Zoom Level
function updateCanvasSize() {
    const canvasElement = document.getElementById('canvas');
    canvasElement.style.width = canvasWidth * zoomLevel + 'px';
    canvasElement.style.height = canvasHeight * zoomLevel + 'px';
    canvas.renderAll(); // Re-render the canvas to reflect changes
}

// Initialize Canvas Size
updateCanvasSize();