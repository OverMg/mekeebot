const { SlashCommandBuilder } = require('@discordjs/builders')
const { client, MessageEmbed } = require('discord.js')
const config = require('../../config.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('elimina un miembro de este servidor.')
        .addUserOption(option => 
            option
            .setName('miembro')
            .setDescription('Menciona al miembro que quieres eliminar')
            .setRequired(true))
        .addStringOption(option => 
            option
            .setName('razon')
            .setDescription('motivo de la expulsion')
            .setRequired(true)),
    async run(client, interaction, language) {
        const user = interaction.options.getMember('miembro');
        if (!interaction.member.permissions.has('KICK_MEMBERS')) {
            const embed = new MessageEmbed()
                .setColor(config.defaultErrorColor)
                .setDescription('No tienes permiso para expulsar miembros de este servidor.')
            return interaction.reply({ embeds: [embed] })
        }
        if (!interaction.guild.me.permissions.has('KICK_MEMBERS')) {
            const embed = new MessageEmbed()
                .setColor(config.defaultErrorColor)
                .setDescription('No tengo permiso para expulsar miembros de este servidor')
            return interaction.reply({ embeds: [embed] })
        }
        if (user.id === interaction.member.id) {
            return interaction.reply('como te vas a expulsar a ti mismo?, pedazo de estupido')
        }
        if (user.id === interaction.guild.me.id) {
            return interaction.reply('Si quieres que me vaya, solo expulsame :(')
        }
        
        if (!user.bannable) {
            const errorembed = new MessageEmbed()
                .setColor(config.defaultErrorColor)
                .setTitle(client.languages.__mf({phrase: 'utilities.errorEmbed', locale: language}, {ephemeral: true}))
                .setDescription(`No puedo expulsar a este miembro, por que tiene rol igual o mas alto que el mio.`)
                .setFooter(user.user.username, user.user.avatarURL());
            return interaction.reply({embeds: [errorembed]});
        }
        if (user.roles.highest.position >= interaction.member.roles.highest.position) {
            const errorembed = new MessageEmbed()
                .setColor(config.defaultErrorColor)
                .setTitle(client.languages.__mf({phrase: 'utilities.errorEmbed', locale: language}))
                .setDescription(`No puedo expulsar a un miembro con rol igual o mal alto que el tuyo`)
                .setFooter(user.user.username, user.user.avatarURL());
            return message.channel.send({embeds: [errorembed]});
        }
        
        const motivo = interaction.options.getString('razon')

        await user.kick(user).then(async(miembro) => {
                
            const embed2 = new MessageEmbed()
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}`})
            .setColor(config.defaultSuccessColor)
            .setTitle(`Ha usado /kick`)
            .addField('Elimine a', "```" + `${user.displayName}` + "```", false)
            .addField('Motivo', "```" + `${motivo}` + "```", false)
            .setFooter(client.user.username, client.user.avatarURL())
            return interaction.reply({embeds: [embed2]});
            
        }).catch((e) => {
            console.error(e)
        });
    },
};