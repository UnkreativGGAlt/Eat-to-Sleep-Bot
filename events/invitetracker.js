const { client, config} = require('../index.js')
const { RichEmbed } = require('discord.js')
var schedule = require('node-schedule');

const invites = {};

client.on('ready', () => {
    var j = schedule.scheduleJob("*/30 * * * * *", function(){

        client.guilds.forEach(g => {
            g.fetchInvites().then(guildInvites => {
              invites[g.id] = guildInvites;
            });
          });
       
       });
 
});

client.on('guildMemberAdd', member => {
    try {
        member.guild.fetchInvites().then(async guildInvites => {
            const ei = invites[member.guild.id];
            invites[member.guild.id] = guildInvites;
            const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
            const inviter = client.users.get(invite.inviter.id);
            const INVITES = require("../models/INVITES")
            var   invitedb = await INVITES.find({"code": invite.code})
            if (invitedb.length < 1) return;

            client.channels.get("644283425389412357").send(new RichEmbed().setColor("#00cec9").setDescription(`${member.user.tag} ist dem Server mit \`${invite.code}#${invitedb[0].tag}\` beigetreten. Der Invite wurde jetzt schon ${invite.uses} mal benutzt`));
          });
    } catch (error) {
    
    }
    
  });