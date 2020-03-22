const { client, config} = require('../../index')
const { RichEmbed } = require('discord.js')
const colour = require("../../colours.json")
const fs      = require("fs");
var schedule = require('node-schedule');
const Canvas = require('canvas');
const Discord = require('discord.js');

const MEMBER = require("../../models/MEMBER")


client.on("message", async message => {

    if(message.author.bot || message.channel.type === "dm") return;

    let prefix = config.prefix;
    let messageArray = message.content.split(" ")
    let alias = messageArray[0].replace(prefix, "");
    let args = messageArray.slice(1);
    

    if (message.content.startsWith(prefix)){
    if (alias == "rank"){
    
    const applyText = (canvas, text) => {
        const ctx = canvas.getContext('2d');
    
        // Declare a base size of the font
        let fontSize = 70;
    
        do {
            // Assign the font to the context and decrement it so it can be measured again
            ctx.font = `${fontSize -= 10}px sans-serif`;
            // Compare pixel width of the text to the canvas minus the approximate avatar size
        } while (ctx.measureText(text).width > canvas.width - 300);
    
        // Return the result to use in the actual canvas
        if (parseInt(ctx.font.replace("px sans-serif")) > 50){ctx.font = "50px sans-serif"}
        console.log(ctx.font)
        return ctx.font;
    };
    
    if (!args[0]){
        var memberdb = await MEMBER.find({"info.id": message.author.id})

        let rank = memberdb[0].ranks.rank
        let xp = memberdb[0].ranks.xp
    
        const canvas = Canvas.createCanvas(700, 250);
        const ctx = canvas.getContext('2d');
        
        
        const background = await Canvas.loadImage("https://picsum.photos/705/255.jpg");
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
    
    
        ctx.fillStyle = "#2C2F33"
        ctx.fillRect(canvas.width / 2.6, canvas.height / 4, 400, 160)
        
        
        
        
        ctx.font = applyText(canvas, message.member.displayName + "#" + message.member.user.discriminator)
        ctx.fillStyle = '#7289DA';
        ctx.fillText(message.member.displayName + "#" + message.member.user.discriminator, canvas.width / 2.5, canvas.height / 1.8);
        //ctx.strokeText(message.member.displayName + "#" + message.member.user.discriminator, canvas.width / 2.5, canvas.height / 1.8)
    
        ctx.font = '35px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Rankcard from:', canvas.width / 2.5, canvas.height / 2.6);
        //ctx.strokeText('Rankcard from:', canvas.width / 2.5, canvas.height / 2.6);
        
        ctx.font = '28px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`Level: ${rank}`, canvas.width / 2.5, canvas.height / 1.4);
       //ctx.strokeText(`Level: ${rank}`, canvas.width / 2.5, canvas.height / 1.4);
        
        ctx.font = '28px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`xp: ${xp}`, canvas.width / 2.5, canvas.height / 1.2);
        //ctx.strokeText(`xp: ${xp}`, canvas.width / 2.5, canvas.height / 1.2);
    
        ctx.beginPath();
        ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
    
        const avatar = await Canvas.loadImage(message.author.displayAvatarURL);
        ctx.drawImage(avatar, 25, 25, 200, 200);
        
        const attachment = new Discord.Attachment(canvas.toBuffer(), `Rankcard from ${message.author.username}.png`);
        message.channel.send(attachment).then(m => setTimeout(() => {if(m.deletable){m.delete}
    if(message.deletable){message.delete()}}, 1200000))
        
    }

    else {
        var user = client.users.get(args[0].replace("<@", "").replace(">", "").replace("!", ""))
        var memberdb = await MEMBER.find({"info.id": user.id})

        let rank = memberdb[0].ranks.rank
        let xp = memberdb[0].ranks.xp
    
        const canvas = Canvas.createCanvas(700, 250);
        const ctx = canvas.getContext('2d');
        
        
        const background = await Canvas.loadImage("https://picsum.photos/705/255.jpg");
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    
        
        //ctx.strokeStyle = '#000000';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#2C2F33"
        ctx.fillRect(canvas.width / 2.6, canvas.height / 4, 400, 160)
        
        ctx.font = applyText(canvas, user.username + "#" + user.discriminator)
        ctx.fillStyle = '#ffffff';
        ctx.fillText(user.username + "#"  + user.discriminator, canvas.width / 2.5, canvas.height / 1.8);
        //ctx.strokeText(message.member.displayName + "#" + message.member.user.discriminator, canvas.width / 2.5, canvas.height / 1.8)
    
        ctx.font = '35px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Rankcard from:', canvas.width / 2.5, canvas.height / 2.6);
        //ctx.strokeText('Rankcard from:', canvas.width / 2.5, canvas.height / 2.6);
        
        ctx.font = '28px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`Level: ${rank}`, canvas.width / 2.5, canvas.height / 1.4);
       //ctx.strokeText(`Level: ${rank}`, canvas.width / 2.5, canvas.height / 1.4);
        
        ctx.font = '28px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`xp: ${xp}`, canvas.width / 2.5, canvas.height / 1.2);
        //ctx.strokeText(`xp: ${xp}`, canvas.width / 2.5, canvas.height / 1.2);
    
        ctx.beginPath();
        ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
    
        const avatar = await Canvas.loadImage(user.displayAvatarURL);
        ctx.drawImage(avatar, 25, 25, 200, 200);

        ctx.fillStyle = 'rgba(255,0,0, 0.5)';
        ctx.fillRect(0,0,100,100);
        
        const attachment = new Discord.Attachment(canvas.toBuffer(), `Rankcard from ${user.username}.png`);
        message.channel.send(attachment).then(m => setTimeout(() => {if(m.deletable){m.delete}
    if(message.deletable){message.delete()}}, 1200000))
    }
    
    

}
        if (alias == "setrank"){
            if (client.guilds.get(message.channel.guild.id).members.get(message.author.id).hasPermission("BAN_MEMBERS")){
            var operation = args[2]
            var what = args[1]
            var zahl = parseInt(args[3])
            var userid = args[0].replace("<@", "").replace(">", "").replace("!", "")
            

            if (message.channel.guild.members.find(x => x.id === userid)){
                if(operation == "+" || operation == "-"){
                    var member = await MEMBER.find({"info.id": userid})

                    let rank = member[0].ranks.rank
                    let xp = member[0].ranks.xp


                    if (what == "xp" || what == "level" || what == "rank"){
                        if (what == "rank"){what = "level"}
                        if (what == "level"){
                            if (operation == "+"){rank += zahl}
                            if (operation == "-"){rank -= zahl}
                        }
                        if (what == "xp"){
                            if (operation == "+"){xp += zahl}
                            if (operation == "-"){xp -= zahl}
                        }
                        await MEMBER.findOneAndUpdate({"info.id": userid}, {"ranks.xp": xp, "ranks.rank": rank}, (err, res) => {if (err){console.log(err)}})

                        message.reply("Ich habe erfolgreich denn ranking Wert von " + client.users.get(userid).username + " auf " + rank + ":" + xp + " gesetzt.")

                    }
                    else {message.reply("Du kannst nur denn Wert von XP und Level bestimmen")}
                    
                }
                else {message.reply("Du kannst nur + oder - machen")}
            }
            else {message.reply("Kann User nicht finden")}
        }
        else (message.reply("Du hast keine Berechtigung dafür"))
    }
    
    if (alias == "payrank"){
        
        if (!args[0] || !args[1]){
            message.channel.send(
                new RichEmbed().setColor(colour.rot).setTitle("Ehhh")
                .setDescription("Du hast da was falsch gemacht. Lass mich dir helfen```" + config.prefix + "payrank @user#1234 5```Dieser Command würde dem User 5 Level von deinem Konto auf seins übergeben")
            )
    return;}
        if (args[0] && client.users.find(x => x.id == args[0].replace("<@", "").replace(">", "").replace("!", ""))){
            
            const oldm = message.author
            const newm = client.users.get(args[0].replace("<@", "").replace(">", "").replace("!", ""))
            const howmuch = parseInt(args[1])

            var member = await MEMBER.find({"info.id": oldm.id})

                    let rank = member[0].ranks.rank
                    let xp = member[0].ranks.xp

                    var nmember = await MEMBER.find({"info.id": newm.id})

                    let nrank = nmember[0].ranks.rank
                    let nxp = nmember[0].ranks.xp

            if(rank < howmuch){
            message.channel.send(new RichEmbed().setColor(colour.rot).setTitle("Die Eat Sleep Bank hat geantwortet").addField("Dein Guthaben reicht leider nicht aus", "Sorry. Wir konnten den Nutzer leider nicht die angegebene Summe überweisen da du nicht genügend Level hast"))                
            return;
            }
            
            message.channel.send(
                new RichEmbed().setTitle("Überweisungs wird ausgeführt...").setDescription("Die Überweisung wird in Kürze ausgeführt, nachdem sie vom Banksystem verifiziert wurde")
                ).then(m => {
                    if(howmuch < 1){
                        m.edit(new RichEmbed().setColor(colour.rot).setTitle("Die Eat Sleep Bank hat geantwortet").addField("Diese Aktion wurde von der Bank abgebrochen", "Der Grund dafür ist unbekannt"))                
                        return;
                    }

                    rank = rank - howmuch
                    nrank = nrank + howmuch
                   async function die() {

                    await MEMBER.findOneAndUpdate({"info.id": oldm.id}, {"ranks.rank": rank}, (err, res) => {if (err){console.log(err)}})
                    await MEMBER.findOneAndUpdate({"info.id": newm.id}, {"ranks.rank": nrank}, (err, res) => {if (err){console.log(err)}})
                }
                die()

                   setTimeout(() => {m.edit(new RichEmbed().setColor(colour.blau).setTitle("Überweisungs wurde ausgeführt").setDescription("Die Überweisung war erfolgreich und wurde ausgeführt"))}, 5000)
                }
            )

                    
            

        }
        else {
            message.channel.send(new RichEmbed().setColor(colour.rot).setTitle("Die Eat Sleep Bank hat geantwortet").addField("Member nicht gefunden", "Sorry. Wir konnten den Nutzer nicht finden auf dem wir das Geld überweißen sollen. Also haben wir es einfach abgezogen lol. Das war natürlich ein Spaß Kappa, Kappa"))
        }
    }

    
}   
    
})