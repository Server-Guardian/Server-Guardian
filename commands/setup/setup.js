const query = require("../../handlers/database").query

const { SlashCommandBuilder, Client, ChatInputCommandInteraction, SlashCommandSubcommandBuilder, SlashCommandSubcommandGroupBuilder } = require("discord.js");

const linkdetector_on = new SlashCommandSubcommandBuilder()
    .setName("enable")
    .setDescription("Zet de linkdetector aan of uit")
    .addBooleanOption(option => 
        option.setName("enable")
            .setDescription("Enable or disable the link detector")
            .setRequired(true)
    );

const linkdetector = new SlashCommandSubcommandGroupBuilder()
.setName("linkdetector")
.setDescription("Alles voor de linkdector")
.addSubcommand(linkdetector_on)


const command = new SlashCommandBuilder()
.setName("setup")
.setDescription("Setup de bot")
.addSubcommandGroup(linkdetector)
/**
 * 
 * @param {Client} client 
 * @param {ChatInputCommandInteraction} interaction 
 */
async function execute(client, interaction) {
    console.log(interaction.commandName);
    const SubcommandGroup = interaction.options.getSubcommandGroup()
const Subcommand = interaction.options.getSubcommand()
console.log(`Subcommand Group: ${SubcommandGroup}`);
console.log(`Subcommand: ${Subcommand}`);
if (SubcommandGroup === "linkdetector" && Subcommand === "enable") {
    const boolean = interaction.options.getBoolean("enable")
console.log(boolean);
}


}
module.exports = {
    catagory: "Setup",
    data: command,
    execute: execute
}



