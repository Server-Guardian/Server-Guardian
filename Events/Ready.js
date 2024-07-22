const { Events, ActivityType } = require('discord.js');
const client = require("../src/botClient")
require("dotenv").config()
module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(c) { // Andere client wordt gebruikt
		console.log(`✅| ${client.user.username} (Client)`)
		console.log(`${client.guilds.cache.size} | Guilds`);
		client.guilds.cache.forEach((index, guild) => {
			console.log(`${guild} | ${index.name}`);
		})
		// mongoose.connect(`mongodb+srv://admin:admin@cluster.5rcydhk.mongodb.net/?retryWrites=true&w=majority&appName=cluster`)
		// 	.then(
		// 		console.log("✅| Database")
		// 	) // Andere DB
			const activities = [
				{ name: 'Server Guardian!!', type: ActivityType.Listening },
				{ name: 'Gemaakt door Harm.F en JulianRJC', type: ActivityType.Listening },
			];
		// client.user.setActivity('MONSTERGANG!!', { type: ActivityType.Listening })

		function setRandomActivity() {
			const randomActivity = activities[Math.floor(Math.random() * activities.length)];
			client.user.setActivity(randomActivity.name, { type: randomActivity.type });
		}
		client.user.setPresence({activites: [{name: 'MONSTERGANG'}], status: "online"})

		// Stel de activiteit in wanneer de bot voor het eerst online komt
		setRandomActivity();
	
		// Wijzig de activiteit elke 30 minuten
		setInterval(setRandomActivity, 1 * 60 * 1000); // 1 minuut in milliseconden
	},
};
