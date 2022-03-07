const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageSelectMenu, MessageActionRow } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sesion')
        .setDescription('inicia una sesion de una aplicacion dentro de discord.'),
    async run(client, interaction, language) {
        const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
            .setCustomId('sesion')
            .setPlaceholder('Aplicacion')
            .addOptions([
                {
                    label: 'Youtube',
                    description: 'Inicia youtube together',
                    value: 'youtube'
                },
                {
                    label: 'Ajedrez',
                    description: 'inicia una partida de ajedrez en un canal de voz',
                    value: 'chess'
                },
                {
                    label: 'poker',
                    description: 'inicia una partida de poker compartida en un canal de voz',
                    value: 'poker'
                }
            ])
        )
        await interaction.reply({content: 'selecciona una aplicacion para iniciar la sesion compartida.', components: [row]})
    }
}
