const config = require('../config.json')
const fetch = require('node-fetch')

module.exports = async (client, voiceChannelId, applicationID, time) => {
    let returnData = {}
    return new Promise((resolve, reject) => {
        fetch(`https://discord.com/api/v8/channels/${voiceChannelId}/invites`, {
            method: 'POST',
            body: JSON.stringify({
                max_age: time,
                max_uses: 0,
                target_application_id: applicationID,
                target_type: 2,
                temporary: false,
                validate: null,
            }),
            headers: {
                Authorization: `Bot ${client.token}`,
                'Content-Type': 'application/json',
            }
        }).then(res => res.json())
            .then(invite => {
                if (!invite || invite.error || !invite.code) reject('Ha ocurrido un error al obtener los datos.')
                if (invite.code === 50013 || invite.code === '50013') reject('Tu bot no tiene los permisos necesarios.')
                if (invite.code === 50035 || invite.code === '50035') reject('Bad request.')
                returnData.code = `https://discord.com/invite/${invite.code}`;
                resolve(returnData)
            }).catch(e => {
                console.log(e)
            })
    })
}