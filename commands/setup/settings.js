const { SlashCommandBuilder, Client, ChatInputCommandInteraction, EmbedBuilder } = require("discord.js");

// Configuratie voor de database


// SlashCommandBuilder voor de settings command
const command = new SlashCommandBuilder()
    .setName("settings")
    .setDescription("Zie actuele settings");

/**
 * 
 * @param {Client} client 
 * @param {ChatInputCommandInteraction} interaction 
 */
async function execute(client, interaction) {
    let connection;

    try {
const query = require("../../handlers/database")
query.query("SELECT * FROM setups WHERE Guildid = ?", [interaction.guild.id], async (err, results) => {
            if (err) {
                console.error('Fout bij het uitvoeren van de query:', err);
                return;
            }
            let settings = results
            console.log(`Resu: ${results}`);



        console.log(settings);

        // Maak een embed
        const embed = new EmbedBuilder()
            .setColor('#0099ff') // Zet de kleur van de embed
            .setTitle('Huidige Instellingen')
            .setDescription('Hier zijn de actuele instellingen van de bot.');

        // Voeg dynamisch velden toe op basis van de instellingen
        for (const setting of settings) {
            if (setting.Soort === 'guildId') {
                continue; 
            }

            let displayValue;
            if (setting.Waarde === '1') {
                displayValue = '✅ Actief';
            } else if (setting.Waarde === '0') {
                displayValue = '❌ Inactief';
            } else {
                if (setting.Soort.startsWith("log") || setting.Soort.startsWith("ticket")) {
                    displayValue = `<#${setting.Waarde}>`;
                } else {
                    displayValue = `<@&${setting.Waarde}>`;
                }
            }

            console.log(`Toevoegen aan embed: ${setting.Soort}: ${displayValue}`); // Debug log

            embed.addFields({ name: `${setting.Soort}`, value: `${displayValue}`, inline: false });
        }

        embed.setFooter({ text: 'Instellingen Update' });

        // Stuur de embed naar de gebruiker
        await interaction.reply({ embeds: [embed] });
    });
    } catch (error) {
        console.error('Fout bij het ophalen van instellingen:', error);
        await interaction.reply('Er is een fout opgetreden bij het ophalen van de instellingen.');
    } 
    
}

module.exports = {
    catagory: "Setup", // Hier kun je de categorie toevoegen als je dat wilt
    data: command,
    execute: execute
}
