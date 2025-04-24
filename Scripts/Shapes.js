function addRectangle(canvas) {
    let rect = new fabric.Rect({
        left: 0, top: 0, fill: 'white', stroke: 'black', width: 100, height: 100,
        strokeWidth: 1, strokeUniform: true
    });
    canvas.add(rect).setActiveObject(rect);
}

function addCircle(canvas) {
    let circle = new fabric.Circle({
        left: 0, top: 0, fill: 'white', stroke: 'black', radius: 50, strokeWidth: 1, strokeUniform: true
    });
    canvas.add(circle).setActiveObject(circle);
}



// Add Circuit Breaker
function addCircuitBreaker(canvas) {
    let startX1 = 50, endX1 = 150;  // First horizontal line
    let startX2 = 250, endX2 = 350; // Second horizontal line
    let y = 100; // Common y-coordinate for both lines

    // Left horizontal line
    let leftLine = new fabric.Line([startX1, y, endX1, y], {
        stroke: 'black',
        strokeWidth: 1, strokeUniform: true
    });

    // Right horizontal line
    let rightLine = new fabric.Line([startX2, y, endX2, y], {
        stroke: 'black',
        strokeWidth: 1, strokeUniform: true
    });

    // Small Circles at the ends
    let circleRadius = 6;
    let circles = [
        new fabric.Circle({ left: endX1, top: y, strokeUniform: true, radius: circleRadius, fill: 'black', originX: 'center', originY: 'center', strokeWidth: 1 }),
        new fabric.Circle({ left: startX2, top: y, strokeUniform: true, radius: circleRadius, fill: 'black', originX: 'center', originY: 'center', strokeWidth: 1 })
    ];

    // Arc (Breaker Gap)
    let arcPath = new fabric.Path(`M ${endX1} ${y - 20} Q 200 40, ${startX2} ${y - 20}`, {
        stroke: 'black',
        strokeWidth: 1,
        strokeUniform: true,
        fill: '',
    });

    let breakerGroup = new fabric.Group([leftLine, rightLine, ...circles, arcPath], {
        selectable: true
    });

    breakerGroup.rotate(90);
    canvas.add(breakerGroup);
}

function addCylinder(canvas) {
    let cylinder = new fabric.Group([
        // Top ellipse
        new fabric.Ellipse({
            left: 60, top: 30, rx: 40, ry: 20, fill: 'white', stroke: 'black', strokeWidth: 1, strokeUniform: true
        }),
        // Bottom ellipse
        new fabric.Ellipse({
            left: 60, top: 130, rx: 40, ry: 20, fill: 'white', stroke: 'black', strokeWidth: 1, strokeUniform: true
        }),
        // Left side line
        new fabric.Line([60, 50, 60, 150], { stroke: 'black', strokeWidth: 1, strokeUniform: true }),
        // Right side line
        new fabric.Line([140, 50, 140, 150], { stroke: 'black', strokeWidth: 1, strokeUniform: true })
    ], {
        selectable: true
    });

    canvas.add(cylinder);
}

function addBusbar(canvas) {
    // Busbar body (rectangle)
    let busbar = new fabric.Rect({
        left: 150, 
        top: 100, 
        width: 40, 
        height: 150, 
        fill: 'white', 
        stroke: 'black', 
        strokeWidth: 1,
        strokeUniform: true
    });

    // Function to create a bolt
    function createBolt(x, y) {
        let bolt = new fabric.Circle({
            left: x, 
            top: y, 
            radius: 10, 
            fill: 'white', 
            stroke: 'black', 
            strokeWidth: 1,
            strokeUniform: true
        });

        let boltLine = new fabric.Line([x + 5, y + 5, x + 20, y + 20], {
            stroke: 'black', 
            strokeWidth: 1,
            strokeUniform: true
        });

        return new fabric.Group([bolt, boltLine]);
    }

    // Create three bolts
    let bolt1 = createBolt(160, 120);
    let bolt2 = createBolt(160, 170);
    let bolt3 = createBolt(160, 220);

    // Group all elements
    let busbarGroup = new fabric.Group([busbar, bolt1, bolt2, bolt3], {
        selectable: true
    });

    canvas.add(busbarGroup);
}

