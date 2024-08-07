const { Events, EmbedBuilder, GuildMessageManager, Message, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
/**
 * 
 * @param {Message} message 
 */

const blacklistedWords = ['badword1', 'badword2', 'badword3']; 
const { userActions } = require('./linkdetector');

async function execute(message) {
    if (message.author.bot) return;
    const messageContent = message.content.toLowerCase();

    for (const word of blacklistedWords) {
       
        if (messageContent.includes(word)) {
            message.delete().then(async () => {
                message.channel.send(`${message.author}, je bericht bevat ongepaste taal en is verwijderd.`);
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
                    .setTitle("ANTI SCHELD SYSTEEM")
                    .setColor("Red")
                    .setFooter({ text: "Made by - Harm.f & JulianRJC" })
                    .setFields(
                        { name: 'User:', value: `${message.member.user.id} / ${message.member.user.username}` },
                        { name: "Channel: ", value: `<#${message.channel.id}>` },
                        { name: "Bericht", value: message.content },
                        {name: "Scheldwoord", value: word}
                    );
        
                    const query = require("../../handlers/database")
                    query.query("SELECT * FROM setups WHERE Guildid = ?", [message.guild.id], async (err, results) => {
                                if (err) {
                                    console.error('Fout bij het uitvoeren van de query:', err);
                                    return;
                                }
                                let db = results
                                console.log(results);
                                let logChannelId
                                results.forEach(result => {
                                    if (result.Soort === 'logchannel') {
                                        logChannelId = result.Waarde;
                                    }
                                });
                                
                    const client = require("../../src/botClient")
                        const logChannel = await client.channels.fetch(logChannelId);
                await logChannel.send({ content: ``, components: [actionRow], embeds: [embed] });
                            })
              })
              
              .catch(console.error);
            break;
      
        }
    }
}
module.exports = {
	name: Events.MessageCreate,
	execute
	
};