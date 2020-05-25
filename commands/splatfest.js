module.exports = {
	name: 'splatfest',
	description: 'Mit diesem Command könnt ich euch die Ergebnisse des aktuellen Splatoon 2 Splatfestes anzeigen lassen (falls vorhanden)',
    usage: `splatfest` ,
	execute(message, args) {
       

        const { client, config} = require('../index')
        const { RichEmbed } = require('discord.js')
        const colour = require("../colours.json")
        const Discord = require('discord.js');
        const fetch = require("node-fetch")

        const puppeteer = require('puppeteer');

        const viewport = {
            width: 720,
            height: 1000,
            deviceScaleFactor: 2,
        };

        var apiData = fetch('https://splatoon2.ink/data/festivals.json').then(res => res.json());
apiData.then(function (json) {
        (async () => {
            const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
            const page = await browser.newPage();
            page.setViewport(viewport)

            await page.setRequestInterception(true);
            
            page.on('request', request => {
                // Do nothing in case of non-navigation requests.
                if (!request.isNavigationRequest()) {
                  request.continue();
                  return;
                }
                // Add a new header for navigation request.
                const headers = request.headers();
                headers["cookie"] = `iksm_session=${config.tokens.nintendo}; lang=de-DE;`;
                request.continue({ headers });
              });
            
            await page.goto("https://app.splatoon2.nintendo.net/records/festival/" + json.eu.festivals[0].festival_id, {
                waitUntil: 'networkidle0', // Wait until the network is idle
            });
            var screenshot = await page.screenshot();
            const attachment = new Discord.Attachment(screenshot, `SPOILER_Splatfestresult.png`);
            message.channel.send(attachment)
          
            await browser.close();
          })();
        
        })
	},
};