function updateCanvasSize(canvas) {
    let widthInput = document.getElementById("canvasWidth");
    let heightInput = document.getElementById("canvasHeight");

    // Set canvas size dynamically (for example, full viewport size)
   

    // Update input values with canvas size
    if (canvas) {
        widthInput.value = canvas.width;
        heightInput.value = canvas.height; }
    
}

// Run when the page loads
updateCanvasSize();
window.addEventListener("resize", updateCanvasSize);