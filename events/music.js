const { client, config} = require('../index')
const { RichEmbed } = require('discord.js')
const colour = require("../colours.json")
const fs      = require("fs");

const queue = new Map();

prefix = config.prefix

const ytdl = require('ytdl-core');
const clientS = require('soundoftext-js');

client.on('message', async message => {
	if (message.author.bot) return;
	if (!message.content.startsWith(config.prefix)) return;

	const serverQueue = queue.get(message.guild.id);

	if (message.content.startsWith(`${prefix}play`)) {
		execute(message, serverQueue);
		return;
	} else if (message.content.startsWith(`${prefix}skip`)) {
		skip(message, serverQueue);
		return;
	} else if (message.content.startsWith(`${prefix}stop`)) {
		stop(message, serverQueue);
		return;
	} else {
	}
});

async function execute(message, serverQueue) {
	const args = message.content.split(' ');

	const voiceChannel = message.member.voiceChannel;
	if (!voiceChannel) return message.channel.send(new RichEmbed().setColor(colour.rot).setDescription("Du musst in einem Voice Channel sein um Musik abspielen zu können!"));
	const permissions = voiceChannel.permissionsFor(message.client.user);
	if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
		return message.channel.send(new RichEmbed().setColor(colour.rot).setDescription("Ich habe nicht genug Rechte um in deinen Voicechannel zu joinen! Das ist also nicht dein Fehler, sondern der Fehler der Server Owner"));
	}
	const songInfo = await ytdl.getInfo(args[1]);
	const song = {
		title: songInfo.title,
    url: songInfo.video_url,
    author: songInfo.author
	};

	if (!serverQueue) {
		const queueContruct = {
			textChannel: message.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true,
		};

		queue.set(message.guild.id, queueContruct);

		queueContruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueContruct.connection = connection;
			play(message.guild, queueContruct.songs[0]);
		} catch (err) {
			console.log(err);
			queue.delete(message.guild.id);
			return message.channel.send(new RichEmbed().setColor(colour.rot).setTitle("Ein Fehler ist Aufgetreten").setDescription(err));
		}
	} else {
		serverQueue.songs.push(song);
		return message.channel.send(new RichEmbed().setColor(colour.blau).setDescription(`Der Song \"[${song.title}](${song.url})\" von \"[${song.author.name}](${song.author.channel_url})\" wurde zur Queue hinzugefügt`));
	}

}

function skip(message, serverQueue) {
	if (!message.member.voiceChannel) return message.channel.send(new RichEmbed().setColor(colour.rot).setDescription("Du kannst keine Songs skippen wenn du nicht im selben Voice Channel bist in dem Musik abgespielt wird"));
	if (!serverQueue) return message.channel.send(new RichEmbed().setColor(colour.rot).setDescription("Es gibt keinen Song den ich skippen kann"));
  serverQueue.connection.dispatcher.end();
  message.channel.send(new RichEmbed().setColor(colour.rot).setDescription("Der Song wurde geskippt"));
}

function stop(message, serverQueue) {
	if (!message.member.voiceChannel) return message.channel.send(message.channel.send(new RichEmbed().setColor(colour.rot).setDescription("Du kannst keine Songs stoppen wenn du nicht im selben Voice Channel bist in dem Musik abgespielt wird")));
	serverQueue.songs = [];
	serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', () => {
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => {
			console.error(error);
		});
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
}

//dc when channel is emty
client.on("voiceStateUpdate", (oldm, newm) => {
  if (oldm.guild.voiceConnection){
    if (oldm.guild.voiceConnection.channel.members.size == 1){
      servers[oldm.guild.id].queue = []
      servers[oldm.guild.id].loop = false
      servers[oldm.guild.id].ls = 0.5
      servers[oldm.guild.id].dispatcher.end();

    }
  }
})


