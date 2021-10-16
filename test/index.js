const { Client } = require('discord.js')
const { Slash } = require('../dist/index')
const path = require('path')
const config = require('./config.json')
const client = new Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] })
const cmd = new Slash(client, {
  path: path.join(__dirname, 'commands'),
  slashType: 'GUILD',
  loadType: 'FILE',
  guildId: config.guildId,
})

cmd.LoadCommand()
cmd.run()
client.login(config.token)
