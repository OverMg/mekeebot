const { SlashCommandBuilder } = require('@discordjs/builders')
const config = require('../../config.json')
const Discord = require('discord.js')
const moment = require('moment')
const osu = require('node-os-utils')
const os = require('os')
require('moment-duration-format')
const diagramMaker = require('../../functions/diagramMaker.js')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription('muestra el estado del bot.'),
    async run(client, interaction) {
        interaction.reply({content: 'analizando estado...'})
        const totalGuilds = client.guilds.cache.size
        const totalMembers = await client.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0)

        var mem = osu.mem
        let freeRAM, usedRAM, cpuUsage

        mem.info().then(info => {
            freeRAM = info['freeMemMb']
            usedRAM = info['totalMemMb'] - freeRAM
        })

        const cpu = osu.cpu
        const p1 = cpu.usage().then(cpuPercentage => {
            cpuUsage = cpuPercentage
        })

        await Promise.all([p1])

        const embed = new Discord.MessageEmbed()
            .setColor(config.defaultSuccessColor)
            .setAuthor(`Estado de ${client.user.username}`)
            .setThumbnail(client.user.displayAvatarURL({format: 'png', dynamic: true, size: 4096}))
            .addField('Rendimiento', "```" + `RAM: ${diagramMaker(usedRAM, freeRAM)} [${Math.round((100 * usedRAM) / (usedRAM + freeRAM))}%]\nCPU: ${diagramMaker(cpuUsage, 100- cpuUsage)} [${Math.round(cpuUsage)}%]` + "```", false)
            .addField('Sistema', "```" + `Procesador\nRAM ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB` + "```", false)
            .addField('Sistema Operativo', "```" + `${os.type} ${os.resale} ${os.arch}` + "```", false)
            .addField('Total de usuarios', "```" + `${totalMembers}` + "```", false)
            .addField('Total de servidores', "```" + `${totalGuilds}` + "```", true)
            .addField('Total de emojis', "```" + `${client.emojis.cache.size}` + "```", true)
            .addField('Tiempo de actividad del bot', "```" + `${moment.duration(client.uptime).format(`D [Dias], H [Horas], m [Minutos], s [Segundos]`)}` + "```", true)
            .addField('Tiempo de actividad del host', "```" + `${moment.duration(os.uptime * 1000).format(`D [Dias], H [Horas], m [Minutos], s [Segundos]`)}` + "```", true)
            .addField('Ultimo inicio', "```" + `${moment(client.readyAt).format("MMM DD YYYY, HH:mm")}` + "```", true)

        interaction.editReply({content: ' ', embeds: [embed]})
    }
}