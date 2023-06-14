//import { ButtonBuilder, ElementBuilder, MovieBuilder } from "./builders.js";

/*function deleteMovie(imdbID) {
  /!* Task 3.1. Add an XMLHttpRequest that send a DELTETE request to the /movies/:imdbID endpoint.
     Task 3.3. Upon successful deletion, remove the article element corresponding to the deleted 
               movie from the DOM. *!/
  const xhr = new XMLHttpRequest();
  // console.log("HALLO " + imdbID);
  xhr.open("DELETE", "/movies/" + imdbID);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onload = function () {
    if (xhr.status === 200) {
      const articleToDelete = document.querySelector(`#${imdbID}`);
      if (articleToDelete) {
        articleToDelete.remove();
      }
      console.log("Movie deleted successfully");
      // Perform any additional actions here
    } else {
      console.log("Failed to delete movie");
    }
  };

  xhr.send();
}*/

/*function loadResults(genre) {
    const input = document.getElementById("locationInput").value;
    if (!input) {
        alert("Please enter a location!")
    } else {
        /!*const xhr = new XMLHttpRequest();
    xhr.onload = function () {*!/
        const mainElement = document.querySelector("main");

        /!*while (mainElement.childElementCount > 0) {
          mainElement.firstChild.remove();
        }*!/

        let article = document.createElement("article")
        let span = document.createElement("span")
        span.textContent = "Test"
        article.appendChild(span)
        mainElement.appendChild(article)

        /!*if (xhr.status === 200) {
          JSON.parse(xhr.responseText).forEach((movie) =>
            new MovieBuilder(movie, deleteMovie).appendTo(mainElement)
          );
        } else {
          mainElement.append(
            `Daten konnten nicht geladen werden, Status ${xhr.status} - ${xhr.statusText}`
          );
        }*!/
        // };

        /!*const url = new URL("/movies", location.href);

        if (genre) {
          url.searchParams.set("genre", genre);
        }

        xhr.open("GET", url);
        xhr.send();*!/
    }
}*/

/*window.onload = function () {
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    const listElement = document.querySelector("#search");

    if (xhr.status === 200) {
      const genres = JSON.parse(xhr.responseText);
      new ElementBuilder("li")
        .append(new ButtonBuilder("All").onclick(() => loadResults()))
        .appendTo(listElement);

      for (const genre of genres) {
        new ElementBuilder("li")
          .append(new ButtonBuilder(genre).onclick(() => loadResults(genre)))
          .appendTo(listElement);
      }

      const firstButton = document.querySelector("nav button");
      if (firstButton) {
        firstButton.click();
      }
    } else {
      listElement.append(
        `Daten konnten nicht geladen werden, Status ${xhr.status} - ${xhr.statusText}`
      );
    }
  };
  xhr.open("GET", "/genres");
  xhr.send();
};*/
