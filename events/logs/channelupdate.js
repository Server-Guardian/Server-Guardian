const { Events, EmbedBuilder, ChatInputCommandInteraction, Message ,Channel, GuildChannel} = require('discord.js');
/**
 * 
 * @param {GuildChannel} oldChannel
 * @param {GuildChannel} newChannel 
 */
async function execute(oldChannel, newChannel) {

    const query = require("../../handlers/database")
query.query("SELECT * FROM Setups WHERE Guildid = ?", [newChannel.guild.id], async (err, results) => {
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
        
          
            const logchannel = newChannel.guild.channels.cache.get(logchannelId)
    const embed = new EmbedBuilder()
    .setColor("Orange")
    .setTitle("Channel Update")
    .setDescription(`Een channel is aangepast`)
    .addFields({name: "Oude channel:", value: `${oldChannel.name}`, inline: true}, {name: "Nieuwe Channel", value: `${newChannel.name

        
    }`, inline: true})

    logchannel.send({embeds: [embed]})

})
}
module.exports = {
	name: Events.ChannelUpdate,
	execute
	
};