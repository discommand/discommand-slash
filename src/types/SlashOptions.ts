import { loadType, slashType } from '.'
import { Snowflake } from 'discord.js'

export type SlashOptions = {
  path: string
  loadType: loadType
  slashType: slashType
  guildId?: Snowflake
}
