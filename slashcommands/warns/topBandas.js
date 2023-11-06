const { SlashCommandBuilder } = require('@discordjs/builders');
const Band = require('./../../models/band'); // Asegúrate de que la ruta al modelo Band es correcta.
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('top-bandas')
    .setDescription('Muestra las bandas con más puntos'),

  async run(client, interaction) {
    const topBands = await Band.find({}).sort({ points: -1 }).limit(10);
    const embed = new MessageEmbed()
      .setTitle('Top Bandas')
      .setDescription(topBands.map((band, index) => `${index + 1}. ${band.name} - ${band.points} puntos`).join('\n'))
      .setColor('#0099ff');

    await interaction.reply({ embeds: [embed] });
  }
};
