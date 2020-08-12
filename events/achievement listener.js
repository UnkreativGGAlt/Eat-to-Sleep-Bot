const { client, config, database} = require('../index')
var ioClient = require('socket.io-client');
const puppeteer = require('puppeteer');
const { raw } = require('body-parser');
const Discord = require('discord.js');

var Websocket = ioClient("http://192.168.0.34:3000")

Websocket.on('connect', function(){
    console.log("Achievement System connnection active!")
    Websocket.emit("auth", config.tokens.achievement_auth)
})


client.on("raw", packet => {
    Websocket.emit("event", packet)
})

Websocket.on("achievement.done", async packet => {
    console.log(packet)

    const viewport = {
        width: 700,
        height: 250,
        deviceScaleFactor: 2,
    };

    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
            const page = await browser.newPage();
            page.setViewport(viewport)


            await page.goto(packet.url, {
                waitUntil: 'networkidle0', // Wait until the network is idle
            });
            var screenshot = await page.screenshot();
            const attachment = new Discord.Attachment(screenshot, `new_achievement.png`);
            client.users.get(packet.user).send(attachment)
          
            await browser.close();
})


Websocket.connect()