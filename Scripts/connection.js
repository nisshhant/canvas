let linkingMode = false;
let selectedObjects = [];
let connections = [];

function toggleLinkingTool() {
    linkingMode = !linkingMode;
    selectedObjects = [];
    if (linkingMode) {
        alert("Click on two objects to link them with a three-line connector.");
    }
}

function connectionExists(obj1, obj2) {
    return connections.some(conn => (conn.obj1 === obj1 && conn.obj2 === obj2) || (conn.obj1 === obj2 && conn.obj2 === obj1));
}

function calculateEdgePoints(obj1, obj2) {
    const obj1CenterX = obj1.left + obj1.width / 2;
    const obj1CenterY = obj1.top + obj1.height / 2;
    const obj2CenterX = obj2.left + obj2.width / 2;
    const obj2CenterY = obj2.top + obj2.height / 2;

    const deltaX = obj2CenterX - obj1CenterX;
    const deltaY = obj2CenterY - obj1CenterY;

    let x1, y1, x2, y2;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal direction
        if (deltaX > 0) {
            // obj2 is to the right
            x1 = obj1.left + obj1.width;
            y1 = obj1CenterY;
            x2 = obj2.left;
            y2 = obj2CenterY;
        } else {
            // obj2 is to the left
            x1 = obj1.left;
            y1 = obj1CenterY;
            x2 = obj2.left + obj2.width;
            y2 = obj2CenterY;
        }
    } else {
        // Vertical direction
        if (deltaY > 0) {
            // obj2 is below
            y1 = obj1.top + obj1.height;
            x1 = obj1CenterX;
            y2 = obj2.top;
            x2 = obj2CenterX;
        } else {
            // obj2 is above
            y1 = obj1.top;
            x1 = obj1CenterX;
            y2 = obj2.top + obj2.height;
            x2 = obj2CenterX;
        }
    }

    return { x1, y1, x2, y2 };
}

function linkObjects(obj1, obj2) {
    if (!obj1 || !obj2 || connectionExists(obj1, obj2)) return;

    const { x1, y1, x2, y2 } = calculateEdgePoints(obj1, obj2);

    // Calculate midpoints for the three-line connector
    const midX1 = x1 + (x2 - x1) / 3;
    const midY1 = y1;
    const midX2 = x1 + (2 * (x2 - x1)) / 3;
    const midY2 = y2;

    // Create three line segments
    const line1 = new fabric.Line([x1, y1, midX1, midY1], {
        stroke: 'black',
        strokeWidth: 1,
        selectable: false,
        evented: false
    });

    const line2 = new fabric.Line([midX1, midY1, midX2, midY2], {
        stroke: 'black',
        strokeWidth: 1,
        selectable: false,
        evented: false
    });

    const line3 = new fabric.Line([midX2, midY2, x2, y2], {
        stroke: 'black',
        strokeWidth: 1,
        selectable: false,
        evented: false
    });

    // Add control points at the junctions
    const controlPoint1 = new fabric.Circle({
        left: midX1,
        top: midY1,
        radius: 5,
        fill: 'blue',
        selectable: true,
        hasControls: false,
        hasBorders: false
    });

    const controlPoint2 = new fabric.Circle({
        left: midX2,
        top: midY2,
        radius: 5,
        fill: 'blue',
        selectable: true,
        hasControls: false,
        hasBorders: false
    });

    // Add all elements to the canvas
    canvas.add(line1, line2, line3, controlPoint1, controlPoint2);

    // Store the connection
    connections.push({
        obj1,
        obj2,
        lines: [line1, line2, line3],
        controlPoints: [controlPoint1, controlPoint2]
    });

    // Add event listeners for moving control points
    controlPoint1.on('moving', () => updateConnections());
    controlPoint2.on('moving', () => updateConnections());

    // Add event listeners for moving connected objects
    obj1.on('moving', () => updateConnections());
    obj2.on('moving', () => updateConnections());

    // Reset linking mode after creating a connection
    linkingMode = false;
}

function updateConnections() {
    connections.forEach(conn => {
        const { obj1, obj2, lines, controlPoints } = conn;

        // Get updated edge points
        const { x1, y1, x2, y2 } = calculateEdgePoints(obj1, obj2);

        // Get current positions of control points
        const midX1 = controlPoints[0].left;
        const midY1 = controlPoints[0].top;
        const midX2 = controlPoints[1].left;
        const midY2 = controlPoints[1].top;

        // Update line coordinates
        lines[0].set({ x1, y1, x2: midX1, y2: midY1 });
        lines[1].set({ x1: midX1, y1: midY1, x2: midX2, y2: midY2 });
        lines[2].set({ x1: midX2, y1: midY2, x2, y2 });

        // Update line coordinates and re-render
        lines.forEach(line => line.setCoords());
        canvas.renderAll();
    });
}

canvas.on('mouse:down', function (options) {
    if (!linkingMode) return;

    if (options.target) {
        selectedObjects.push(options.target);
        if (selectedObjects.length === 2) {
            linkObjects(selectedObjects[0], selectedObjects[1]);
            selectedObjects = [];
        }
    }
});