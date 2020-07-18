const { client, config} = require('../index.js')
const { RichEmbed } = require('discord.js')
const colour = require("../colours.json")
const fs = require("fs")

var items = []

const itemFiles = fs.readdirSync(__dirname + '\\shop').filter(file => file.endsWith('.js'));
for (const file of itemFiles) {
	const item = require(__dirname + "\\shop\\" + file);

    client.shop_items.set(item.id, item);
    items.push({name: item.name, id: item.id, des: item.description, a: item.amount})
}

items = items.sort(function(a, b){
    return a.id - b.id;
});

client.channels.get("728261970851004446").fetchMessage("728262106176159755").then(m => {
var embed = new RichEmbed().setColor("RANDOM").setTitle("Eat, Sleep - Shop").setFooter("Um etwas zu kaufen musst du '_buy <item nummer>' in einen anderen Chat eingeben")

items.forEach(i => {
    embed.addField(`${i.id}. ` + i.name, `**Preis:** ${i.a}<:EatSleepCoin:725823305008939058>\n**Beschreibung:** ${i.des}`, true)
})

setTimeout(() => {m.edit(embed)
}, 10000)
})