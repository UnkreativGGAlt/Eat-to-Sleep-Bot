const { client, config} = require("../../index")
const { RichEmbed } = require('discord.js')
const Main = require('../../index')
const fs      = require("fs");

const express = require("express");
const fetch = require('node-fetch');
const btoa = require('btoa');


const app = express.Router();

app.get('/', (req, res) => {
    res.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=${config.Oauth.CLIENT_ID}&scope=identify&response_type=code&redirect_uri=${config.Oauth.redirect}`);
});

app.get('/callback', async (req, res) => {
    if (!req.query.code) {
    res.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=${config.Oauth.CLIENT_ID}&scope=identify&response_type=code&redirect_uri=${config.Oauth.redirect}`);        
    return;
    }
    const code = req.query.code;
    const creds = btoa(`${config.Oauth.CLIENT_ID}:${config.Oauth.CLIENT_SECRET}`);
    const response = await fetch(`https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${config.Oauth.redirect}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${creds}`,
      },
    });
    const json = await response.json();
    console.log(json)
    res.cookies.set("key", JSON.stringify({token_type: json.token_type ,access_token: json.access_token, refresh_token: json.refresh_token}))
    res.redirect("/")
    
  });

module.exports = app;