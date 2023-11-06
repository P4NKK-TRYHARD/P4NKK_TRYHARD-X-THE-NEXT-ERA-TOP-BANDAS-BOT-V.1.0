
const Discord = require('discord.js');
const { MessageSelectMenu, MessageActionRow, MessageEmbed } = require('discord.js');


module.exports = {
  name: "ticket",
  alias: [],

  async execute(client, message, args) {


    const raw = new Discord.MessageActionRow()
      .addComponents(
        new Discord.MessageSelectMenu()
          .setCustomId("helpp")
          .setPlaceholder('Seleccione una categoría')
          .addOptions([
            {
              label: "Soporte",
              description: "Abre ticket para recibir soporte.",
              emoji: "<:icons_store:875395222673186817>",
              value: "soporte"
            },
            {
              label: "Comprar",
              description: "Ticket relacionado en compras del servidor",
              emoji: "<:donaciones:1053991531368947733>",
              value: "comprar"
            },
            {
              label: "Server Boosting",
              description: "Ticket relacionado la compra de server boosting.",
              emoji: "<:icons_colorboostnitro:869528229436858378>",
              value: "boost"
            }
          ])
      )

    const embed = new Discord.MessageEmbed()
      .setTitle(`Tickets ${message.guild.name}`)
      .setDescription(`Bienvenido al sistema de tickets ${message.guild.name} pulsa el botón de abajo para **crear un ticket**.`)
      .setColor("#2f3136")
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setAuthor(`Sistema de tickets・${message.guild.name}`, message.guild.iconURL({ dynamic: true }))
      .setFooter(`Sistema de tickets・${message.guild.name}`, message.guild.iconURL({ dynamic: true }))
      .setFooter({ text: `${message.guild.name}・Derechos Reservados ©2022`, iconURL: message.guild.iconURL({ dynamic: true }) })

    const m = await message.channel.send({ embeds: [embed], components: [raw], allowedMentions: { parse: [] } })


  }
}