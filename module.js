const { Client, EmbedBuilder, SlashCommandBuilder, userMention, Events } = require('discord.js')
const NekosLife = require('nekos.life')
const nekoclient = new NekosLife()

const { actionCommands } = require('./commands.json')
const { Debugger, Module } = require('totoboto4-core')
const debug = new Debugger()

const prefix = 'nl'

class NekosLifeModule extends Module {
  constructor (modulator) {
    super(modulator)

    this.name = 'NekosLife'
    this.version = '1.0.0'

    this.commands = [
      ...actionCommands.map(
        actionCommand => new SlashCommandBuilder()
          .setName(`${prefix}-${actionCommand.name}`).setDescription(actionCommand.description)
          .addUserOption(option => option.setName('victim').setDescription('Your victim'))
      ),
      new SlashCommandBuilder().setName(`${prefix}-why`).setDescription('Just why ?'),
      new SlashCommandBuilder().setName(`${prefix}-cattext`).setDescription('I wonder what this command do OwO'),
      new SlashCommandBuilder().setName(`${prefix}-owoify`).setDescription('OwOify a text !')
        .addStringOption(option => option.setName('boring-text').setDescription('Not OwOtext').setRequired(true)),
      new SlashCommandBuilder().setName(`${prefix}-eightball`).setDescription('You know what I mean')
        .addStringOption(option => option.setName('question').setDescription('ur question').setRequired(true)),
      new SlashCommandBuilder().setName(`${prefix}-fact`).setDescription('Some facts for you')
    ]
  }

  /**
   * @param {} data 
   */
  launch (data) {
    const client = data.client

    debug.addLayer("NekosLife", "nekoslife")
    debug.debug(debug.layers.NekosLife, debug.types.Debug, 'NekosLife Started!')

    client.on(Events.InteractionCreate, (interaction) => {
      const commandName = interaction.commandName

      switch (commandName) {
        case `${prefix}-why`:
          this.why(interaction)
          break
        case `${prefix}-cattext`:
          this.catText(interaction)
          break
        case `${prefix}-owoify`:
          this.OwOify(interaction)
          break
        case `${prefix}-eightball`:
          this.eightBall(interaction)
          break
        case `${prefix}-fact`:
          this.fact(interaction)
          break
        case `${prefix}-nekogif`:
          this.actions(interaction, nekoclient.nekoGif)
          break
        default:
          actionCommands.forEach(actionCommand => {
            if (`${prefix}-${actionCommand.name}` === commandName) {
              this.actions(interaction, nekoclient[actionCommand.name])
            }
          })
          break
      }
    })
  }

  async actions (interaction, action) {
    debug.debug(debug.layers.NekosLife, debug.types.Debug, "Action was used.")

    const user = interaction.user
    const victim = interaction.options.getUser('victim')
    const { msg, url } = await action()

    if (msg) {
      interaction.reply({
        embeds: [this.NekosEmbedBuilder(user, user.avatarURL(), interaction.commandName, null, msg)]
      })
    } else if (!victim) {
      interaction.reply({
        embeds: [this.NekosEmbedBuilder(user, user.avatarURL(), interaction.commandName, url, `${user.username}.${interaction.commandName}();`)]
      })
    } else {
      interaction.reply({
        content: userMention(victim.id),
        embeds: [this.NekosEmbedBuilder(user, user.avatarURL(), interaction.commandName, url, `${user.username}.${interaction.commandName}(${victim.username});`)]
      })
    }
  }

  async why (interaction) {
    const user = interaction.user
    const { why } = await nekoclient.why()

    interaction.reply({
      embeds: [this.NekosEmbedBuilder(user, user.avatarURL(), interaction.commandName, null, why)]
    })
  }

  async catText (interaction) {
    const user = interaction.user
    const { cat } = await nekoclient.catText()

    interaction.reply({
      embeds: [this.NekosEmbedBuilder(user, user.avatarURL(), interaction.commandName, null, cat)]
    })
  }

  async OwOify (interaction) {
    const user = interaction.user
    const boringText = interaction.options.getString('boring-text')
    const { msg, owo } = await nekoclient.OwOify({ text: boringText })

    if (msg) {
      interaction.reply({
        embeds: [this.NekosEmbedBuilder(user, user.avatarURL(), interaction.commandName, null, msg)]
      })
    } else {
      interaction.reply({
        embeds: [
          this.NekosEmbedBuilder(user, user.avatarURL(), interaction.commandName, null, `${user.username}: ${boringText}\nowo: ${owo}`)
        ]
      })
    }
  }

  async eightBall (interaction) {
    const user = interaction.user
    const question = interaction.options.getString('question')
    const { response, url } = await nekoclient.eightBall()

    interaction.reply({
      embeds: [this.NekosEmbedBuilder(user, user.avatarURL(), interaction.commandName, url, `${user.username}: ${question}\nresponse: ${response}`)
      ]
    })
  }

  async fact (interaction) {
    const user = interaction.user
    const { fact } = await nekoclient.fact()

    interaction.reply({
      embeds: [this.NekosEmbedBuilder(user, user.avatarURL(), interaction.commandName, null, fact)]
    })
  }

  NekosEmbedBuilder (author, thumbnail, title, url, description) {
    return new EmbedBuilder()
      .setColor('Navy')
      .setAuthor({
        name: author.username
      })
      .setThumbnail(thumbnail)
      .setTitle(title)
      .setURL(url)
      .setDescription(description)
      .setImage(url)
      .setFooter({
        text: 'totoboto4 NekosLife services'
      })
      .setTimestamp(new Date())
  }
}

module.exports = NekosLifeModule
