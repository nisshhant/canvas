let canvas = new fabric.Canvas('canvas');
let clipboard = null;
console.log(canvas);

//this code is for removing the tspan thing, here i am overriding the function
fabric.IText.prototype.toSVG = function() {
    return `<text x="${this.left}" y="${this.top}" font-size="${this.fontSize}" fill="${this.fill}" font-family="${this.fontFamily}">${this.text}</text>`;
};
canvas.on("mouse:down", function (event) {
    if (event.e.shiftKey) {
        canvas.discardActiveObject(); // Prevent deselection of previous objects
        let selectedObjects = canvas.getActiveObjects();
        if (selectedObjects.length) {
            let group = new fabric.ActiveSelection(selectedObjects, { canvas: canvas });
            canvas.setActiveObject(group);
            canvas.requestRenderAll();
        }
    }
});


//for deselecting everything 

function deselectCanvasObjects(canvas) {
    canvas.discardActiveObject(); // Deselect any selected object
    canvas.renderAll(); // Update the canvas UI
}

// Attach this function to all toolbox items
document.querySelectorAll(".toolbox-item").forEach((item) => {
    item.addEventListener("click", () => deselectCanvasObjects(canvas));
});

let TextTOggle = 0;
let activeObject = canvas.getActiveObject(); // Get the selected object

if (activeObject && activeObject.type === "text" && activeObject.editable) { 
    TextTOggle = 1; // Editable mode is ON
} else { 
    TextTOggle = 0; // Editable mode is OFF
}


function addText() {
    let text = new fabric.IText('Double Click to Edit', {
        left: 100, top: 100,
        fontSize: 20, fill: 'black',
        fontFamily: 'Arial',
        selectable: true, editable: true,
        lockScalingX: true, lockScalingY: true
    });

    canvas.add(text).setActiveObject(text);
    canvas.renderAll();

}

// Copy
function copyObject() {
    let activeObject = canvas.getActiveObject();
    if (activeObject) {
        activeObject.clone(cloned => {
            clipboard = cloned;
        });
    }
}
//Paste
function pasteObject() {
    if (clipboard) {
        clipboard.clone(clonedObj => {
            clonedObj.set({ left: clonedObj.left + 20, top: clonedObj.top + 20 });
            canvas.add(clonedObj).setActiveObject(clonedObj);
            canvas.requestRenderAll();
        });
    }
}
//Cut
function cutObject() {
    copyObject();
    deleteObject();
}
function deleteObject() {
    let activeObjects = canvas.getActiveObjects();

    if (activeObjects.length) {
        activeObjects.forEach(obj => {
            if (obj.type === "i-text" && obj.isEditing) {
                activeObject.isEditing = "true";
                return ; // Don't delete if text is being edited
            }
            canvas.remove(obj); // Remove non-editing objects
        });

        canvas.discardActiveObject(); // Deselect all objects after deletion
        canvas.requestRenderAll(); // Re-render the canvas
    }
}
canvas.on('selection:created', updatePropertiesPanel);
canvas.on('selection:updated', updatePropertiesPanel);
canvas.on('selection:cleared', clearPropertiesPanel);
function updatePropertiesPanel() {
    let activeObject = canvas.getActiveObject();
    let propertiesPanel = document.querySelector('.properties-panel');

    if (!activeObject) return;

    let properties = {
        left: activeObject.left,
        top: activeObject.top,
        width: activeObject.width * activeObject.scaleX,
        height: activeObject.height * activeObject.scaleY,
        fill: activeObject.fill,
        stroke: activeObject.stroke,
        strokeWidth: activeObject.strokeWidth || 1,
        fontSize: activeObject.fontSize || 20,
        text: activeObject.text || '',
        angle: activeObject.angle || 0,
        fontFamily: activeObject.fontFamily
        
    };

    propertiesPanel.innerHTML = `<h3>Object Properties</h3>`;

    for (let prop in properties) {
        if (prop === "text" && activeObject.type !== "text") continue;

        let inputType = typeof properties[prop] === "number" ? "number" : "text";
        if (prop === "fill" || prop === "stroke") inputType = "color";

        let inputElement = document.getElementById(prop);
        if (inputElement) {
            inputElement.value = properties[prop];
        } else {
            propertiesPanel.innerHTML += `
                <label>${prop}: 
                    <input type="${inputType}" id="${prop}" value="${properties[prop]}" 
                    oninput="updateObjectProperty('${prop}', this.value)">
                </label><br>
            `;
        }
    }
}


