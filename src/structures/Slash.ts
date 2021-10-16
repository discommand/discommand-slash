import { Client, Collection, Snowflake } from 'discord.js'
import { SlashOptions, slashType } from '../types'
import * as fs from 'fs'
import { SlashCommand } from '..'

export class Slash {
  options: SlashOptions
  client: Client
  guildId?: Snowflake
  constructor(client: Client, options: SlashOptions) {
    this.client = client
    this.options = options
  }

  public commands = new Collection()

  public async LoadCommand() {
    if (this.options.loadType == 'FILE') {
      if (this.options.slashType == 'GUILD') {
        const Files = fs.readdirSync(this.options.path)
        for (const file of Files) {
          const command = require(`${this.options.path}/${file}`)
          const Command: SlashCommand = new command()
          this.commands.set(Command.data.name, Command)
          this.client.once('ready', () => {
            // @ts-ignore
            // prettier-ignore
            this.client.application!.commands.create(Command.data.toJSON(), this.guildId as Snowflake)
          })
        }
      } else if (this.options.slashType == 'GLOBAL') {
      }
    }
  }

  public run() {
    this.client.on('interactionCreate', async interaction => {
      if (!interaction.isCommand()) return

      const command: any = this.commands.get(interaction.commandName)

      if (!command) return

      try {
        await command.execute(interaction)
      } catch (error) {
        console.error(error)
      }
    })
  }
}