// Add Transformer
function addTransformer(canvas) {
    let circle1 = new fabric.Circle({
        left: 100, top: 100, radius: 30, fill: 'white', stroke: 'black', strokeWidth: 1, strokeUniform: true
    });

    let circle2 = new fabric.Circle({
        left: 100, top: 140, radius: 30, fill: 'white', stroke: 'black', strokeWidth: 1, strokeUniform: true
    });

    let transformerGroup = new fabric.Group([circle1, circle2], {
        selectable: true
    });

    canvas.add(transformerGroup);
}

// Add Generator
function addGenerator(canvas) {
    let circle = new fabric.Circle({
        left: 0, top: 0, radius: 40, fill: 'white', stroke: 'black', strokeWidth: 1, strokeUniform: true
    });

    // Create the sine wave separately
    let sineWave = new fabric.Path('M 0 0 Q 10 -20, 20 0 T 40 0 T 60 0', {
        stroke: 'black', strokeWidth: 1, strokeUniform: true, fill: 'white'
    });

    // Position it at (150, 100)
    sineWave.set({
        left: 40,   // X-position
        top: 40,    // Y-position
        originX: 'center',
        originY: 'center'
    });

    let generatorGroup = new fabric.Group([circle, sineWave], {
        selectable: true
    });

    canvas.add(generatorGroup);
}

// Add Motor
function addMotor(canvas) {
    let circle = new fabric.Circle({
        left: 200, top: 200, radius: 40, fill: 'white', stroke: 'black', strokeUniform: true, strokeWidth: 1
    });

    let letterM = new fabric.Text('M', {
        left: 220, top: 220, fontSize: 20, strokeUniform: true, fill: 'black'
    });

    let motorGroup = new fabric.Group([circle, letterM], {
        selectable: true
    });

    canvas.add(motorGroup);
}

// Add Earth Ground
function addEarthGround(canvas) {
    let line1 = new fabric.Line([150, 200, 150, 220], { stroke: 'black', strokeWidth: 1, strokeUniform: true });
    let line2 = new fabric.Line([130, 220, 170, 220], { stroke: 'black', strokeWidth: 1, strokeUniform: true });
    let line3 = new fabric.Line([140, 230, 160, 230], { stroke: 'black', strokeWidth: 1, strokeUniform: true });
    let line4 = new fabric.Line([145, 240, 155, 240], { stroke: 'black', strokeWidth: 1, strokeUniform: true });

    let groundGroup = new fabric.Group([line1, line2, line3, line4], {
        selectable: true
    });

    canvas.add(groundGroup);
}

// Add Fuse
function addFuse(canvas) {
    let line1 = new fabric.Line([100, 100, 120, 100], { stroke: 'black', strokeWidth: 1, strokeUniform: true });
    let zigzag = new fabric.Path('M 120 100 L 130 90 L 140 110 L 150 90 L 160 110 L 170 90 L 180 100', {
        stroke: 'black', strokeWidth: 1, fill: 'white', strokeUniform: true
    });
    let line2 = new fabric.Line([180, 100, 200, 100], { stroke: 'black', strokeWidth: 1, strokeUniform: true });

    let fuseGroup = new fabric.Group([line1, zigzag, line2], {
        selectable: true
    });

    canvas.add(fuseGroup);
}

// Add Switch
function addSwitch(canvas) {
    let line1 = new fabric.Line([100, 100, 150, 100], { stroke: 'black', strokeWidth: 1, strokeUniform: true });
    let line2 = new fabric.Line([150, 100, 170, 80], { stroke: 'black', strokeWidth: 1, strokeUniform: true });

    let switchGroup = new fabric.Group([line1, line2], {
        selectable: true
    });

    canvas.add(switchGroup);
}

function addTriangle(canvas) {
    let triangle = new fabric.Triangle({
        left: 200, top: 200, fill: null, stroke: 'black', width: 100, height: 100, strokeWidth: 1, strokeUniform: true
    });
    canvas.add(triangle).setActiveObject(triangle);
}

