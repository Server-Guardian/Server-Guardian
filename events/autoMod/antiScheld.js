const { Events, EmbedBuilder, GuildMessageManager, Message } = require('discord.js');
/**
 * 
 * @param {Message} message 
 */

const blacklistedWords = ['badword1', 'badword2', 'badword3']; 
async function execute(message) {
    if (message.author.bot) return;
    const messageContent = message.content.toLowerCase();

    for (const word of blacklistedWords) {
        if (messageContent.includes(word)) {
            message.delete()
        }
    }
}
module.exports = {
	name: Events.MessageCreate,
	execute
	
};