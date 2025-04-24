function importImage(canvas) {
    // Create an input element dynamically
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    // When file is selected
    input.onchange = (event) => {
        let file = event.target.files[0];
        if (file) {
            let reader = new FileReader();
            reader.onload = (e) => {
                fabric.Image.fromURL(e.target.result, function (img) {
                    img.scaleToWidth(canvas.width / 2); // Scale image to fit
                    img.scaleToHeight(canvas.height / 2);
                    img.set({
                        left: canvas.width / 4,
                        top: canvas.height / 4,
                        selectable: true
                    });
                    canvas.add(img);
                    canvas.renderAll();
                });
            };
            reader.readAsDataURL(file); // Read file as data URL
        }
    };

    input.click(); // Trigger file selection
}