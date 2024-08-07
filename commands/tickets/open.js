const { SlashCommandBuilder, Client, ChatInputCommandInteraction, ModalBuilder, TextInputStyle, TextInputBuilder, ActionRowBuilder, Events, InteractionType, PermissionOverwrites, EmbedBuilder } = require("discord.js");

const command = new SlashCommandBuilder()
    .setName("open")
    .setDescription("Open een ticket")
/**
 * 
 * @param {Client} client 
 * @param {ChatInputCommandInteraction} interaction 
 */
async function execute(client, interaction) {

    const query = require("../../handlers/database")
    query.query("SELECT * FROM setups WHERE Guildid = ?", [interaction.guild.id], async (err, results) => {
        if (err) {
            console.error('Fout bij het uitvoeren van de query:', err);
            return;
        }
        let db = results
       
        let linkDetectorRoleId = null;
        let ticketcatId = null;
        let logChannelId = null;
        
        for (const setting of db) {
            
            switch (setting.Soort) {
                case 'support_role':
                    linkDetectorRoleId = setting.Waarde;
                    break;
                case 'ticketcat':
                    ticketcatId = setting.Waarde;
                    break;
                case 'logchannel':
                    logChannelId = setting.Waarde;
                    break;
                case "guildId":
                    continue
                default:
                    break;
            }
        }


        const linkDetectorRole = interaction.guild.roles.cache.get(linkDetectorRoleId)
        const ticketcat = interaction.guild.channels.cache.get(ticketcatId)
        const logchannel = interaction.guild.channels.cache.get(logChannelId)
       

        if (!ticketcat.type === "category") return interaction.reply({ content: "Ticket category is geen category maar een channel" })
        if (!ticketcat) return interaction.reply({ content: "Ticket category bestaat niet" })
        

            const modal = new ModalBuilder()
            .setCustomId("reden_modal_open")
            .setTitle("Reden")
            const reasonInput = new TextInputBuilder()
            .setCustomId('warnReason')
            .setLabel('Reden voor ticket')
            .setStyle(TextInputStyle.Short);

            const actionRow = new ActionRowBuilder().addComponents(reasonInput);
            modal.addComponents(actionRow);

            interaction.showModal(modal)

            client.on(Events.InteractionCreate, (interaction) => {
                if (!interaction.type === InteractionType.ModalSubmit) return;
                if (!interaction.customId === "reden_modal_open") return;
                const reason = interaction.fields.getTextInputValue('warnReason');

               interaction.guild.channels.create({
                    name: `ticket-${interaction.user.username}`,
                    parent: ticketcatId,
                    topic: `Ticket ${reason}`,
                    permissionOverwrites: [
                        {
                            id:interaction.guild.id, // @everyone
                            deny: ["ViewChannel", "SendMessages"]
                        }, 
                        {
                            id: linkDetectorRoleId, // support role
                            allow: ["ViewChannel", "SendMessages"]
                        },
                        {
                            id: interaction.user.id, // Ticket user
                            allow: ["ViewChannel", "SendMessages"]
                        }
                    ]
                }).then(channel => {

                    const embed = new EmbedBuilder()
                    .setTitle(`Ticket: ${interaction.user.tag}`)
                    .setDescription(`RE`)

                    interaction.reply({content: `Ticket geopend: <#${channel.id}>`})
                })

            })

    })

}
module.exports = {
    catagory: "Tickets",
    data: command,
    execute: execute
}



