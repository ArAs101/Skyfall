const express = require("express");
const path = require("path");
const http = require("http");
const bodyParser = require("body-parser");
const {send} = require("process");
const axios = require("axios");
const {stringify} = require("querystring");
const {response, json} = require("express");

const API_KEY = 'c3f5d777155024ea1c2c209f90f0f34e';
const app = express();
/*const users = []
const bcrypt = require('bcrypt')

app.use(express.urlencoded({extended: false}))*/

app.use(express.static(path.join(__dirname, 'Frontend')));

app.get("/getweather", async function (req, res) {
    // Access the city ID from the request query parameters

    const city = req.query.city; // use a query parameter to get the city
    const geo_api_response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_KEY}`);

    if (geo_api_response.data[0]) {
        const lat = geo_api_response.data[0].lat
        const lon = geo_api_response.data[0].lon

        const owm_response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
        const cityName = geo_api_response.data[0].name
        const temperature = owm_response.data.main.temp;
        const state = owm_response.data.weather;
        const infoTobeSentback = {
            "cityName": cityName,
            "temperature": temperature,
            "weatherState": state
        }
        res.json(infoTobeSentback)
    } else {
        res.status(404).send('City not found');
    }
})


/*
app.get("/list", function (req, res) {
    const apiKey = "c3f5d777155024ea1c2c209f90f0f34e"
    const input = req.query.location // von index.html
    axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${input}&appid=${apiKey}`).then((response) => {
        const weather = response.data.list[0];
        res.send(weather)
/!*        if (response.status === 200) {

            const lat = response.data[0].lat
            const lon = response.data[0].lon

                axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`).then((reply) => {
                    const temperature = reply.data.main.temp
                    const state = reply.data.weather
                    const infoTobeSentback = {
                        "temperature" : temperature,
                        "weatherState" : state
                    }
                    res.json(infoTobeSentback)
                    /!*let results_div = document.getElementById("results")
                    results_div.append(json(infoTobeSentback))*!/
                })
        }*!/
    }).catch(error => {
        console.error(error);
        // Behandle den Fehler und sende eine entsprechende Antwort an den Client
        res.status(500).send('Fehler beim Abrufen des zufälligen Gerichts');
    });
})
*/




/*app.post("/userregister", async function (req, res) {     // ab hier vom Video
    // try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            username: req.body.username,
            password: hashedPassword
        })
        const button = document.getElementById("register_button")
    /!*} catch {

    }*!/
})*/
/*
app.put("/userlogin", function (req, res) {



})

app.post("/userregister", function (req, res) {



})

app.delete("/userremove", function (req, res) {



})*/

/*
// Parse urlencoded bodies
app.use(bodyParser.json());

// Serve static content in directory 'Frontend'
app.use(express.static(path.join(__dirname, "files")));

app.get("/movies", function (req, res) {
    let movies = Object.values(movieModel);
    const queriedGenre = req.query.genre;
    if (queriedGenre) {
        movies = movies.filter((movie) => movie.Genres.indexOf(queriedGenre) >= 0);
    }
    res.send(movies);
});

// Configure a 'get' endpoint for a specific movie
app.get("/movies/:imdbID", function (req, res) {
    const id = req.params.imdbID;
    const exists = id in movieModel;

    if (exists) {
        res.send(movieModel[id]);
    } else {
        res.sendStatus(404);
    }
});

app.put("/movies/:imdbID", function (req, res) {
    const id = req.params.imdbID;
    const exists = id in movieModel;

    movieModel[req.params.imdbID] = req.body;

    if (!exists) {
        res.status(201);
        res.send(req.body);
    } else {
        res.sendStatus(200);
    }
});

app.get("/genres", function (req, res) {
    const genres = [
        ...new Set(Object.values(movieModel).flatMap((movie) => movie.Genres)),
    ];
    genres.sort();
    res.send(genres);
});

/!* Task 1.1. Add the GET /search endpoint: Query omdbapi.com and return
   a list of the results you obtain. Only include the properties 
   mentioned in the README when sending back the results to the client *!/
app.get("/search", function (req, res) {
    const query = req.query

    if (!query.query) {
        res.sendStatus(400)
        return
    }

    axios.get(`http://www.omdbapi.com/?apikey=6d801718&s=${query.query}`).then((response) => {
            const apiResponse = response.data.Search || []; // Extract the 'Search' property from the response or assign an empty array

            const movies = []

            for (let i = 0; i < apiResponse.length; i++) {
                const title = apiResponse[i]["Title"]
                const imdbID = apiResponse[i]["imdbID"]
                let year = apiResponse[i]["Year"]

                if (isNaN(year)) {
                    year = null
                } else year = parseInt(year)

                const movie = {
                    Title: title,
                    imdbID: imdbID,
                    Year: year,
                }

                movies.push(movie)
            }

            res.send(movies)
        })
        .catch((error) => {
            console.error(error)
            res.sendStatus(500)
        })
})

/!* Task 2.2 Add a POST /movies endpoint that receives an array of imdbIDs that the
   user selected to be added to the movie collection. Search them on omdbapi.com,
   convert the data to the format we use since exercise 1 and add the data to the
   movie collection. *!/
app.post("/movies", async function (req, res) {
    const selectedMovies = req.body

    if (!selectedMovies) {
        res.sendStatus(400)
        return
    }

    for (let movie in selectedMovies) {
        const imdbID = selectedMovies[movie]
        let movieTest = await getMovies(imdbID)
        movieModel[imdbID] = movieTest
    }
    res.sendStatus(200)
})

app.delete("/movies/:imdbID", function (req, res) {
    const selectedMovies = req.params.imdbID
    const imdbID = req.params.imdbID

    console.log("IMDBID REQUEST BODY " + imdbID)

    if (!selectedMovies) {
        res.sendStatus(400)
        return
    }

    delete movieModel[imdbID]
    res.sendStatus(200)
})

/!* Task 3.2. Add the DELETE /movies/:imdbID endpoint which removes the movie
   with the given imdbID from the collection. *!/

function getMovies(imdbID) {
    return new Promise(function (resolve, reject) {
        axios.get(`http://www.omdbapi.com/?i=${imdbID}&apikey=6e589b6f`).then(
            (response) => {
                const apiResponse = response.data

                const title = apiResponse["Title"]
                const imdbID = apiResponse["imdbID"]
                const released = new Date(apiResponse["Released"]).toISOString().slice(0, 10)
                const runtime = Number(apiResponse["Runtime"].substring(0, 3))
                const genres = apiResponse["Genre"].split(",")
                const directors = apiResponse["Director"].split(",")
                const writers = apiResponse["Writer"].split(",")
                const actors = apiResponse["Actors"].split(",")
                const plot = apiResponse["Plot"]
                const poster = apiResponse["Poster"]
                const metascore = Number(apiResponse["Metascore"])
                const imdbRating = Number(apiResponse["imdbRating"])

                let movie = {
                    imdbID: imdbID,
                    Title: title,
                    Released: released,
                    Runtime: runtime,
                    Genres: genres,
                    Directors: directors,
                    Writers: writers,
                    Actors: actors,
                    Plot: plot,
                    Poster: poster,
                    Metascore: metascore,
                    imdbRating: imdbRating,
                }

                resolve(movie)
            },
            (error) => {
                reject(error)
            }
        )
    })
}*/

app.listen(3000);

console.log("Server now listening on http://localhost:3000/");
