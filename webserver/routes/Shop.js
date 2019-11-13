const { client, config} = require("../../index")
const { RichEmbed } = require('discord.js')
const Main = require('../../index')
const fs      = require("fs");

const express = require("express");
const fetch = require('node-fetch');
const btoa = require('btoa');

const { getDiscorduser } = require("../webmain")


const app = express.Router();


app.get("/", async (req, res) => {

    let key = req.cookies.get("key")
  
    let user = await getDiscorduser(key)

    if (user != false){

    
       res.render("shop", {
           user: user
       })

    }
    else {
      res.render("shop",{
        DisordOAuth2: "/login"
    })
    }


})

module.exports = app;