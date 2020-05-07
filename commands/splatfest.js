module.exports = {
	name: 'splatfest',
	description: 'Just a little dev command',
    usage: `splatfest [id]` ,
	execute(message, args) {
       

        const { client, config} = require('../index')
        const { RichEmbed } = require('discord.js')
        const colour = require("../colours.json")
        const Discord = require('discord.js');

        const puppeteer = require('puppeteer');

        const viewport = {
            width: 1012,
            height: 600,
            deviceScaleFactor: 2,
        };
        

        (async () => {
            const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
            const page = await browser.newPage();
            page.setViewport(viewport)
            await page.goto("http://localhost:6677/splatfest/" + args[0], {
                waitUntil: 'networkidle0', // Wait until the network is idle
            });
            var screenshot = await page.screenshot();
            const attachment = new Discord.Attachment(screenshot, `SPOILER_Splatfestresult.png`);
            message.channel.send(attachment)
          
            await browser.close();
          })();
        
       
	},
};