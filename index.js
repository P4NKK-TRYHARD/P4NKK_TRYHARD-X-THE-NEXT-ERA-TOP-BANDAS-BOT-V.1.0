

//Constatnes

const Discord = require("discord.js")
const client = new Discord.Client({ intents: 32767 }); // 32767 | 3243773
const { Client, MessageButton, MessageActionRow, MessageEmbed } = require('discord.js');
const config = require('./config.json')
const axios = require('axios')
const mongoose = require('mongoose');
const Band = require('./models/band'); // Asegúrate de que la ruta al archivo del modelo es correcta

// Conexión a MongoDB
mongoose.connect('mongodb+srv://USUARIO:CONTRASEÑA@topbandas.lsrppod.mongodb.net', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// TIENES QUE PONER TU ENLACE DE MONGODB ARRIBA SINO NO FUNCIONA


const fs = require('fs');
let { readdirSync } = require('fs');


//Error catch

process.on('unhandledRejection', error => {
  console.error(error);
});
client.on('shardError', error => {
  console.error(error);
});

//Handlers

client.commands = new Discord.Collection()

fs.readdirSync('./commands').forEach(async (categorys) => {

  const commandFiles = fs.readdirSync(`./commands/${categorys}`).filter((archivo) => archivo.endsWith('js'))
  for (const archivo of commandFiles) {
    const command = require(`./commands/${categorys}/${archivo}`)
    client.commands.set(command.name, command)
  }
})

function presence() {
  let statuses = [
    `${config.status}`,
    `${client.users.cache.size} usuarios`
  ];

  setInterval(function () {

    let status = statuses[Math.floor(Math.random() * statuses.length)];
    client.user.setActivity(status, { type: "WATCHING", status: 'dnd' });

  }, 10000);

}

client.on("ready", () => {
  presence();
});

client.slashcommand = new Discord.Collection()

fs.readdirSync('./slashcommands').forEach(async (categorys) => {
  const commandFilesSlash = fs.readdirSync(`./slashcommands/${categorys}`).filter((archivo) => archivo.endsWith('js'))
  for (const archivo of commandFilesSlash) {
    const command = require(`./slashcommands/${categorys}/${archivo}`)
    client.slashcommand.set(command.data.name, command)
  }
})


client.on('interactionCreate', async interaction => {

  if (interaction.isCommand()) {
    const command = client.slashcommand.get(interaction.commandName)
    if (!command) return;

    try {
      await command.run(client, interaction)
    } catch (e) {
      console.log(e)
      return interaction.reply({ content: `Hubo un error **${e}**`, ephemeral: true })
    }

  } else if (interaction.isAutocomplete()) {

    const command = client.slashcommand.get(interaction.commandName)

    if (!command) return;

    try {
      await command.autocomplete(client, interaction);
    } catch (error) {
      console.error(error);
    }

  }

})



client.on('ready', () => {
  console.log(`Logeado como: ${client.user.tag}`)
});

require('./slashcommands')

client.on('messageCreate', async (message) => {

  let prefix = config.prefix
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();


  let cmd = client.commands.find((c) => c.name === command || c.alias && c.alias.includes(command));


  if (cmd) {
    try {
      cmd.execute(client, message, args)
    } catch (e) {
      return;
    }
  }

});

client.login(config.token)
