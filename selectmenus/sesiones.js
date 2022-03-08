const createTogetherCode = require('../functions/createTogetherCode.js')
const { MessageEmbed } = require('discord.js')
const config = require('../config.json')

let applicationID

module.exports = {
    data: {
        name: 'sesion'
    },
    async run(client, interaction, language) {
        noChannelEmbed = new MessageEmbed()
        .setColor(config.defaultErrorColor)
        .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}`})
        .setTitle("Error, No te veo en ningun canal de voz")
        .setDescription("```" + client.languages.__({ phrase: 'youtube.noChannel', locale: language }) + "```")
        .setFooter(client.user.username, client.user.avatarURL());
        if (!interaction.member.voice.channel)        
        return interaction.update({embeds: [noChannelEmbed]})
        switch (interaction.values[0]) {
            case 'youtube':
                applicationID = '880218394199220334'
                break
            case 'chess':
                applicationID = '832012774040141894'
                break
            case  'poker':
                applicationID = '755827207812677713'
                break
            case 'betrayal':
                applicationID = '773336526917861400'
                break
            case 'puttparty':
                applicationID = '763133495793942528'
                break
            case 'ocho':
                applicationID = '832025144389533716'
                break
            case 'checkers':
                applicationID = '832013003968348200'
                break
            case 'lettertile':
                applicationID = '879863686565621790'
                break
        }
        createTogetherCode(client, interaction.member.voice.channel.id, applicationID, 0)
        .then(invite => {
            const embed = new MessageEmbed()
                .setColor(config.defaultSuccessColor)
                .setTitle('Para poner una aplicacion en un canal de voz y verlo con tus amigos')
                .setDescription(
                    client.languages.__mf({ phrase: 'youtube.inviteMessage', locale: language }, { inviteLink: invite.code })
                    );
                    return interaction.update({content: ' ', components: [], embeds: [embed]});
                }).catch(e => {
                    if (e == 'Ha ocurrido un error al btener los datos,') {
                        const errorembed = new MessageEmbed()
                            .setColor(config.defaultErrorColor)
                            .setTitle(client.lenguages.__({ phrase: 'utilities,errorEmbed', locale: language }))
                            .setDescription(client.lenguages.__({ phrase: 'utilities.unexpectedError', locale: language }))
                            .setfooter(interaction.member.user.username, interaction.member.user.avatarURL())
                        return interaction.update({ content: ' ', components: [], embeds: [errorembed] })
                    } else if (e == 'Tu bot no tiene los permisos necesarios') {
                        const errorembed = new MessageEmbed()
                            .setColor(config.defaultErrorColor)
                            .setTitle(client.lenguages.__({ phrase: 'utilities,errorEmbed', locale: language }))
                            .setDescription(client.lenguages.__({ phrase: 'utilities.noInvitePerms', locale: language }))
                            .setfooter(interactio.member.user.username, interaction.member.user.avatarURL())
                        return interaction.update({ content: ' ', components: [], embeds: [errorembed] })
                    } else if (e == 'Bad request') {
                        const errorembed = new MessageEmbed()
                            .setColor(config.defaultErrorColor)
                            .setTitle(client.lenguages.__({ phrase: 'utilities,badRequest', locale: language }))
                            .setDescription(client.lenguages.__({ phrase: 'utilities.badRequest', locale: language }))
                            .setfooter(interactio.member.user.username, interaction.member.user.avatarURL())
                        return interaction.update({ content: ' ', components: [], embeds: [errorembed] })
                    } else {
                        console.log(e)
                    }
                })

        }
    
}