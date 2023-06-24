function search() {
  /* Task 1.2: Initialize the searchForm correctly */
  const searchForm = document.querySelector("#search")
  const queryInput = searchForm.querySelector('input[name="query"]')
  const searchText = queryInput.value

  if (searchForm.reportValidity()) {
    const xhr = new XMLHttpRequest()
    xhr.onload = function () {
      const sectionElement = document.querySelector("section:nth-of-type(2)")

      while (sectionElement.childElementCount > 0) {
        sectionElement.firstChild.remove()
      }

      if (xhr.status === 200) {
        const results = JSON.parse(xhr.responseText)

        /* Task 1.3 Insert the results as specified. Do NOT
           forget to also cover the case in which no results
           are available. 
          */

        if (results.length == 0) {
          const p = document.createElement("p")
          p.textContent =
            "No results for your query " + "'" + searchText + "'" + " found."
          document.querySelector("#results").appendChild(p)
        } else {
          const form = document.createElement("form")
          const reusltsElement = document.querySelector("#results")
          reusltsElement.appendChild(form)

          for (let movies of results) {
            const articleElement = document.createElement("article")
            const inputElement = document.createElement("input")
            const labelElement = document.createElement("label")

            inputElement.type = "checkbox"
            inputElement.value = movies["imdbID"]
            inputElement.id = movies["imdbID"]

            labelElement.setAttribute("for", movies["imdbID"])
            labelElement.innerText = movies["Title"]

            articleElement.appendChild(inputElement)
            articleElement.appendChild(labelElement)

            form.appendChild(articleElement)
            document.querySelector("#results").appendChild(form)
          }
          const buttonElement = document.createElement("button")
          buttonElement.innerText = "Add selected to collection"
          buttonElement.setAttribute("onclick", buttonclick())

          form.appendChild(buttonElement)
          document.querySelector("#results").appendChild(form)
        }
      }
    }

    /* Task 1.2: Finish the xhr configuration and send the request */

    const url = new URL("/search", location.href)

    let params = new URLSearchParams(url.search)
    let fullURL = url

    params.set("query", searchText)
    fullURL = fullURL + "?" + params.toString()

    console.log(url.toString())
    xhr.open("GET", fullURL)

    xhr.send()
  }
}

/* Task 2.1. Add a function that you use as an event handler for when
   the button you added above in 1.3. is clicked. In it, call the
   POST /addMovies endpoint and pass the array of imdbID to be added
   as payload. */
function buttonclick() {
  document.getElementById("results").addEventListener("click", () => {
    const form = document.querySelector("#results");
    const checkboxes = form.querySelectorAll("input[type='checkbox']:checked");
    const selectedMovies = [];

    checkboxes.forEach((checkbox) => {
      selectedMovies.push(checkbox.value);
    });

    const xhr = new XMLHttpRequest();
    const url = new URL("/movies", location.href);

    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json");

    console.log(JSON.stringify(selectedMovies));
    xhr.send(JSON.stringify(selectedMovies));
  });
}
window.onload = function () {
  document.getElementById("search").addEventListener("click", () => search());
};
