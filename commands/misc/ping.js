const { SlashCommandBuilder, Client, ChatInputCommandInteraction } = require("discord.js");

const command = new SlashCommandBuilder()
	.setName('ping')
	.setDescription('Replies with Pong!')
	.setDMPermission(false)
/**
 * 
 * @param {Client} client 
 * @param {ChatInputCommandInteraction} interaction 
 */
async function execute(client, interaction) {
	await interaction.deferReply()

	const laden = await interaction.editReply({ content: "ladenn....." })
	
	const ws = interaction.client.ws.ping
	const Api = Date.now() - laden.createdTimestamp;
	
	let totalSeconds = (client.uptime / 1000);
	let days = Math.floor(totalSeconds / 86400);
	totalSeconds %= 86400;
	let hours = Math.floor(totalSeconds / 3600);
	totalSeconds %= 3600;
	let minutes = Math.floor(totalSeconds / 60);
	let seconds = Math.floor(totalSeconds % 60);
	let uptime = `${days} dagen, ${hours} uren, ${minutes} minuten en ${seconds} seconden`;
	console.log(uptime);
	const embed = new EmbedBuilder()
		.setTitle(`Ping - ${interaction.guild.name}`)
		.setURL("https://discord.gg/NtDeTbBJDk")
		.setColor("Blue")
		.setFooter({ text: "Made by - Developing By Julian (JulianRJC en harm.f)" })
		.addFields(
			{
				name: 'Client:',
				value: `${ws}ms`,
			},
			{
				name: 'API',
				value: `${Api}`
			},
			{
				name: "Uptime",
				value: `\ ${uptime}`
			}
		)
	
	await laden.edit({ embeds: [embed], ephemeral: true, content: "" })
}
module.exports = {
	catagory: "Misc",
	data: command,
	execute: execute
}