function addResistor(canvas) {
    let line1 = new fabric.Line([100, 100, 120, 100], { stroke: 'black', strokeWidth: 1, strokeUniform: true });
    let zigzag = new fabric.Path('M 120 100 L 130 90 L 140 110 L 150 90 L 160 110 L 170 90 L 180 100', {
        stroke: 'black', strokeWidth: 1, fill: 'white', strokeUniform: true
    });
    let line2 = new fabric.Line([180, 100, 200, 100], { stroke: 'black', strokeWidth: 1, strokeUniform: true });

    let resistorGroup = new fabric.Group([line1, zigzag, line2], {
        selectable: true
    });

    canvas.add(resistorGroup);
}

function addCapacitor(canvas) {
    let line1 = new fabric.Line([100, 100, 130, 100], { stroke: 'black', strokeWidth: 1, strokeUniform: true });
    let plate1 = new fabric.Line([130, 90, 130, 110], { stroke: 'black', strokeWidth: 1, strokeUniform: true });
    let plate2 = new fabric.Line([150, 90, 150, 110], { stroke: 'black', strokeWidth: 1, strokeUniform: true });
    let line2 = new fabric.Line([150, 100, 180, 100], { stroke: 'black', strokeWidth: 1, strokeUniform: true });

    let capacitorGroup = new fabric.Group([line1, plate1, plate2, line2], {
        selectable: true
    });

    canvas.add(capacitorGroup);
}

function addInductor(canvas) {
    let line1 = new fabric.Line([100, 100, 120, 100], { stroke: 'black', strokeWidth: 1, strokeUniform: true });
    let coil = new fabric.Path('M 120 100 Q 130 80, 140 100 T 160 100 T 180 100', {
        stroke: 'black', strokeWidth: 1, fill: 'white', strokeUniform: true
    });
    let line2 = new fabric.Line([180, 100, 200, 100], { stroke: 'black', strokeWidth: 1, strokeUniform: true });

    let inductorGroup = new fabric.Group([line1, coil, line2], {
        selectable: true
    });

    canvas.add(inductorGroup);
}

function addBattery(canvas) {
    let line1 = new fabric.Line([100, 100, 130, 100], { stroke: 'black', strokeWidth: 1, strokeUniform: true });
    let longPlate = new fabric.Line([130, 90, 130, 110], { stroke: 'black', strokeWidth: 1, strokeUniform: true });
    let shortPlate = new fabric.Line([150, 95, 150, 105], { stroke: 'black', strokeWidth: 1, strokeUniform: true });
    let line2 = new fabric.Line([150, 100, 180, 100], { stroke: 'black', strokeWidth: 1, strokeUniform: true });

    let batteryGroup = new fabric.Group([line1, longPlate, shortPlate, line2], {
        selectable: true
    });

    canvas.add(batteryGroup);
}

function addLamp(canvas) {
    let circle = new fabric.Circle({
        left: 0, top: 0, radius: 25, fill: 'white', stroke: 'black', strokeWidth: 1, strokeUniform: true,
        originX: 'center', originY: 'center' // Center the circle
    });

    let line1 = new fabric.Line([-15, -15, 15, 15], { // Properly centered
        stroke: 'black', strokeWidth: 1, originX: 'center', originY: 'center', strokeUniform: true
    });

    let line2 = new fabric.Line([-15, 15, 15, -15], { // Properly centered
        stroke: 'black', strokeWidth: 1, originX: 'center', originY: 'center', strokeUniform: true
    });

    let lampGroup = new fabric.Group([circle, line1, line2], {
        left: 150, top: 100,
        selectable: true,
        originX: 'center', originY: 'center'
    });

    canvas.add(lampGroup);
}

function addUtilitySource(canvas) {
    let triangle = new fabric.Triangle({
        left: 150, top: 100, width: 20, height: 20, fill: 'white', stroke: 'purple', strokeWidth: 1, strokeUniform: true, angle: 180
    });
    let line = new fabric.Line([160, 120, 160, 150], { stroke: 'green', strokeWidth: 1, strokeUniform: true });
    let group = new fabric.Group([triangle, line], { selectable: true });
    canvas.add(group);
}

