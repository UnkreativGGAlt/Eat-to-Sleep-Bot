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

var MMK = new channelMclass(
"30 18 * * 1", //start time
"30 19 * * 1", //end time
"Monday Mario Kart", //Event Name
"Talk", // Talk Name ">>Talk<< 1", ">>Talk<< 2"
"Mario Kart Infos", //Text Channel Name
new RichEmbed() //Embed wish will be send in the Text Channel 
.setColor("#0984e3")
.setThumbnail("https://www.mariowiki.com/images/thumb/7/71/Crazy8MK8.png/1200px-Crazy8MK8.png")
.setTitle("Monday Mario Kart").setDescription("Das heutige Monday Mario Kart auf Eat, Sleep, Nintendo, Repeat hat nun begonnen")
.addField("Infos:", "Start: 18:30 Uhr\nEnde: 19:30 Uhr\nTurnier Code: 2442-6453-9691")
.addField("Eure Teilnahme Geschenke:", "2* XP Boost in MMK Talks"),
"585523787408212079", //Copie Permission from this Categorie ID
"585523787408212079",  //Send Members back to this Categorie ID
true, //xp x 2 > true or false
)

var Minecraft_Mittwoch = new channelMclass(
"00 19 * * 3",
"00 20 * * 3",
"Minecraft Mittwoch",
"Talk",
"Minecraft Chat",
new RichEmbed()
        .setColor("#badc58")
        .setThumbnail("https://gamepedia.cursecdn.com/minecraft_de_gamepedia/7/7c/Grasblock.png")
        .setTitle("Minecraft Mittwoch").setDescription("Der heutige Minecraft Mittwocht auf Eat, Sleep, Nintendo, Repeat hat nun begonnen")
        .addField("Infos:", "Start: 18:30 Uhr\nEnde: 19:30 Uhr")
        .addField("Eure Teilnahme Geschenke:", "2* XP Boost in allen Minecraft Talks"),
"585523787408212079",
"585523787408212079",
true
)

var Awfull_Donnerstag = new channelMclass(
        "00 18 * * 4", //start time
        "30 19 * * 4", //end time
        "Drawful Donnerstag", //Event Name
        "Awful Talk", // Talk Name ">>Talk<< 1", ">>Talk<< 2"
        "Awful Drawful Chat", //Text Channel Name
        new RichEmbed() //Embed wish will be send in the Text Channel 
        .setColor("#f800c6")
        .setThumbnail("https://cdn1.epicgames.com/epic/offer/Drawful2_Logo-1180x1035-ac2814fad78ad10f96a37ffc6ca4cf9d.png?h=854&resize=1&w=640")
        .setTitle("Drawful Donnerstag").setDescription("Der heutige Drawful Donnerstag auf Eat, Sleep, Nintendo, Repeat hat nun begonnen")
        .addField("Infos:", "Start: 18:00 Uhr\nEnde: 19:30 Uhr\n")
        .addField("Erklärung zum Spiel:", "Drawful 2 ist ein Game in dem man nur einen Internet Browser z.b auf dem Handy oder einen PC, und einen Host (Discord Video Stream) braucht. In Drawful zeichnet jeder ein Objekt was eig. ziemlich schwer zu zeichnen ist. Alle anderen müssen dann versuchen zu beschreiben was das Objekt darstellen soll und bekommen dem entsprechend Punkte. Klingt erstmal langweilig ist aber meistens ziemlich lustig und sorgt für Lachkrämpfe. Ich hoffe das gibt euch eine Idee was Drawful ist ^^")
        .addField("Was brauchst du:", "Ein Handy oder einen PC sowie eine Internet Verbindung")
        .addField("Eure Teilnahme Geschenke:", "2* XP Boost in MMK Talks"),
        "585523787408212079", //Copie Permission from this Categorie ID
        "585523787408212079",  //Send Members back to this Categorie ID
        true, //xp x 2 > true or false
        )