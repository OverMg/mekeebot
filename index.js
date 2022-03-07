const {Client, Intents, Collection} = require('discord.js')
require('dotenv').config()
const config = require('./config.json')
const {join} = require('path')
const {setInterval} = require('timers')


const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES]})

client.commands = new Collection()
client.selectMenus = new Collection()
client.languages = require('i18n')

client.languages.configure({
    locales: ('es'),
    directory: join(__dirname, "locales"),
    defaultLocale: 'es',
    retryInDefaultLocale: true,
    objectNotation: true,
    register: global,

    logWarnFn: function(msg) {
        console.log('WARN' + msg)
    },
    logErrorFn: function () {
        console.log['ERROR' + msg]
    },
    missingKeyFn: function (locale, value) {
        return value
    },
    mustacheConfig: {
        tags: ["{{", "}}"],
        disable: false
    }
})

setInterval (() => {
    updateStatus()
}, 60000)

async function updateStatus() {
    const guildNum = await client.guilds.cache.size
    const memberNum = await client.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0)

    await client.user.setActivity(`servers: ${guildNum} Miembros: ${memberNum}`, {type: "LISTENING"})
}

require("./handlers/events.js")(client);
require("./handlers/commands.js")(client);
require("./handlers/selectmenus.js")(client);

//client.login(process.env.token)
client.login(config.token)