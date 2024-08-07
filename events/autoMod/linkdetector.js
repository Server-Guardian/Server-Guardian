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
    if (linkRegex.test(message.content)) {

    
    const query = require("../../handlers/database")
query.query("SELECT * FROM setups WHERE Guildid = ?", [message.guild.id], async (err, results) => {
            if (err) {
                console.error('Fout bij het uitvoeren van de query:', err);
                return;
            }
            let db = results
            console.log(`Resu: ${Object(results)}`);
            
        const linkDetectorRole = db.Soort === 'support_role' ? db.Waarde : null;
        const linkDetectorStatus = db.Soort === 'linkdetector_status' ? db.Waarde : null;
        const logChannelId = db.Soort === 'logchannel' ? db.Waarde : db.Waarde


    let SupportID = linkDetectorRole
    const logChannel = await client.channels.fetch(logChannelId);


    if (!(message.member.roles.cache.get(SupportID)) && !(message.channel.name.startsWith("ticket-")) && linkDetectorStatus === 1) {
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
    
})
    }
}

module.exports = {
    name: Events.MessageCreate,
    execute,
    userActions
};
