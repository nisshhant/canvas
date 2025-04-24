document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search-input");
    const tools = document.querySelectorAll(".tool");

    searchInput.addEventListener("keyup", function () {
        let filter = searchInput.value.toLowerCase();

        tools.forEach(tool => {
            let toolText = tool.innerText.toLowerCase();
            if (toolText.includes(filter)) {
                tool.style.display = "";
            } else {
                tool.style.display = "none";
            }
        });
    });
    }
);
