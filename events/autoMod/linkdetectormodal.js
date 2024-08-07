const { ModalBuilder, TextInputComponent, MessageActionRow, TextInputStyle, TextInputBuilder, ActionRowBuilder, InteractionType } = require('discord.js');
const { userActions } = require('./linkdetector');
const { createWarnModal, createKickModal, createBanModal } = require('../../modals');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (interaction.isButton()) {
            const actionId = interaction.customId;
            if (userActions.has(actionId)) {
                const [action, messageId] = actionId.split('-');
                let modal;
                if (action === 'warn') {
                    modal = createWarnModal(messageId);
                } else if (action === 'kick') {
                    modal = createKickModal(messageId);
                } else if (action === 'ban') {
                    modal = createBanModal(messageId);
                } else if (action === 'ignore') {
                    await interaction.reply({ content: 'Actie genegeerd.', ephemeral: true });
                    return;
                }

                if (modal) {
                    await interaction.showModal(modal);
                }
            }
        } else if (interaction.type === InteractionType.ModalSubmit) {
            if (!["warn", "ban", "kick"].some(prefix => interaction.customId.startsWith(prefix))) return;

            const [action, messageId] = interaction.customId.split('-');
        console.log(userActions);
        console.log(interaction.customId);
            const userData = userActions.get(`${action}-${messageId}`);
            if (userData) {
                return
            }
            const user = await interaction.guild.members.fetch(userData.userId);
            let reason;

            if (action === 'warn') {
                reason = interaction.fields.getTextInputValue('warnReason');
                // Voeg hier de logica voor waarschuwing toe
                await interaction.reply(`Gebruiker ${user.displayName} gewaarschuwd met reden: ${reason}`);
             
            } else if (action === 'kick') {
                reason = interaction.fields.getTextInputValue('kickReason');
                // Voeg hier de logica voor kick toe
                await user.kick(reason);
                await interaction.reply(`Gebruiker ${user.displayName} gekicked met reden: ${reason}`);
            } else if (action === 'ban') {
                reason = interaction.fields.getTextInputValue('banReason');
                // Voeg hier de logica voor ban toe
                await user.ban({ reason });
                await interaction.reply(`Gebruiker ${user.displayName} gebanned met reden: ${reason}`);
            }

            // Verwijder de informatie uit de map na de actie
            userActions.delete(`${action}-${messageId}`);
        
        }
    },
};
