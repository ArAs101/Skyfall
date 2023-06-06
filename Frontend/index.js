function loadResults() {
    const input = document.getElementById("locationInput").value;
    if (!input) {
        alert("Please enter a location!")
    } else {
        const resultPart = document.querySelector("main")
            resultPart.style.display = "block"
    }

}