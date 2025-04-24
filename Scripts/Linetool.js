let lineMode = false; // Line drawing mode
let isDrawing = false; // Track if currently drawing a line
let line; // Reference to the current line being drawn

function addLine(canvas) {
    if (!canvas.isDrawing) {
        lineMode = !lineMode; // Toggle line mode only if not already drawing
    }

    if (lineMode) {
        disableSelection(canvas);
        enableLineDrawing(canvas);
        document.getElementById("line-button").style.background = "blue"; // Active
    } else {
        enableSelection(canvas);
        disableLineDrawing(canvas);
        canvas.defaultCursor = "default";
        document.getElementById("line-button").style.background = "white"; // Inactive
    }
}

function disableSelection(canvas) {
    canvas.selection = false;
    canvas.forEachObject((obj) => {
        obj.selectable = false;
        obj.evented = false;
    });
    canvas.renderAll();
}

function enableSelection(canvas) {
    canvas.selection = true;
    canvas.forEachObject((obj) => {
        obj.selectable = true;
        obj.evented = true;
    });
    canvas.renderAll();
}

function enableLineDrawing(canvas) {
    canvas.defaultCursor = "crosshair";
    canvas.selection = false;

    // Event handlers for line drawing
    canvas.on('mouse:down', startDrawing);
    canvas.on('mouse:move', drawLine);
    canvas.on('mouse:up', endDrawing);
}

function disableLineDrawing(canvas) {
    canvas.off('mouse:down', startDrawing);
    canvas.off('mouse:move', drawLine);
    canvas.off('mouse:up', endDrawing);

    enableSelection(canvas);
}

function startDrawing(event) {
    if (!lineMode || event.target) return; // Prevent conflicts if an object is clicked

    let pointer = canvas.getPointer(event.e);
    isDrawing = true;

    line = new fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y], {
        stroke: 'black',
        strokeWidth: 1,
        strokeUniform: true,
        selectable: false,
        evented: false
    });

    canvas.add(line);
}

function drawLine(event) {
    if (!isDrawing || !line) return;

    let pointer = canvas.getPointer(event.e);

    // Check if the Ctrl key is pressed
    if (event.e.ctrlKey) {
        // Calculate the difference between the starting point and the current pointer position
        let dx = Math.abs(pointer.x - line.x1);
        let dy = Math.abs(pointer.y - line.y1);

        // If the horizontal distance is greater than the vertical distance, make it a horizontal line
        if (dx > dy) {
            line.set({ x2: pointer.x, y2: line.y1 }); // Keep y2 the same as y1
        } else {
            line.set({ x2: line.x1, y2: pointer.y }); // Keep x2 the same as x1
        }
    } else {
        // If Ctrl is not pressed, draw the line normally
        line.set({ x2: pointer.x, y2: pointer.y });
    }

    canvas.renderAll();
}

function endDrawing(event) {
    if (!isDrawing || !line) return;

    let pointer = canvas.getPointer(event.e);

    // If the line is just a point, remove it
    if (line.x1 === pointer.x && line.y1 === pointer.y) {
        canvas.remove(line);
    } else {
        // Make the line selectable after drawing
        line.set({ selectable: true, evented: true });
    }

    isDrawing = false;
    canvas.renderAll();
}