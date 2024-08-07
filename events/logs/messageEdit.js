const { Events, EmbedBuilder, ChatInputCommandInteraction, Message } = require('discord.js');
/**
 * 
 * @param {Message} oldMessage
 * @param {Message} newMessage 
 */
async function execute(oldMessage, newMessage) {
    if (oldMessage.author.bot || newMessage.author.bot) return;

    const query = require("../../handlers/database")
query.query("SELECT * FROM Setups WHERE Guildid = ?", [newMessage.guild.id], async (err, results) => {
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
        
          
            const logchannel = newMessage.guild.channels.cache.get(logchannelId)
    const embed = new EmbedBuilder()
    .setColor("Orange")
    .setTitle("Message Update")
    .setDescription(`Een bericht van <@${oldMessage.author.id}> is aangepast`)
    .addFields({name: "Oud Bericht:", value: `${oldMessage}`, inline: true}, {name: "Nieuw Bericht", value: `${newMessage}`, inline: true})

    logchannel.send({embeds: [embed]})

})
}
module.exports = {
	name: Events.MessageUpdate,
	execute
	
};