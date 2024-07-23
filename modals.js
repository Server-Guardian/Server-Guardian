const { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js');

function createWarnModal(messageId) {
    const modal = new ModalBuilder()
        .setCustomId(`warn-${messageId}`)
        .setTitle('Waarschuwing');

    const reasonInput = new TextInputBuilder()
        .setCustomId('warnReason')
        .setLabel('Reden voor waarschuwing')
        .setStyle(TextInputStyle.Short);

    const actionRow = new ActionRowBuilder().addComponents(reasonInput);
    modal.addComponents(actionRow);

    return modal;
}

function createKickModal(messageId) {
    const modal = new ModalBuilder()
        .setCustomId(`kick-${messageId}`)
        .setTitle('Kick Gebruiker');

    const reasonInput = new TextInputBuilder()
        .setCustomId('kickReason')
        .setLabel('Reden voor kick')
        .setStyle(TextInputStyle.Short);

    const actionRow = new ActionRowBuilder().addComponents(reasonInput);
    modal.addComponents(actionRow);

    return modal;
}

function createBanModal(messageId) {
    const modal = new ModalBuilder()
        .setCustomId(`ban-${messageId}`)
        .setTitle('Ban Gebruiker');

    const reasonInput = new TextInputBuilder()
        .setCustomId('banReason')
        .setLabel('Reden voor ban')
        .setStyle(TextInputStyle.Short);

    const actionRow = new ActionRowBuilder().addComponents(reasonInput);
    modal.addComponents(actionRow);

    return modal;
}

module.exports = { createWarnModal, createKickModal, createBanModal };