function addSingleSwitch(canvas) {
    let line1 = new fabric.Line([140, 100, 170, 100], { strokeUniform: true, stroke: 'green', strokeWidth: 1 });
    let switchLine = new fabric.Line([170, 100, 180, 80], { stroke: 'purple', strokeWidth: 1, strokeUniform: true });
    let group = new fabric.Group([line1, switchLine], { selectable: true });
    canvas.add(group);
}

function addDoubleThrowSwitch(canvas) {
    let line1 = new fabric.Line([140, 100, 170, 100], { strokeUniform: true, stroke: 'green', strokeWidth: 1 });
    let switchLine1 = new fabric.Line([170, 100, 180, 80], { strokeUniform: true, stroke: 'purple', strokeWidth: 1 });
    let switchLine2 = new fabric.Line([170, 100, 180, 120], { strokeUniform: true, stroke: 'purple', strokeWidth: 1 });
    let group = new fabric.Group([line1, switchLine1, switchLine2], { selectable: true });
    canvas.add(group);
}

function addDiode(canvas) {
    let line1 = new fabric.Line([100, 100, 120, 100], { strokeUniform: true, stroke: 'black', strokeWidth: 1 });

    let triangle = new fabric.Polygon([
        { x: 120, y: 90 }, { x: 140, y: 100 }, { x: 120, y: 110 }
    ], {
        fill: 'white', strokeUniform: true, stroke: 'black', strokeWidth: 1
    });

    let verticalLine = new fabric.Line([140, 90, 140, 110], { strokeUniform: true, stroke: 'black', strokeWidth: 1 });

    let line2 = new fabric.Line([140, 100, 160, 100], { strokeUniform: true, stroke: 'black', strokeWidth: 1 });

    let diodeGroup = new fabric.Group([line1, triangle, verticalLine, line2], {
        selectable: true
    });

    canvas.add(diodeGroup);
}


function addLED(canvas) {
    let diode = addDiode(); // Reuse the diode function

    let arrow1 = new fabric.Line([150, 80, 160, 70], { strokeUniform: true,stroke: 'black', strokeWidth: 1});
    let arrow2 = new fabric.Line([160, 90, 170, 80], { strokeUniform: true,stroke: 'black', strokeWidth: 1 });

    let ledGroup = new fabric.Group([diode, arrow1, arrow2], {
        selectable: true
    });

    canvas.add(ledGroup);
}



function addAmmeter(canvas) {
    let circle = new fabric.Circle({
        left: 150, top: 100, radius: 30, strokeUniform: true, fill: 'white', stroke: 'black', strokeWidth: 1
    });

    let letterA = new fabric.Text('A', {
        left: 170, top: 115, fontSize: 20, fill: 'black' ,strokeUniform: true,
    });

    let ammeterGroup = new fabric.Group([circle, letterA], {
        selectable: true
    });

    canvas.add(ammeterGroup);
}

function addSingleSwitchOff(canvas) {
    let line1 = new fabric.Line([100, 100, 150, 100], {
        stroke: 'black',
        strokeWidth: 1,strokeUniform: true
    });

    let line2 = new fabric.Line([150, 100, 175, 130], {
        stroke: 'black',
        strokeUniform: true,
        strokeWidth: 1
    });

    let switchGroup = new fabric.Group([line1, line2], {
        selectable: true
    });

    canvas.add(switchGroup);
}

function addVoltmeter(canvas) {
    let circle = new fabric.Circle({
        left: 150, top: 100, radius: 30, fill: 'white', 
        strokeUniform: true, stroke: 'black', strokeWidth: 1
    });

    let letterV = new fabric.Text('V', {
        left: 170, top: 115, fontSize: 20, fill: 'black',strokeUniform: true
    });

    let voltmeterGroup = new fabric.Group([circle, letterV], {
        selectable: true
    });

    canvas.add(voltmeterGroup);
}


