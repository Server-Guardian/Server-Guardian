
const { Events, EmbedBuilder, ChatInputCommandInteraction } = require('discord.js');
/**
 * @param {ChatInputCommandInteraction} interaction
 */
async function execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    console.log(`${interaction.commandName} Started `);
    const e = new EmbedBuilder()
        .setTimestamp()
        .setTitle("NIEUWE ERROR")
        .setDescription("Er is een error opgetreden")
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        return;
    }

    try {
        await command.execute(interaction.client, interaction);
    } catch (error) {
        e.addFields({ name: "Error", value: `${error}` })
        console.log(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'Er is een error opgetreden tijndens het uitvoeren van je command!', embeds: [e], ephemeral: true });
        } else {
            await interaction.reply({ content: 'Er is een error opgetreden tijndens het uitvoeren van je command!', embeds: [e], ephemeral: true });
        }
    }


}

module.exports = {
    name: Events.InteractionCreate, execute
}