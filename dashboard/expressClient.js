
//Imports

require("dotenv").config()
const express = require("express");
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require("path")
const app = express()

// Router imports 


const router_index = require("./routers/index")
const router_discordAuth =require("./routers/discordAuth")
// Sessie opslag

// const store = new mongoDBStore({
// 	uri: process.env.DATABASE,
// 	collection: "sessies"
// })

// Auth Sessie

// app.use(session({
// 	secret: "MT",
// 	resave: false,
// 	saveUninitialized: true,
// 	store: store
// }))

// Bodyparses

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// EJS 

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs")

//Static

app.use('/static', express.static(path.join(__dirname, 'public')))

// Routers


app.use(router_index)
app.use(router_discordAuth)


//Export

module.exports = app