const { SlashCommandBuilder } = require('@discordjs/builders');
const Band = require('../../models/band');
const { updateTopBandsEmbed } = require('./../../models/utils'); // Asumiendo que tienes una función de utilidad para actualizar el embed

module.exports = {
  data: new SlashCommandBuilder()
    .setName('quitar-puntos')
    .setDescription('Quita puntos a la banda especificada')
    .addStringOption(option =>
      option.setName('nombre')
        .setDescription('El nombre de la banda')
        .setRequired(true))
    .addIntegerOption(option =>
      option.setName('puntos')
        .setDescription('Número de puntos a quitar')
        .setRequired(true)),
  
  async run(client, interaction) {
    const bandName = interaction.options.getString('nombre');
    const pointsToRemove = interaction.options.getInteger('puntos');

    const band = await Band.findOne({ name: bandName });
    if (band && band.points >= pointsToRemove) {
      band.points -= pointsToRemove;
      await band.save();
      await interaction.reply(`Se han quitado ${pointsToRemove} puntos de la banda ${bandName}.`);
      await updateTopBandsEmbed(client, interaction.channelId);
    } else {
      await interaction.reply(`La banda ${bandName} no tiene suficientes puntos o no existe.`);
    }
  }
};
