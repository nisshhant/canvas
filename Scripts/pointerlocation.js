    // Function to add coordinate textboxes
    function addCoordinateTextboxes() {
        let xText = new fabric.Textbox('X: 0', {
            left: 10,
            top: 10,
            fontSize: 20,
            fill: 'red',
            backgroundColor: 'white',
            selectable: false,
            evented: false
        });

        let yText = new fabric.Textbox('Y: 0', {
            left: 10,
            top: 40,
            fontSize: 20,
            fill: 'blue',
            backgroundColor: 'white',
            selectable: false,
            evented: false
        });

        // Add textboxes to canvas
        canvas.add(xText, yText);

        // Update textboxes on mouse move
        canvas.on('mouse:move', function (event) {
            let pointer = canvas.getPointer(event.e);
            xText.text = `X: ${pointer.x.toFixed(2)}`;
            yText.text = `Y: ${pointer.y.toFixed(2)}`;
            canvas.renderAll();
        });
    }

    // Call function to add textboxes
    addCoordinateTextboxes();