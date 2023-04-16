const { log } = require('console');
const { Client, EmbedBuilder, MessageFlags, SlashCommandBuilder, SlashCommandSubcommandBuilder, userMention, User } = require('discord.js');
const NekosLife = require('nekos.life');
const nekoclient = new NekosLife();

class Module {
  constructor() {
    this.name = 'NekosLife';
    this.version = '1.0.0';

    this.commands = [
      new SlashCommandBuilder()        .setName('tickle')     .setDescription('tickle someone'),
      new SlashCommandBuilder()        .setName('slap')       .setDescription('slap someone'),
      new SlashCommandBuilder()        .setName('poke')       .setDescription('poke someone'),
      new SlashCommandBuilder()        .setName('pat')        .setDescription('pat someone'),
      new SlashCommandBuilder()        .setName('neko')       .setDescription('a cute neko appears !'),
      new SlashCommandBuilder()        .setName('meow')       .setDescription('meow someone'),
      new SlashCommandBuilder()        .setName('lizard')     .setDescription('lizard someone'),
      new SlashCommandBuilder()        .setName('kiss')       .setDescription('kiss someone'),
      new SlashCommandBuilder()        .setName('hug')        .setDescription('hug someone')
      .addUserOption(option => option  .setName('victim')     .setDescription('Your victim')),
      new SlashCommandBuilder()        .setName('foxgirl')    .setDescription('a cute foxgirl appears !'),
      new SlashCommandBuilder()        .setName('feed')       .setDescription('feed someone'),
      new SlashCommandBuilder()        .setName('cuddle')     .setDescription('cuddle someone'),
      new SlashCommandBuilder()        .setName('why')        .setDescription('Just why ?'),
      new SlashCommandBuilder()        .setName('cattext')    .setDescription('I wonder what this command do OwO'),
      new SlashCommandBuilder()        .setName('owoify')     .setDescription('OwOify a text !')
      .addStringOption(option => option.setName('boring-text').setDescription('Not OwOtext').setRequired(true)),
      new SlashCommandBuilder()        .setName('nekogif')    .setDescription('Neko gifs are cuter than neko'),
      new SlashCommandBuilder()        .setName('eightball')  .setDescription('You know what I mean')
      .addStringOption(option => option.setName('question')   .setDescription('ur question').setRequired(true)),
      new SlashCommandBuilder()        .setName('fact')       .setDescription('Some facts for you'),
      new SlashCommandBuilder()        .setName('kemonomimi') .setDescription('We all love kemonomimi'),
      new SlashCommandBuilder()        .setName('holo')       .setDescription('The best waifu'),
      new SlashCommandBuilder()        .setName('smug')       .setDescription('smug someone'),
      new SlashCommandBuilder()        .setName('baka')       .setDescription('Everyone is a baka so say it'),
      new SlashCommandBuilder()        .setName('woof')       .setDescription('woof woof woof !'),
      new SlashCommandBuilder()        .setName('wallpaper')  .setDescription('Y\'a need some Wallpapers ?'),
      new SlashCommandBuilder()        .setName('goose')      .setDescription('gooses again'),
      new SlashCommandBuilder()        .setName('gecg')       .setDescription('gecg, best meme of all time'),
      new SlashCommandBuilder()        .setName('avatar')     .setDescription('Give me that !'),
      new SlashCommandBuilder()        .setName('waifu')      .setDescription('Waifu generator')
    ]
  }

