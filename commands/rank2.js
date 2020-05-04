module.exports = {
	name: 'rank2',
	description: 'Dev Stuff',
    usage: `rank2` ,
	execute(message, args) {

        const { client, config} = require('../index')
        const { RichEmbed } = require('discord.js')
        const colour = require("../colours.json")
        const Discord = require('discord.js');

        const puppeteer = require('puppeteer');

        const viewport = {
            width: 700,
            height: 250,
            deviceScaleFactor: 2,
        };
        

        (async () => {
            const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
            const page = await browser.newPage();
            page.setViewport(viewport)
            await page.goto("http://localhost:6677/rankcard/" + message.author.id, {
                waitUntil: 'networkidle0', // Wait until the network is idle
            });
            var screenshot = await page.screenshot();
            const attachment = new Discord.Attachment(screenshot, `Huh.png`);
            message.channel.send(attachment)
          
            await browser.close();
          })();
        
       
	},
};