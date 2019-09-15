var express = require('express');
const OAuthClientDiscord = require("disco-oauth")
var router = express.Router();
const { client, config} = require("../../index")
const { musicdb } = require("../../commands/music")


let OAuthClient = new OAuthClientDiscord("585521607875756042", "s4aitv5PbZf7696b0kx0z2-6qR7goToA")
OAuthClient.setScopes(["identify", "email", "guilds"])
OAuthClient.setRedirect("http://192.168.0.13:3000/queue/login")






module.exports = router;
