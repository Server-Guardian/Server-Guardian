const { Events, EmbedBuilder, ChatInputCommandInteraction, Message,  AuditLogEvent } = require('discord.js');
/**
 * 
 * @param {Message} message
 */
async function execute(message) {
    if (message.author.bot) return;

    const channel = message.channel
    const embed = new EmbedBuilder()
    .setColor("Red")
    .setTitle("Message Delete")
    .setDescription(`Een bericht van <@${message.author.id}> is verwijderd`)
    try {
        const auditLogs = await message.guild.fetchAuditLogs({
            type: AuditLogEvent.MessageDelete,
            limit: 2 
        });
        const logEntry = auditLogs.entries.find(entry => entry.target.id === message.id);
        if (logEntry) {
            console.log(logEntry);
            embed.addFields(
                {name: "Verwijderd door:", value: `${logEntry.executor.tag}`, inline: true},
                {name: "Inhoud:", value: `${message.content}`, inline: true},
                {name: "Kanaal:", value: `<#${channel.id}>`, inline: true}
            )
        } else {
            embed.addFields(
                {name: "Verwijderd door:", value: `${message.author.tag}`, inline: true},
                {name: "Inhoud:", value: `${message.content}`, inline: true},
                {name: "Kanaal:", value: `<#${channel.id}>`, inline: true}
            )
        }
        
    } catch (error) {
        
    }

    const query = require("../../handlers/database")
query.query("SELECT * FROM Setups WHERE Guildid = ?", [message.guild.id], async (err, results) => {
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
        
          
     message.guild.channels.cache.get(logchannelId).send({embeds: [embed]})
    

})
}
module.exports = {
	name: Events.MessageDelete,
	execute
	
};