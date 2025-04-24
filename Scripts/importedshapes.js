function addreftemp(canvas) {
    let url = "https://upload.wikimedia.org/wikipedia/commons/6/6a/Electrical_symbols_library.svg"
    fabric.loadSVGFromURL(url, function(objects, options) {
        let svgObject;

        // Check if Fabric version requires `fabric.Group`
        if (Array.isArray(objects)) {
            svgObject = new fabric.Group(objects, options);
        } else {
            svgObject = objects;
        }

        svgObject.set({
            left: 100,
            top: 100,
            scaleX: 1,
            scaleY: 1
        });

        canvas.add(svgObject);
        canvas.renderAll();
    }, function(error) {
        console.error("Error loading SVG:", error);
    });
}


//memory m aane wala code
function importImageFromPath('C:\Users\hp\Downloads\transformer.svg') {
    fetch(path)
        .then(response => response.text())
        .then(svgContent => {
            sessionStorage.setItem('uploadedSVG', svgContent);
            displayImage();
        })
        .catch(error => console.error('Error loading SVG:', error));
}

function displayImage() {
    const svgContent = sessionStorage.getItem('uploadedSVG');
    if (svgContent) {
        let container = document.getElementById('svgContainer');
        if (!container) {
            container = document.createElement('div');
            container.id = 'svgContainer';
            document.body.appendChild(container);
        }
        container.innerHTML = svgContent;
    }
}
