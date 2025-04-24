// Function to update the object list with active selection and rename support
function updateObjectList() {
    const objectList = document.getElementById('objectList');
    objectList.innerHTML = ''; // Clear the list

    canvas.getObjects().forEach((obj, index) => {
        const objectItem = document.createElement('div');
        objectItem.className = 'object-item';
        
        // If the object has a custom name, use it; otherwise, show default
        const objectName = obj.name || `Object ${index + 1} (${obj.type})`;
        objectItem.textContent = objectName;

        // Enable renaming on double-click
        objectItem.ondblclick = () => renameObject(obj, objectItem);

        // Click event to select/deselect objects
        objectItem.onclick = (event) => {
            if (event.ctrlKey || event.metaKey) {
                // Multi-selection with Ctrl (or Cmd on Mac)
                if (canvas.getActiveObjects().includes(obj)) {
                    canvas.discardActiveObject();
                    canvas.setActiveObject(new fabric.ActiveSelection(
                        canvas.getActiveObjects().filter(o => o !== obj), 
                        { canvas: canvas }
                    ));
                } else {
                    const activeObjects = canvas.getActiveObjects().concat(obj);
                    canvas.setActiveObject(new fabric.ActiveSelection(activeObjects, { canvas: canvas }));
                }
            } else {
                // Single selection
                canvas.setActiveObject(obj);
            }
            canvas.requestRenderAll();
            highlightSelectedObjects();
        };

        objectList.appendChild(objectItem);
    });

    highlightSelectedObjects();
}

// Function to highlight selected objects in the list
function highlightSelectedObjects() {
    const objectItems = document.querySelectorAll('.object-item');
    const activeObjects = canvas.getActiveObjects();

    objectItems.forEach((item, index) => {
        const obj = canvas.getObjects()[index];

        if (activeObjects.includes(obj)) {
            item.classList.add('active-object');
        } else {
            item.classList.remove('active-object');
        }
    });
}

// Function to rename an object
function renameObject(obj, objectItem) {

    const currentName = obj.name || objectItem.textContent;
    const newName = prompt('Enter new object name:', currentName);

    if (newName !== null && newName.trim() !== '') {
        obj.name = newName.trim();
        objectItem.textContent = newName.trim();
    }
}

// Event Listeners
canvas.on('object:added', updateObjectList);
canvas.on('object:removed', updateObjectList);
canvas.on('object:modified', updateObjectList);
canvas.on('selection:created', highlightSelectedObjects);
canvas.on('selection:updated', highlightSelectedObjects);
canvas.on('selection:cleared', highlightSelectedObjects);

// Initial update of the object list
updateObjectList();
