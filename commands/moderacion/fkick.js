const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fkick')
		.setDescription('falsa eliminacion de un miembro de este servidor.')
		.addUserOption(option => option.setName('miembro').setDescription('Menciona al miembro que quieres "eliminar"').setRequired(true)),
	async run(client, interaction, language) {

		if(!interaction.member.permissions.has('KICK_MEMBERS')) {
            const embed = new MessageEmbed()
            .setColor(config.defaultErrorColor)
            .setDescription('No tienes permiso para eliminar miembros de este servidor')
            return interaction.reply({embeds: [embed]})
        }
        
		if(!interaction.guild.me.permissions.has('KICK_MEMBERS')) {
            const embed = new MessageEmbed()
            .setColor(config.defaultErrorColor)
            .setDescription('No tengo permiso para eliminar miembros de este servidor')
            return interaction.reply({embeds: [embed]})
        }

		const user = interaction.options.getUser('miembro');
		return interaction.reply({ content: `Eliminando del servidor a: ${user.username}...`});
	},
};