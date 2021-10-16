# discommand-slash

- discommand's SlashCommandHandler

# Installation

this is for discord.js@13

```shell
npm i discommand-slash
```

dev

```shell
npm i discommand-slash@next
```

# Example

## Usage for TypeScript

index.ts

```ts
import { Client, Intents } from 'discord.js'
import { Slash } from 'discommand-slash'
import path = require('path')

const client = new Client({ intents: [Intents.FLAGS.GUILDS] })
const cmd = new Slash(client, {
  path: path.join(__dirname, '/commands'),
  loadType: 'FILE',
})

cmd.loadCommand()

cmd.run()

client.login('your_bot_token')
```

commands/ping.ts

```ts
import { SlashCommand } from 'discommand-slash'
import { CommandInteraction } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'

export = class extends SlashCommand {
  data = new SlashCommandBuilder().setName('ping').setDescription('Pong!')
  execute(interaction: CommandInteraction) {
    interaction.reply('Pong!')
  }
}
```

## Usage for Javascript

index.js

```js
const { Client, Intents } = require('discord.js')
const { Slash } = require('discommand-slash')
const path = require('path')

const client = new Client({ intents: [Intents.FLAGS.GUILDS] })
const cmd = new Slash(client, {
  path: path.join(__dirname, '/commands'),
  loadType: 'FILE',
})

cmd.loadCommand()

cmd.run()

client.login('your_bot_token')
```

commands/ping.js

```js
const { SlashCommand } = require('discommand-slash')
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = class extends SlashCommand {
  data = new SlashCommandBuilder().setName('ping').setDescription('Pong!')
  execute(interaction) {
    interaction.reply('Pong!')
  }
}
```
