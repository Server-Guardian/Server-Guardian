const database = require("../../handlers/database").query

const { SlashCommandBuilder, Client, ChatInputCommandInteraction, SlashCommandSubcommandBuilder, SlashCommandSubcommandGroupBuilder, BurstHandlerMajorIdKey } = require("discord.js");

const linkdetector_on = new SlashCommandSubcommandBuilder()
    .setName("enable")
    .setDescription("Zet de linkdetector aan of uit")
    .addBooleanOption(option => 
        option.setName("enable")
            .setDescription("Enable or disable the link detector")
            .setRequired(true)
    );
    const support_role = new SlashCommandSubcommandBuilder()
    .setName("supportrole")
    .setDescription("Zet de supportrole (word genegeert) voor de linkdetector en kan in tickets")
   .addRoleOption(option => 
    option
    .setName("role")
    .setDescription("De role")
    .setRequired(true)
   )
const logchannel = new SlashCommandSubcommandBuilder()
.setName("logchannel")
.setDescription("Log Channel voor alle logs")
.addChannelOption(option =>
option.setName("channel")
.setDescription("De channel")
.setRequired(true)

)

const ticketCat = new SlashCommandSubcommandBuilder()
.setName("ticketcat")
.setDescription("Ticket category")
.addChannelOption(option =>
option.setName("category")
.setDescription("De category")
.setRequired(true)

)

const linkdetector = new SlashCommandSubcommandGroupBuilder()
.setName("linkdetector")
.setDescription("Alles voor de linkdector")
.addSubcommand(linkdetector_on)
const support = new SlashCommandSubcommandGroupBuilder()
.setName("support")
.setDescription("Support")
.addSubcommand(support_role)

const overig = new SlashCommandSubcommandGroupBuilder()
.setName("overig")
.setDescription("Overig")
.addSubcommand(logchannel)
.addSubcommand(ticketCat)

const command = new SlashCommandBuilder()
.setName("setup")
.setDescription("Setup de bot")
.addSubcommandGroup(linkdetector)
.addSubcommandGroup(support)
.addSubcommandGroup(overig)
/**
 * 
 * @param {Client} client 
 * @param {ChatInputCommandInteraction} interaction 
 */
async function execute(client, interaction) {
    console.log(interaction.commandName);
    const SubcommandGroup = interaction.options.getSubcommandGroup()
const Subcommand = interaction.options.getSubcommand()

if (SubcommandGroup === "linkdetector" && Subcommand === "enable") {
    const boolean = interaction.options.getBoolean("enable")
    const status = boolean ? 1 : 0
    const query = `
    INSERT INTO Setups (Guildid, Soort, Waarde)
    VALUES (?, 'linkdetector_status', ?)
    ON DUPLICATE KEY UPDATE Waarde = VALUES(Waarde);
  `;
    
    database(query, [interaction.guildId, status], async (err, results) => {
        if (err) {
            console.error('Fout bij het uitvoeren van de query:', err);
            return;
        }
        await interaction.reply({content: `Setting opgeslagen. De linkdetector staat: ${boolean ? "Aan" : "Uit"}`, ephemeral: true })
    });
    


} else if (SubcommandGroup === "support" && Subcommand === 'supportrole') {
    const role = interaction.options.getRole("role")
    const id = role.id
    const query = `
    INSERT INTO Setups (Guildid, Soort, Waarde)
    VALUES (?, 'support_role', ?)
    ON DUPLICATE KEY UPDATE Waarde = VALUES(Waarde);
  `;

  database(query, [interaction.guildId, id], async (err, results) => {
    if (err) {
        console.error('Fout bij het uitvoeren van de query:', err);
        return;
    }
    await interaction.reply({content: `Setting opgeslagen. Support is nu gelinkt aan de ${role.name} role`, ephemeral: true })
});

} else if (SubcommandGroup === "overig" && Subcommand === 'logchannel') {
    const channel = interaction.options.getChannel("channel")
    const id = channel.id
    const query = `
    INSERT INTO Setups (Guildid, Soort, Waarde)
    VALUES (?, 'logchannel', ?)
    ON DUPLICATE KEY UPDATE Waarde = VALUES(Waarde);
  `;

  database(query, [interaction.guildId, id], async (err, results) => {
    if (err) {
        console.error('Fout bij het uitvoeren van de query:', err);
        return;
    }
    await interaction.reply({content: `Setting opgeslagen. De logs komen nu te staan in: <#${id}>`, ephemeral: true })
});

}else if (SubcommandGroup === "overig" && Subcommand === 'ticketcat') {
    const channel = interaction.options.getChannel("category")
    console.log(channel);
    const id = channel.id
    const query = `
    INSERT INTO Setups (Guildid, Soort, Waarde)
    VALUES (?, 'ticketcat', ?)
    ON DUPLICATE KEY UPDATE Waarde = VALUES(Waarde);
  `;

  database(query, [interaction.guildId, id], async (err, results) => {
    if (err) {
        console.error('Fout bij het uitvoeren van de query:', err);
        return;
    }
    await interaction.reply({content: `Setting opgeslagen. De tickets komen nu te staan bij: <#${id}>`, ephemeral: true })
});

}


}
module.exports = {
    catagory: "Setup",
    data: command,
    execute: execute
}