function clearPropertiesPanel() {
    document.querySelector('.properties-panel').innerHTML = ' <h3>Properties</h3><input type="number" id="canvasWidth" placeholder="Width"><input type="number" id="canvasHeight" placeholder="Height"><button onclick="resizeCanvas()">Resize Canvas</button>';
}

function updateObjectProperty(property, value) {
    let activeObject = canvas.getActiveObject();
    if (!activeObject) return;

    if (property === "strokeWidth" || property === "fontSize" || property === "left" || property === "top" || property === "width" || property === "height") {
        value = parseInt(value);
    }

    activeObject.set(property, value);
    canvas.requestRenderAll();
}


// Bring to Front / Send to Back
function sendToFront() {
    let obj = canvas.getActiveObject();
    if (obj) canvas.bringToFront(obj);
}

function sendToBack() {
    let obj = canvas.getActiveObject();
    if (obj) canvas.sendToBack(obj);
}

function sendForward() {
    let obj = canvas.getActiveObject();
    if (obj) canvas.bringForward(obj);
}

function sendBackward() {
    let obj = canvas.getActiveObject();
    if (obj) canvas.sendBackwards(obj);
}

// Modify Object Properties
function changeFillColor() {
    let obj = canvas.getActiveObject();
    if (obj) obj.set('fill', document.getElementById('fillColor').value);
    canvas.requestRenderAll();
}

function changeBorderColor() {
    let obj = canvas.getActiveObject();
    if (obj) obj.set('stroke', document.getElementById('borderColor').value);
    canvas.requestRenderAll();
}

function changeBorderWidth() {
    let obj = canvas.getActiveObject();
    if (obj) obj.set('strokeWidth', parseInt(document.getElementById('borderWidth').value));
    canvas.requestRenderAll();
}

function changeFontSize() {
    let obj = canvas.getActiveObject();
    if (obj && obj.type === 'text') obj.set('fontSize', parseInt(document.getElementById('fontSize').value));
    canvas.requestRenderAll();
}

// Upload Image


function addIdsToObjects() {
    let objects = canvas.getObjects();
    objects.forEach((obj, index) => {
        if (!obj.id) {
            obj.id = `shape_${index + 1}`;
        }
        obj.toObject = (function (toObject) {
            return function () {
                return Object.assign(toObject.call(this), { id: this.id });
            };
        })(obj.toObject);
    });
}

function formatSVG(svgData) {
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(svgData, "image/svg+xml");

    // Clean up SVG structure
    let svgElement = xmlDoc.documentElement;
    svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svgElement.removeAttribute("xmlns:xlink"); // Not needed if no <use> elements

    // Create a main <g> wrapper
    let mainGroup = xmlDoc.createElementNS("http://www.w3.org/2000/svg", "g");
    let title = xmlDoc.createElementNS("http://www.w3.org/2000/svg", "title");
    title.textContent = "Layer 1";
    mainGroup.appendChild(title);

    // Move all children inside the <g> wrapper
    while (svgElement.firstChild) {
        mainGroup.appendChild(svgElement.firstChild);
    }
    svgElement.appendChild(mainGroup);

    // Convert inline styles to attributes
    let allElements = xmlDoc.querySelectorAll("*");
    allElements.forEach((el, index) => {
        if (!el.hasAttribute("id")) {
            el.setAttribute("id", `element_${index + 1}`);
        }

        // Convert styles to attributes
        if (el.hasAttribute("style")) {
            let styleRules = el.getAttribute("style").split(";");
            styleRules.forEach(rule => {
                let [property, value] = rule.split(":").map(str => str.trim());
                if (property && value) {
                    el.setAttribute(property.replace(/-/g, ""), value); // Convert 'stroke-width' to 'strokewidth'
                }
            });
            el.removeAttribute("style");
        }
    });

    return new XMLSerializer().serializeToString(xmlDoc);
}

