const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require('../../config.json')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('purge')
		.setDescription('elimina mensajes')
		.addIntegerOption(option => { 
			return option
			.setName('cantidad')
			.setDescription('Cantidad de mensajes a eliminar pa')
			.setRequired(true)
		}),
	async run(client, interaction, language) {
		if(!interaction.member.permissions.has('MANAGE_MESSAGES')) return interaction.reply('No tienes permisos para eliminar mensajes')
		if(!interaction.guild.me.permissions.has('MANAGE_MESSAGES')) return interaction.reply('No tengo permisos para eliminar mensajes')
		
		let amount = interaction.options.getInteger('cantidad')

		if (amount <= 1 || amount > 100) {
			return interaction.reply({ content: 'Ingresa un malparido numero entre 1 y 100.' });
		}
		await interaction.channel.bulkDelete(amount, true).catch(error => {
			console.error(error);
			interaction.reply({ content: 'Cachon por alguna razon no puedo eliminar mensajes aqui' });
		});
		embed = new MessageEmbed()
		.setColor(config.defaultSuccessColor)
		.setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}`})
		.setTitle('Ha usado /purge')
		.addField('Elimine', "```" + `${amount}` + "```", false)
		.setFooter(client.user.username, client.user.avatarURL())
		return interaction.reply({embeds: [embed]});
	},
};