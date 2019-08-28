const { client, config} = require('../index')
const { RichEmbed } = require('discord.js')
const colour = require("../colours.json")
const fs      = require("fs");
var schedule = require('node-schedule');

const ytdl = require('ytdl-core');
const clientS = require('soundoftext-js');

