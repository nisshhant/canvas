    function toggleToolbox() {
        const toolsContainer = document.getElementById("shapebox");
        const searchTools = document.getElementById("searchinput");
        if (toolsContainer.style.display === "none" || toolsContainer.style.display === "") {
            shapebox.style.display = "grid";  // Show tools
            searchinput.style.display= "block";
            
        } else {
            shapebox.style.display = "none"; // Hide tools
            searchTools.style.display = "none";
        }
}
