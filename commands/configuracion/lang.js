const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')
const guildModel = require('../../models/guilds.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lenguaje')
        .setDescription('cambia el lenguaje en este servidor')
        .addStringOption(option =>
            option.setName('lang')
                .setDescription('lenguaje del servidor')
                .setRequired(true)
                .addChoice('Español', 'es')
        ),
    async run(client, interaction) {
        const language = interaction.options._hoistedOptions[0].value
        if (!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply({ content: client.languages.__({ phrase: 'lang.noAdministrator', locale: language }), ephemeral: true })
        await guildModel.findOne({ guildId: interaction.guildId.toString() }).then((s, err) => {
            if (err) return console.log(err)
            if (s) {
                s.lang = language
                s.save().catch(e => console.log(e))
            } else {
                const newGuild = new guildModel({
                    guildId: interaction.guildId.toString(),
                    lang: language
                })
                newGuild.save().catch(e => console.log(e))
            }
        })
        return interaction.reply({ content: client.languages.__({ phrase: 'lang.newLanguage', locale: language }), ephemeral: true })
    }
}