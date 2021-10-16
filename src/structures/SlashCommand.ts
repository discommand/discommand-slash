import { CommandInteraction } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'

export class SlashCommand {
  data: SlashCommandBuilder = new SlashCommandBuilder()
  execute(interaction: CommandInteraction): any {}
}
