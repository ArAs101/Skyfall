/*if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}*/

const express = require("express");
const app = express();
const path = require("path");
const axios = require("axios");
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
//const session = require('express-session')
const methodOverride = require('method-override')
const initializePassport = require('./passport-config')
const escapeHtml = require('escape-html');
const parseurl = require('parseurl');
const cookieParser = require('cookie-parser')
const sessions = require('express-session')
const cors = require('cors')
app.use(cors())


const API_KEY = 'c3f5d777155024ea1c2c209f90f0f34e';

/*
initializePassport(passport, email =>
        users.find(user => user.email === email),
    id => users.find(user => user.id === id))

const users = []
*/

/*app.use(express.static(path.join(__dirname + '/Frontend')));
app.use(express.json())*/

//app.set('view-engine', 'ejs')
// app.use(express.urlencoded({extended: false}))
//app.use(flash())
/*app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))*/
/*app.use(methodOverride('_method'))

app.use(passport.initialize())
app.use(passport.session())

initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)*/

// New code (Hamza):

//var escapeHtml = require('escape-html')
//var express = require('express')
/*const session = require('express-session');

//var app = express()

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}))

// middleware to test if authenticated
function isAuthenticated (req, res, next) {
    if (req.session.user) next()
    else res.sendStatus(401)
}

app.post("/register", function (req, res) {
    console.log(req.body.username)


})

app.get('/', function (req, res) {
    // this is only called when there is an authentication user due to isAuthenticated
    /!*res.send('hello, ' + escapeHtml(req.session.user) + '!' +
        ' <a href="/logout">Logout</a>')*!/
    res.sendFile("/Frontend/index.html", {root: __dirname})

})

app.get('/', function (req, res) {
    res.send('<form action="/login" method="post">' +
        'Username: <input name="user"><br>' +
        'Password: <input name="pass" type="password"><br>' +
        '<input type="submit" text="Login"></form>')
})

app.post('/login', express.urlencoded({ extended: false }), function (req, res) {
    // login logic to validate req.body.user and req.body.pass
    // would be implemented here. for this example any combo works

    // regenerate the session, which is good practice to help
    // guard against forms of session fixation
    req.session.regenerate(function (err) {
        if (err) next(err)

        // store user information in session, typically a user id
        req.session.user = req.body.user

        // save the session before redirection to ensure page
        // load does not happen before session is saved
        req.session.save(function (err) {
            if (err) return next(err)
            res.redirect('/')
        })
    })
})

app.get('/logout', function (req, res, next) {
    // logout logic

    // clear the user from the session object and save.
    // this will ensure that re-using the old session id
    // does not have a logged in user
    req.session.user = null
    req.session.save(function (err) {
        if (err) next(err)

        // regenerate the session, which is good practice to help
        // guard against forms of session fixation
        req.session.regenerate(function (err) {
            if (err) next(err)
            res.redirect('/')
        })
    })
})*/

//______________________________________________________________________-

// New code (Fatima):

const oneDay = 1000 * 60 * 60 * 24

app.use(sessions({
    secret: "thisismysecretkey1234567890",
    saveUninitialized: true,
    cookie: {maxAge: oneDay},
    resave: false
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serving public file
app.use(express.static(__dirname));

app.use(cookieParser())

//username and password
const myusername = 'user1'
const mypassword = 'mypassword'

// a variable to save a session
var session;


app.get("/", (req, res) => {
    session = req.session
    if (session.userid) {
        res.redirect("/logged_in_index")
        //res.send("Welcome User! <a href = \'/logout'>Click to log out</a>")
    } else {
        res.sendFile("/Frontend/index.html", {root: __dirname})
    }
})

app.get('/logged_in_index', (req, res) => {
    res.sendFile(path.join(__dirname, "/Frontend/index_logged_in.html"), {
        headers: {
            'Content-Type': 'text/html'
        }
    });
});

app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, "/Frontend/index.html"), {
        headers: {
            'Content-Type': 'text/html'
        }
    });
});

app.get('/index.css', (req, res) => {
    res.sendFile(path.join(__dirname, "/Frontend/index.css"), {
        headers: {
            'Content-Type': 'text/css'
        }
    });
});

app.get('/index.js', (req, res) => {
    res.sendFile(path.join(__dirname, "/Frontend/index.js"), {
        headers: {
            'Content-Type': 'application/javascript'
        }
    });
});