function addArrow(canvas) {
    let x1 = 100, y1 = 100, x2 = 200, y2 = 100; // Arrow start and end points

    let angle = Math.atan2(y2 - y1, x2 - x1); // Angle of the arrow

    let headLength = 10; // Arrowhead size
    let x3 = x2 - headLength * Math.cos(angle - Math.PI / 6);
    let y3 = y2 - headLength * Math.sin(angle - Math.PI / 6);
    let x4 = x2 - headLength * Math.cos(angle + Math.PI / 6);
    let y4 = y2 - headLength * Math.sin(angle + Math.PI / 6);

    let arrowLine = new fabric.Line([x1, y1, x2, y2], {
        stroke: 'black',
        strokeWidth: 1,
        strokeUniform: true
    });

    let arrowHead = new fabric.Polygon(
        [
            { x: x2, y: y2 },
            { x: x3, y: y3 },
            { x: x4, y: y4 }
        ],
        {
            fill: 'black'
        }
    );

    let arrowGroup = new fabric.Group([arrowLine, arrowHead], {
        selectable: true
    });

    canvas.add(arrowGroup);
}

function drawGeneratorSymbol(canvas) {
    let centerX = 200, centerY = 200;
    let circleRadius = 60;
    let smallCircleRadius = 15;

    // Outer Circle
    let outerCircle = new fabric.Circle({
        left: centerX,
        top: centerY,
        radius: circleRadius,
        stroke: 'black',
        strokeWidth: 1,
        strokeUniform: true,
        fill: '',
        originX: 'center',
        originY: 'center'
    });

    // Inner Small Circle
    let innerCircle = new fabric.Circle({
        left: centerX,
        top: centerY,
        radius: smallCircleRadius,
        stroke: 'black',
        strokeUniform: true,
        strokeWidth: 1,
        fill: '',
        originX: 'center',
        originY: 'center'
    });

    // Vertical Lines (Input & Output)
    let verticalLine1 = new fabric.Line([centerX, centerY - circleRadius - 20, centerX, centerY - smallCircleRadius], {
        stroke: 'black',
        strokeUniform: true,
        strokeWidth: 1
        
    });

    let verticalLine2 = new fabric.Line([centerX, centerY + smallCircleRadius, centerX, centerY + circleRadius + 20], {
        stroke: 'black',
        strokeUniform: true,
        strokeWidth: 1,
    });

    // Diagonal Slash through the inner circle
    let diagonalLine = new fabric.Line([
        centerX - 35, centerY + 35, // Start
        centerX + 35, centerY   // End
    ], {
        stroke: 'black',
        strokeUniform: true,
        strokeWidth: 1
    });

    let diagonalLine2 = new fabric.Line([
        centerX - 35, centerY , // Start
        centerX + 35, centerY - 35  // End
    ], {
        stroke: 'black',
        strokeUniform: true,
        strokeWidth: 1
    });

    let Group = new fabric.Group([outerCircle, innerCircle, verticalLine1, verticalLine2, diagonalLine, diagonalLine2], {
        selectable: true
    });

    canvas.add(Group);
}



function addArc(canvas) {
    let startX = 100, startY = 200;
    let endX = 300, endY = 200;
    let controlX = 200, controlY = 100; // Initial control point

    let arcPath = new fabric.Path(`M ${startX} ${startY} Q ${controlX} ${controlY}, ${endX} ${endY}`, {
        stroke: 'black',
        strokeWidth: 1,
        strokeUniform : true,
        fill: ''
    });

    


    canvas.add(arcPath);
}




// Function to draw solenoid when button is clicked
function addSolenoid(canvas) {
   
    
    const numCoils = 6; // Number of loops in solenoid
    const coilRadius = 20; // Radius of each coil
    const coilSpacing = 15; // Space between coils
    const startX = 150;
    const startY = 50;
    const wireThickness = 1;

    // Create solenoid loops
    let pathData = `M ${startX} ${startY}`; // Start from top
    pathData += ` V ${startY + coilSpacing}`; // Vertical start line

    for (let i = 0; i < numCoils; i++) {
        const cx = startX;
        const cy = startY + (i + 1) * coilSpacing * 2;
        pathData += ` C ${cx - coilRadius} ${cy - coilSpacing}, ${cx + coilRadius} ${cy - coilSpacing}, ${cx} ${cy}`;
    }
    
    pathData += ` V ${startY + (numCoils + 1) * coilSpacing * 2}`; // Vertical end line

    let solenoidPath = new fabric.Path(pathData, {
        stroke: 'black',
        strokeWidth: wireThickness,
        fill: '',
        selectable: true
    });
    
    canvas.add(solenoidPath);
    canvas.renderAll();
}

