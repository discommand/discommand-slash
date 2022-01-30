import { Client, Collection } from 'discord.js'
import { SlashOptions } from '../types'
import * as fs from 'fs'
import { SlashCommand } from '..'

/**
 *
 * @param {Client} client
 * @param {string} path
 * @param {'FILE' | 'FOLDER'} loadType
 */
export class Slash {
  options: SlashOptions
  client: Client
  constructor(client: Client, options: SlashOptions) {
    this.client = client
    this.options = options
  }

  public commands = new Collection()

  public LoadCommand() {
    console.log(
      '[discommand-slash] Important notification: This package is no longer supported. Accordingly, please use the discommand 4.0.0 version.'
    )
    if (this.options.loadType == 'FILE') {
      this.client.on('ready', () => {
        const Files = fs.readdirSync(this.options.path)
        for (const file of Files) {
          const command = require(`${this.options.path}/${file}`)
          const Command: SlashCommand = new command()
          if (!Command.data.name) {
            console.error(`[discommand-slash] ${file} is name required.`)
          } else {
            this.commands.set(Command.data.name, Command)
            // @ts-ignore
            this.client.application!.commands.create(Command.data.toJSON())
            console.log(`[discommand-slash] ${Command.data.name} Registry.`)
          }
        }
      })
    } else if (this.options.loadType == 'FOLDER') {
      this.client.on('ready', () => {
        const Folders = fs.readdirSync(this.options.path)
        for (const folder of Folders) {
          const Files = fs.readdirSync(`${this.options.path}/${folder}`)
          for (const file of Files) {
            const command = require(`${this.options.path}/${folder}/${file}`)
            const Command: SlashCommand = new command()
            if (!Command.data.name) {
              console.error(`[discommand-slash] ${file} is name required.`)
            } else {
              this.commands.set(Command.data.name, Command)
              // @ts-ignore
              this.client.application!.commands.create(Command.data.toJSON())
              console.log(`[discommand-slash] ${Command.data.name} Registry.`)
            }
          }
        }
      })
    }
    this.client.on('interactionCreate', async interaction => {
      if (!interaction.isCommand()) return

      const command: any = this.commands.get(interaction.commandName)

      if (!command) return

      try {
        await command.execute(interaction, this)
      } catch (error) {
        console.error(error)
      }
    })
  }
}
