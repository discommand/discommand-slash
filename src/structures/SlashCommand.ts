import { CommandInteraction } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'
import { Slash } from '..'

export class SlashCommand {
  data: SlashCommandBuilder = new SlashCommandBuilder()
  execute(interaction: CommandInteraction, slash: Slash): any {}
}