function saveAsSVG() {
    addIdsToObjects();

    let svgData = canvas.toSVG();
    let formattedSVG = formatSVG(svgData);

    const blob = new Blob([formattedSVG], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "canvas.svg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
}


window.addEventListener("beforeunload", (event) => {
    event.preventDefault();
    event.returnValue = ""; // This triggers the confirmation popup
});

function importSVG() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".svg";

    input.onchange = function(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(e) {
            const svgData = e.target.result;

            fabric.loadSVGFromString(svgData, function(objects, options) {
                const loadedSVG = new fabric.Group(objects, options);
                canvas.add(loadedSVG);
                canvas.requestRenderAll();
            });
        };

        reader.readAsText(file);
    };

    input.click();  // Trigger file selection dialog
}


function clearCanvas() {
    if (confirm("Do you want to save changes to the existing file before clearing?")) {
        saveAsSVG(); // Call your save function if the user agrees
    }
    canvas.clear(); // Clears the canvas after confirmation
}



// Move Object with Arrow Keys
document.addEventListener('keydown', function(event) {
    let activeObject = canvas.getActiveObject();
    if (!activeObject) return;

    switch (event.key) {
        case 'ArrowLeft':
            activeObject.left -= 5;
            break;
        case 'ArrowRight':
            activeObject.left += 5;
            break;
        case 'ArrowUp':
            activeObject.top -= 5;
            break;
        case 'ArrowDown':
            activeObject.top += 5;
            break;
        case 'Delete':  // Delete Key to remove object
            deleteObject();
            break;
        case 'c':  // Ctrl + C for copy
            if (event.ctrlKey) copyObject();
            break;
        case 'v':  // Ctrl + V for paste
            if (event.ctrlKey) pasteObject();
            break;
    }
    canvas.requestRenderAll();
});

document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.key === "a") {
        event.preventDefault(); // Disable browser's default select-all
        selectAllObjects(); // Select all Fabric.js objects
    }
});

function selectAllObjects() {
    if (!canvas) return;

    const objects = canvas.getObjects();
    
    if (objects.length === 0) return; // No objects to select

    const selection = new fabric.ActiveSelection(objects, { canvas });

    canvas.setActiveObject(selection);
    canvas.requestRenderAll();
}



function Pencil() {;
    if(!lineMode){canvas.isDrawingMode = !canvas.isDrawingMode;}
  if (canvas.isDrawingMode) {
        disableSelection(canvas);
        document.getElementById("pencilBtn").style.background = "green"; // Active
    } else {
        enableSelection(canvas);
        
        canvas.defaultCursor = "default";
      document.getElementById("pencilBtn").style.background = "#007bff"; // Inactive
    }
}




function groupSelectedObjects() {
    const activeObject = canvas.getActiveObject();
    
    if (activeObject && activeObject.type === 'activeSelection') {
        activeObject.toGroup();
        canvas.requestRenderAll();
    }
}

function ungroupSelectedObjects() {
    const activeObject = canvas.getActiveObject();

    if (activeObject && activeObject.type === 'group') {
        const items = activeObject.getObjects();
        const groupLeft = activeObject.left;
        const groupTop = activeObject.top;

        // Remove group before adding individual objects
        canvas.remove(activeObject);

        items.forEach((item) => {
            // Adjust position: Convert relative to absolute coordinates
            const newLeft = item.left + groupLeft;
            const newTop = item.top + groupTop;
            
            item.set({
                left: newLeft,
                top: newTop
            });

            // Re-add individual objects to canvas
            canvas.add(item);
        });

        // Ensure canvas updates
        canvas.discardActiveObject();
        canvas.requestRenderAll();
    }
}



    function resizeCanvas() {
        let width = document.getElementById('canvasWidth').value;
        let height = document.getElementById('canvasHeight').value;

        if (width && height) {
            canvas.setWidth(parseInt(width));
            canvas.setHeight(parseInt(height));
            canvas.renderAll();
        }
}

document.getElementById('canvasWidth').addEventListener("input", resizeCanvas);
  document.getElementById('canvasHeight').addEventListener("input", resizeCanvas);