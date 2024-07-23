const { Events, Message, ActionRowBuilder, ButtonBuilder, ButtonStyle, Embed, EmbedBuilder } = require('discord.js');
const userActions = new Map()
const client = require("../../src/botClient")
/**
 * 
 * @param {Message} message 
 */
async function execute(message) {
    if (message.author.bot) return;
    const linkRegex = /(http:\/\/|https:\/\/|www\.)/i;

    let logChannelId = "1265028864397283349"
    let SupportID = "1263921359285649458"
    const logChannel = await client.channels.fetch(logChannelId);


    if (linkRegex.test(message.content) & !(message.member.roles.cache.get(SupportID)) & !(message.channel.name.startsWith("ticket-"))) {
        message.delete()
        const actionRow = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId(`warn-${message.id}`)
                .setLabel('Waarschuwing')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId(`kick-${message.id}`)
                .setLabel('Kick')
                .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
                .setCustomId(`ban-${message.id}`)
                .setLabel('Ban')
                .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
                .setCustomId(`ignore-${message.id}`)
                .setLabel('Negeren')
                .setStyle(ButtonStyle.Secondary)
        );

        // Sla de informatie op in de map
        userActions.set(`warn-${message.id}`, {
            messageId: message.id,
            userId: message.author.id,
            guildId: message.guild.id
        });
        userActions.set(`kick-${message.id}`, {
            messageId: message.id,
            userId: message.author.id,
            guildId: message.guild.id
        });
        userActions.set(`ban-${message.id}`, {
            messageId: message.id,
            userId: message.author.id,
            guildId: message.guild.id
        });

        const embed = new EmbedBuilder()
            .setTitle("LINKDETECTOR")
            .setColor("Red")
            .setFooter({ text: "Made by - Harm.f & JulianRJC" })
            .setFields(
                { name: 'User:', value: `${message.member.user.id} / ${message.member.user.username}` },
                { name: "Channel: ", value: `<#${message.channel.id}>` },
                { name: "Bericht", value: message.content }
            );


        await logChannel.send({ content: ``, components: [actionRow], embeds: [embed] });
    } else {
        return
    }
}

module.exports = {
    name: Events.MessageCreate,
    execute,
    userActions
};
