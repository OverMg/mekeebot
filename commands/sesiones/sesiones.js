const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed, MessageSelectMenu, MessageActionRow } = require('discord.js')
const config = require('../../config.json')

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
                    label: 'Damas',
                    description: 'inicia una patida de damas en un canal de voz',
                    value: 'checkers'
                },
                {
                    label: 'Ocho',
                    description: 'inicia una partida de ocho en un canal de voz',
                    value: 'ocho'
                }
            ])
        )
        embed = new MessageEmbed()
		.setColor(config.defaultSuccessColor)
		.setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}`})
		.setTitle('Ha usado /sesion')
		.setDescription("```" + 'Selecciona una aplicacion para iniciar la sesion compartida.' + "```")
		.setFooter(client.user.username, client.user.avatarURL())
        await interaction.reply({embeds: [embed], components: [row]})
    }
}
