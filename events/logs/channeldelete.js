const { Events, EmbedBuilder, ChatInputCommandInteraction, Message,  AuditLogEvent, GuildChannel, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
/**
 * 
 * @param {GuildChannel} channel
 */
const channels = new Map()

async function execute(channel) {
    console.log(channel);
    const embed = new EmbedBuilder()
    .setColor("Red")
    .setTitle("Channel Delete")
    .setDescription(`Er is een channel verwijderd`)
    try {
        const auditLogs = await channel.guild.fetchAuditLogs({
            type: AuditLogEvent.ChannelDelete,
            limit: 2 
        });
        const logEntry = auditLogs.entries.find(entry => entry.target.id === channel.id);
        if (logEntry) {
            console.log(logEntry);
            embed.addFields(
                {name: "Verwijderd door:", value: `${logEntry.executor.tag} / ${logEntry.executor.id}`, inline: false},
                {name: "Kanaal:", value: `${channel.name} / ${channel.id}`, inline: false},
                {name: "Text channel?", value: `${channel.isTextBased() ? "✅" : "❌"}`, inline: true},
                {name: "Thread channel?", value: `${channel.isThread() ? "✅" : "❌"}`, inline: true},
                {name: "Voice channel?", value: `${channel.isVoiceBased() ? "✅" : "❌"}`, inline: true},

            )
        }
        
    } catch (error) {
        
    }

    const query = require("../../handlers/database")
query.query("SELECT * FROM Setups WHERE Guildid = ?", [channel.guild.id], async (err, results) => {
            if (err) {
                console.error('Fout bij het uitvoeren van de query:', err);
                return;
            }
            let logchannelId
            results.forEach(result => {
                if (result.Soort === 'logchannel') {
                    logchannelId = result.Waarde;
                }
            });

            channels.set(channel.id, {channel})
            console.log(channels);
            const btn = new ButtonBuilder()
            .setCustomId(`recr-${channel.id}`)
            .setLabel("Recrate Channel")
            .setStyle(ButtonStyle.Success);
            
            const row = new ActionRowBuilder()
            .addComponents(btn)
        
          
            channel.guild.channels.cache.get(logchannelId).send({embeds: [embed], components: [row]})
    

})
}
module.exports = {
	name: Events.ChannelDelete,
	execute,
    channels
	
};