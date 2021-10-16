const { SlashCommand } = require('../../dist/index')
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = class extends SlashCommand {
  data = new SlashCommandBuilder().setName('ping').setDescription('pong!')
  async execute(interaction) {
    await interaction.reply({ content: 'Pong!', ephemeral: true })
  }
}
