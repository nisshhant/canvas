// Toggle Toolbar
function toggleToolbar() {
    const toolbar = document.getElementById("toolbar");
    if (toolbar.style.display === "none" || toolbar.style.display === "") {
        toolbar.style.display = "grid"; // Show toolbar
    } else {
        toolbar.style.display = "none"; // Hide toolbar
    }
}

// Toggle Object Selector
function toggleObjectSelector() {
    const objectSelector = document.getElementById("objectSelector");
    if (objectSelector.style.display === "none" || objectSelector.style.display === "") {
        objectSelector.style.display = "block"; // Show object selector
    } else {
        objectSelector.style.display = "none"; // Hide object selector
    }
}

// Toggle Properties Panel
function togglePropertiesPanel() {
    const propertiesPanel = document.getElementById("propertiesPanel");
    if (propertiesPanel.style.display === "none" || propertiesPanel.style.display === "") {
        propertiesPanel.style.display = "block"; // Show properties panel
    } else {
        propertiesPanel.style.display = "none"; // Hide properties panel
    }
}