const { RichEmbed } = require('discord.js')
//     30    18    *    *    1
// ┬    ┬    ┬    ┬    ┬    ┬
// │    │    │    │    │    │
// │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
// │    │    │    │    └───── month (1 - 12)
// │    │    │    └────────── day of month (1 - 31)
// │    │    └─────────────── hour (0 - 23)
// │    └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)

var channelMclass = require("../channel-management/ChannelM-class")

var MMK = new channelMclass("30 18 * * 1",
"30 19 * * 1",
"Monday Mario Kart",
"Talk",
"Mario Kart Infos",
new RichEmbed()
.setColor("#0984e3")
.setThumbnail("https://www.mariowiki.com/images/thumb/7/71/Crazy8MK8.png/1200px-Crazy8MK8.png")
.setTitle("Monday Mario Kart").setDescription("Das heutige Monday Mario Kart auf Eat, Sleep, Nintendo, Repeat hat nun begonnen")
.addField("Infos:", "Start: 18:30 Uhr\nEnde: 19:30 Uhr\nTurnier Code: 2442-6453-9691")
.addField("Eure Teilnahme Geschenke:", "2* XP Boost in MMK Talks"),
"585523787408212079",
"585523787408212079"
)

var Minecraft_Mittwoch = new channelMclass("00 19 * * 3",
"00 20 * * 3",
"Minecraft Mittwoch",
"Talk",
"Minecraft Chat",
new RichEmbed()
        .setColor("#0984e3")
        .setThumbnail("https://gamepedia.cursecdn.com/minecraft_de_gamepedia/7/7c/Grasblock.png")
        .setTitle("Minecraft Mittwoch").setDescription("Das heutige Minecraft Mittwocht auf Eat, Sleep, Nintendo, Repeat hat nun begonnen")
        .addField("Infos:", "Start: 19:00 Uhr\nEnde: 20:00 Uhr")
        .addField("Eure Teilnahme Geschenke:", "2* XP Boost in allen Minecraft Talks"),
"585523787408212079",
"585523787408212079"
)
