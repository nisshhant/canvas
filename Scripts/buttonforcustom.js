function saveCustomShape() {
    groupSelectedObjects();
    saveCustomShape2();
}
function saveCustomShape2() {
   
    const activeObject = canvas.getActiveObject();
    if (!activeObject) {
        alert("Select a shape first!");
        return;
    }

    const shapeData = activeObject.toJSON();
    const shapeName = prompt("Enter a name for the shape:", "Shape " + (JSON.parse(localStorage.getItem('customShapes')) || []).length + 1);
    if (!shapeName) return;

    shapeData.name = shapeName;
    let storedShapes = JSON.parse(localStorage.getItem('customShapes')) || [];
    storedShapes.push(shapeData);
    localStorage.setItem('customShapes', JSON.stringify(storedShapes));

    createShapeButton(storedShapes.length - 1);
}

// Load Shapes from Local Storage
function loadCustomShapes() {
    const storedShapes = JSON.parse(localStorage.getItem('customShapes')) || [];
    storedShapes.forEach((_, index) => createShapeButton(index));
}

// Create Button for Saved Shape
function createShapeButton(index) {
    const storedShapes = JSON.parse(localStorage.getItem('customShapes')) || [];
    const shapeData = storedShapes[index];

    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.alignItems = "center";
    container.style.justifyContent = "space-evenly";
    container.style.padding = "1px";

    const button = document.createElement("button");
    button.style.width = "150px";

    button.textContent = shapeData.name || `Shape ${index + 1}`;
    button.onclick = () => insertSavedShape(index);

    const renameButton = document.createElement("button");
    renameButton.textContent = "Rename";
    renameButton.style.marginLeft = "10px";
    renameButton.onclick = () => renameShape(index);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.style.marginLeft = "5px";
    deleteButton.onclick = () => deleteShape(index);

    container.appendChild(button);
    container.appendChild(renameButton);
    container.appendChild(deleteButton);

    document.getElementById("buttonsContainer").appendChild(container);
}

// Insert Shape into Canvas
function insertSavedShape(index) {
    const storedShapes = JSON.parse(localStorage.getItem('customShapes')) || [];
    if (storedShapes[index]) {
        fabric.util.enlivenObjects([storedShapes[index]], function (objects) {
            objects.forEach(obj => {
                obj.set({ left: Math.random() * 300, top: Math.random() * 200 }); // Place randomly
                canvas.add(obj);
                obj.bringToFront();

            });
            canvas.requestRenderAll();
        });
    }
}

// Rename Shape
function renameShape(index) {
    const storedShapes = JSON.parse(localStorage.getItem('customShapes')) || [];
    const newName = prompt("Enter a new name for the shape:", storedShapes[index].name);
    if (newName) {
        storedShapes[index].name = newName;
        localStorage.setItem('customShapes', JSON.stringify(storedShapes));
        document.getElementById("buttonsContainer").innerHTML = "";
        loadCustomShapes();
    }
}
function deleteShape(index) {
    let storedShapes = JSON.parse(localStorage.getItem('customShapes')) || [];

    storedShapes.splice(index, 1); // Remove shape from array
    localStorage.setItem('customShapes', JSON.stringify(storedShapes));

    // Clear the buttons container before reloading
    document.getElementById("buttonsContainer").innerHTML = "";

    loadCustomShapes(); // Reload updated shapes
}

// Load saved shapes when page loads
window.onload = loadCustomShapes;