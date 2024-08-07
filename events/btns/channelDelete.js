const { Events, EmbedBuilder, ChatInputCommandInteraction, ButtonInteraction } = require('discord.js');
/**
 * 
 * @param {ButtonInteraction} interaction 
 */

const map = require("../logs/channeldelete").channels
async function execute(interaction) {
    if (!interaction.isButton()) return
    if (!interaction.customId.startsWith("recr")) {return}
const id = interaction.customId
console.log(`Id: ${id}`);
const [action, channelId] = id.split('-');
const channel = map.get(channelId)
console.log(channel);

const { name, type, parentId, topic, nsfw, rateLimitPerUser } = channel.channel;
console.log(`name: ${name}`);
try {
    const newChannel = await interaction.guild.channels.create({
        name,
        type,
        parent: parentId,
        topic, 
        nsfw, 
        rateLimitPerUser
    });

    await interaction.reply({ content: `Kanaal "${newChannel.name}" aangemaakt.` });
} catch (error) {
    console.error(error);
    await interaction.reply({ content: 'Er is een fout opgetreden bij het aanmaken van het kanaal.' });
}
}
module.exports = {
	name: Events.InteractionCreate,
	execute
	
};