const ToolEnum = Object.freeze({
    RECTANGLE: "addRectangle",
    CIRCLE: "addCircle",
    LINE: "addLine",
    CIRCUIT_BREAKER: "addCircuitBreaker",
    CYLINDER: "addCylinder",
    BUSBAR: "addBusbar",
    TRANSFORMER: "addTransformer",
    GENERATOR: "addGenerator",
    MOTOR: "addMotor",
    EARTH_GROUND: "addEarthGround",
    FUSE: "addFuse",
    SWITCH: "addSwitch",
    TRIANGLE: "addTriangle",
    RESISTOR: "addResistor",
    CAPACITOR: "addCapacitor",
    INDUCTOR: "addInductor",
    BATTERY: "addBattery",
    LAMP: "addLamp",
    UTILITY_SOURCE: "addUtilitySource",
    SINGLE_SWITCH: "addSingleSwitch",
    DOUBLE_THROW_SWITCH: "addDoubleThrowSwitch",
    DIODE: "addDiode",
    LED: "addLED",
    AMMETER: "addAmmeter",
    SINGLE_SWITCH_OFF: "addSingleSwitchOff",
    VOLTMETER: "addVoltmeter",
    ARROW: "addArrow",
    GENERATOR_SYMBOL: "drawGeneratorSymbol",
    SLD_TEMPLATE: "addreftemp",
    ARC: "addArc",
    SOLENOID: "addSolenoid",
});

// Example Usage:
console.log(ToolEnum.RECTANGLE); // Output: "addRectangle"


let activeTool = ToolboxEnum.SELECTION;


function selectTool(tool) {
    activeTool = tool;
    console.log(`Active tool: ${activeTool}`);

    // Remove active class from all tools
    document.querySelectorAll('.tool').forEach(t => t.classList.remove('active'));

    // Add active class to the selected tool
    const selectedTool = document.getElementById(tool + '-button');
    if (selectedTool) {
        selectedTool.classList.add('active');
    }
}



function handleToolClick(tool, canvas) {
    if (typeof window[tool] === "function") {
        window[tool](canvas);
    } else {
        console.error(`Function ${tool} is not defined`);
    }
}