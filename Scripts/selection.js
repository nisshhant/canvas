let selectionMode = false; // Default: selection disabled

function toggleSelectionMode() {
    selectionMode = !selectionMode; // Toggle state

    if (selectionMode) {
        enableSelection();
        document.getElementById("selection-tool").style.background = "lightgreen"; // Active color
    } else {
        disableSelection();
        document.getElementById("selection-tool").style.background = ""; // Default
    }
}

function enableSelection() {
    canvas.selection = true; // Enable area selection
    canvas.defaultCursor = "pointer";
    canvas.forEachObject((obj) => {
        obj.selectable = true;
        obj.evented = true;
    });
}

function disableSelection() {
    canvas.discardActiveObject();
    canvas.selection = false; // Disable area selection
    canvas.forEachObject((obj) => {
        obj.selectable = false;
        obj.evented = false;
    });
    canvas.renderAll();
}

document.getElementById("selection-tool").addEventListener("click", toggleSelectionMode);