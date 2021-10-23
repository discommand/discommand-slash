import { Client, Collection } from 'discord.js'
import { SlashOptions } from '../types'
import * as fs from 'fs'
import { SlashCommand } from '..'

/**
 *
 * @property {Client} client
 * @property {string} path
 * @property {'FILE' | 'FOLDER'} loadType
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
    if (this.options.loadType == 'FILE') {
      this.client.once('ready', () => {
        const Files = fs.readdirSync(this.options.path)
        for (const file of Files) {
          const command = require(`${this.options.path}/${file}`)
          const Command: SlashCommand = new command()
          if (!Command.data.name) {
            console.error(`${file} is name required.`)
          } else {
            this.commands.set(Command.data.name, Command)
            // @ts-ignore
            this.client.application!.commands.create(Command.data.toJSON())
            console.log(`${Command.data.name} Registry.`)
          }
        }
      })
    } else if (this.options.loadType == 'FOLDER') {
      this.client.once('ready', () => {
        const Folders = fs.readdirSync(this.options.path)
        for (const folder of Folders) {
          const Files = fs.readdirSync(`${this.options.path}/${folder}`)
          for (const file of Files) {
            const command = require(`${this.options.path}/${folder}/${file}`)
            const Command: SlashCommand = new command()
            if (!Command.data.name) {
              console.error(`${file} is name required.`)
            } else {
              this.commands.set(Command.data.name, Command)
              // @ts-ignore
              this.client.application!.commands.create(Command.data.toJSON())
              console.log(`${Command.data.name} Registry.`)
            }
          }
        }
      })
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
