const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('muestra tu avatar o el del miembro que menciones')
        .addUserOption(option => option.setName('miembro').setDescription('mencina al miembro que quieres ver su avatar')),
    async run(client, interaction, language) {
        const user = interaction.options.getUser('miembro')
        if (user) {
            const embed = new MessageEmbed()
            .setColor(config.defaultSuccessColor)
            .setDescription(client.languages.__mf({phrase: 'avatar.miembro', locale: language}, {username: user.username}))
            .setImage(user.displayAvatarURL({dynamic: true, size: 4096}))
            return interaction.reply({embeds: [embed]})
        } else {
            const embed = new MessageEmbed()
            .setColor(config.defaultSuccessColor)
            .setDescription(client.languages.__mf({phrase: 'avatar.self', locale: language}))
            .setImage(interaction.user.displayAvatarURL({dynamic: true, size: 4096}))
            return interaction.reply({embeds: [embed]})
        }
    }
}