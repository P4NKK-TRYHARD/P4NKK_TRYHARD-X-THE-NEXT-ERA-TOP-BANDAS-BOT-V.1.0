const { SlashCommandBuilder } = require('@discordjs/builders');
const Band = require('../../models/band');
const { updateTopBandsEmbed } = require('../../models/utils'); // Asegúrate de tener esta función definida en 'utils.js'

module.exports = {
  data: new SlashCommandBuilder()
    .setName('añadir-puntos')
    .setDescription('Añade puntos a la banda especificada')
    .addStringOption(option => 
      option.setName('banda')
      .setDescription('El nombre de la banda')
      .setRequired(true))
    .addIntegerOption(option => 
      option.setName('puntos')
      .setDescription('Número de puntos a añadir')
      .setRequired(true)),

  async run(client, interaction) {
    const bandName = interaction.options.getString('banda');
    const pointsToAdd = interaction.options.getInteger('puntos');

    const band = await Band.findOne({ name: bandName });
    if (band) {
      band.points += pointsToAdd;
      await band.save();
      await interaction.reply(`Se han añadido ${pointsToAdd} puntos a la banda ${bandName}.`);
      // Ahora actualizamos el leaderboard
      await updateTopBandsEmbed(client, interaction.channelId); // Asume que tienes una función que maneja esto
    } else {
      await interaction.reply(`La banda ${bandName} no existe.`);
    }
  }
};