app.get('/register.html', (req, res) => {
    res.sendFile(path.join(__dirname, "/Frontend/register.html"), {
        headers: {
            'Content-Type': 'text/html'
        }
    });
});

app.get('/register.css', (req, res) => {
    res.sendFile(path.join(__dirname, "/Frontend/register.css"), {
        headers: {
            'Content-Type': 'text/css'
        }
    });
});

app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, "/Frontend/login.html"), {
        headers: {
            'Content-Type': 'text/html'
        }
    });
});

app.get('/login.css', (req, res) => {
    res.sendFile(path.join(__dirname, "/Frontend/login.css"), {
        headers: {
            'Content-Type': 'text/css'
        }
    });
});


let users = [];

// Selbsterstellte Endpoints:
app.get("/register", (req, res) => {
    const { username, password } = req.body;

    const userExists = users.some(user => user.username === username);
    if (userExists) {
        //res.send('Username is already taken');
        res.redirect("/register_unsuccessful")
        return;
    }
    const newUser = {
        username,
        password
    };
    users.push(newUser);
    //res.send('User registered successfully');
    res.redirect("/register_successful")
})

app.get("/register_successful", (req, res) => {
    res.sendFile(path.join(__dirname, "/Frontend/register_successful.html"), {
        headers: {
            'Content-Type': 'text/html'
        }
    });
})

app.get("/register_unsuccessful", (req, res) => {
    res.sendFile(path.join(__dirname, "/Frontend/register_unsuccessful.html"), {
        headers: {
            'Content-Type': 'text/html'
        }
    });
})

app.get("/login", (req, res) => {
    const {username, password} = req.body;
    const user = users.find(user => user.username === username);
    if (user && user.password === password) {
        req.session.userid = username;
        //res.send("GET login Welcome User <a href=\'/logout'>click to logout</a>");
        res.sendFile(path.join(__dirname, "/Frontend/index_logged_in.html"), {
            headers: {
                'Content-Type': 'text/html'
            }
        });
    } else {
        return res.redirect('register_unsuccessful.html');
    }
})


app.post('/user',(req,res) => {
    if(req.body.username == myusername && req.body.password == mypassword){
        session=req.session;
        session.userid=req.body.username;
        console.log(req.session)
        res.send(`POST USER Hey there, welcome <a href=\'/logout'>click to logout</a>`);
    }
    else{
        res.send('Invalid username or password');
    }
})


app.get("/profile", (req, res) => {
    //res.redirect("profile.html")
    res.sendFile(path.join(__dirname, "/Frontend/profile.html"), {
        headers: {
            'Content-Type': 'text/html'
        }
    });
    //res.redirect("profile.html")
})

/*app.get('/register.html', (req, res) => {
    res.sendFile(path.join(__dirname, "/Frontend/register.html"), {
        headers: {
            'Content-Type': 'text/html'
        }
    });
});*/

app.get("/logout.html", (req, res) => {
    res.sendFile(path.join(__dirname, "/Frontend/logout.html"), {
        headers: {
            'Content-Type': 'text/html'
        }
    });
})

/*app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, "/Frontend/index.html"), {
        headers: {
            'Content-Type': 'text/html'
        }
    });
});*/

/*app.put("/", (req, res) => {
    //...


})*/

app.delete("/userdelete", (req, res) => {

})




app.get('/logout.html',(req,res) => {
    req.session.destroy();
    res.sendFile(path.join(__dirname, "/Frontend/logout.html"), {
        headers: {
            'Content-Type': 'text/html'
        }
    });
    //res.redirect('logout.html');
});


//_________________________________________________________________

/*app.get('/login', function(req, res) {
    res.render('login');
});*/


/*app.get("/getweather", async function (req, res) {
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

app.get("/", checkAuthenticated, (req, res) => {
    res.render("index.ejs", {name: req.user.name})
})

app.get("/login", checkNotAuthenticated, (req, res) => {
    res.render("login.ejs")
})

app.post("/login", checkNotAuthenticated,  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

app.get("/register", checkNotAuthenticated, (req, res) => {
    res.render("register.ejs")
})

app.post("/register", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect("/login")
    } catch {
        res.redirect("/register")
    }
    console.log(users)
})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}

app.delete("/logout", (req, res, next) => {
    req.logOut(function (err) {
        if (err) {
            return next(err)
        }
    })
    res.redirect('/login')
})*/




app.listen(3000);

console.log("Server now listening on http://localhost:3000");