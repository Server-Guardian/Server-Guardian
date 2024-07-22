// Imports
const client = require("./BotClient")
const app = require("../dashboard/expressClient")
require("dotenv").config()
const port = process.env.PORT || 3000

// Loaders
const loadCommands = require("./loaders/commands")
loadCommands()
const loadEvents = require("./loaders/events")
loadEvents()

client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    if (interaction.customId === 'actions') {
        const modal = new Modal()
            .setCustomId('actionModal')
            .setTitle('Kies een actie');

        const actionSelect = new MessageSelectMenu()
            .setCustomId('actionSelect')
            .setPlaceholder('Selecteer een actie')
            .addOptions([
                {
                    label: 'Waarschuwing',
                    value: 'warn',
                },
                {
                    label: 'Kick',
                    value: 'kick',
                },
                {
                    label: 'Ban',
                    value: 'ban',
                },
            ]);

        const actionRow = new MessageActionRow().addComponents(actionSelect);
        modal.addComponents(actionRow);

        await interaction.showModal(modal);
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isModalSubmit()) return;

    if (interaction.customId === 'actionModal') {
        const selectedAction = interaction.fields.getSelectMenuValue('actionSelect');

        let modal;
        if (selectedAction === 'warn') {
            modal = new Modal()
                .setCustomId('warnModal')
                .setTitle('Waarschuwing');

            const reasonInput = new TextInputComponent()
                .setCustomId('warnReason')
                .setLabel('Reden voor waarschuwing')
                .setStyle('SHORT');

            const actionRow = new MessageActionRow().addComponents(reasonInput);
            modal.addComponents(actionRow);

        } else if (selectedAction === 'kick') {
            modal = new Modal()
                .setCustomId('kickModal')
                .setTitle('Kick Gebruiker');

            const reasonInput = new TextInputComponent()
                .setCustomId('kickReason')
                .setLabel('Reden voor kick')
                .setStyle('SHORT');

            const actionRow = new MessageActionRow().addComponents(reasonInput);
            modal.addComponents(actionRow);

        } else if (selectedAction === 'ban') {
            modal = new Modal()
                .setCustomId('banModal')
                .setTitle('Ban Gebruiker');

            const reasonInput = new TextInputComponent()
                .setCustomId('banReason')
                .setLabel('Reden voor ban')
                .setStyle('SHORT');

            const actionRow = new MessageActionRow().addComponents(reasonInput);
            modal.addComponents(actionRow);
        }

        await interaction.showModal(modal);
    }

    if (interaction.customId === 'warnModal') {
        const reason = interaction.fields.getTextInputValue('warnReason');
        // Hier kun je de logica voor waarschuwing toevoegen
        await interaction.reply(`Gebruiker gewaarschuwd met reden: ${reason}`);
    } else if (interaction.customId === 'kickModal') {
        const reason = interaction.fields.getTextInputValue('kickReason');
        // Hier kun je de logica voor kick toevoegen
        await interaction.reply(`Gebruiker gekicked met reden: ${reason}`);
    } else if (interaction.customId === 'banModal') {
        const reason = interaction.fields.getTextInputValue('banReason');
        // Hier kun je de logica voor ban toevoegen
        await interaction.reply(`Gebruiker gebanned met reden: ${reason}`);
    }
});



// client.on("debug", console.debug)
client.on("warn", console.warn)

app.listen(port, "0.0.0.0", function () {
	console.log("✅| Dashboard");
})