  /**
   * 
   * @param {Client} client 
   */
  launch(client) {
    client.on("interactionCreate", (interaction) => {
      switch (interaction.commandName) {
        case 'tickle':
          this.actions(interaction, nekoclient.tickle)
          break;
        case 'slap':
          this.actions(interaction, nekoclient.slap)
          break;
        case 'poke':
          this.actions(interaction, nekoclient.poke)
          break;
        case 'pat':
          this.actions(interaction, nekoclient.pat)
            break;
        case 'neko':
          this.actions(interaction, nekoclient.neko)
              break;
        case 'meow':
          this.actions(interaction, nekoclient.meow)
          break;
        case 'lizard':
          this.actions(interaction, nekoclient.lizard)
          break;
        case 'kiss':
          this.actions(interaction, nekoclient.kiss)
          break;
        case 'hug':
          this.actions(interaction, nekoclient.hug)
          break;
        case 'foxgirl':
          this.actions(interaction, nekoclient.foxGirl)
          break;
        case 'feed':
          this.actions(interaction, nekoclient.feed)
          break;
        case 'cuddle':
          this.actions(interaction, nekoclient.cuddle)
          break;
        case 'why':
          this.why(interaction)
          break;
        case 'cattext':
          this.catText(interaction)
          break;
        case 'owoify':
          this.OwOify(interaction)
          break;
        case 'eightball':
          this.eightBall(interaction)
          break;
        case 'fact':
          this.fact(interaction)
          break;
        case 'nekogif':
          this.actions(interaction, nekoclient.nekoGif)
          break;
        case 'kemonomimi':
          this.actions(interaction, nekoclient.kemonomimi)
          break;
        case 'holo':
          this.actions(interaction, nekoclient.holo)
          break;
        case 'smug':
          this.actions(interaction, nekoclient.smug)
          break;
        case 'baka':
          this.actions(interaction, nekoclient.baka)
          break;
        case 'woof':
          this.actions(interaction, nekoclient.woof)
          break;
        case 'wallpaper':
          this.actions(interaction, nekoclient.wallpaper)
          break;
        case 'goose':
          this.actions(interaction, nekoclient.goose)
          break;
        case 'gecg':
          this.actions(interaction, nekoclient.gecg)
          break;
        case 'avatar':
          this.actions(interaction, nekoclient.avatar)
          break;
        case 'waifu':
          this.actions(interaction, nekoclient.waifu)
          break;
        default:
          break;
      }
    })
  }

  async actions(interaction, action) {
    const user = interaction.user
    const victim = interaction.options.getUser('victim')
    const {msg, url} = await action()

    console.log(msg, url)

    if (msg) interaction.reply({
      embeds: [this.NekosEmbedBuilder(user, user.avatarURL(), `NekosLife ${interaction.commandName}`, null, msg)]
    });
    else if (!victim) interaction.reply({
      embeds: [this.NekosEmbedBuilder(user, user.avatarURL(), `NekosLife ${interaction.commandName}`, url, `${user.username}.${interaction.commandName}()`)]
    });
    else interaction.reply({
      content: userMention(victim.id),
      embeds: [this.NekosEmbedBuilder(user, user.avatarURL(), `NekosLife ${interaction.commandName}`, url, `${user.username}.${interaction.commandName}(${victim.username})`)]
    });
  }

  async why(interaction) {
    const user = interaction.user
    const {why} = await nekoclient.why()

    interaction.reply({
      embeds: [this.NekosEmbedBuilder(user, user.avatarURL(), `NekosLife ${interaction.commandName}`, null, why)]
    });
  }

  async catText(interaction) {
    const user = interaction.user
    const {cat} = await nekoclient.catText()

    console.log(catTextRes)

    interaction.reply({
      embeds: [this.NekosEmbedBuilder(user, user.avatarURL(), `NekosLife ${interaction.commandName}`, null, cat)]
    });
  }

  async OwOify(interaction) {
    const user = interaction.user
    const boringText = interaction.options.getString('boring-text')
    const {msg, owo} = await nekoclient.OwOify({text: boringText})

    if (msg) interaction.reply({
      embeds: [this.NekosEmbedBuilder(user, user.avatarURL(), `NekosLife ${interaction.commandName}`, null, msg)]
    });
    else interaction.reply({
      embeds: [this.NekosEmbedBuilder(user, user.avatarURL(), `NekosLife ${interaction.commandName}`, null, owo)]
    });
  }
  
  async eightBall(interaction) {
    const user = interaction.user
    const {response, url} = await nekoclient.eightBall()

    interaction.reply({
      embeds: [this.NekosEmbedBuilder(user, user.avatarURL(), `NekosLife ${interaction.commandName}`, url, response)]
    });
  }

  async fact(interaction) {
    const user = interaction.user
    const {fact} = await nekoclient.fact()

    interaction.reply({
      embeds: [this.NekosEmbedBuilder(user, user.avatarURL(), `NekosLife ${interaction.commandName}`, null, fact)]
    });
  }

  NekosEmbedBuilder(author, thumbnail, title, url, description) {
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
        text: "totoboto4 NekosLife services"
      })
      .setTimestamp(new Date());
  }
}

module.exports = new Module()
