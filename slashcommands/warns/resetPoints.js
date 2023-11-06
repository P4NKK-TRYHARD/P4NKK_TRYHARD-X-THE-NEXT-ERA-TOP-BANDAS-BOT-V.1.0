const { SlashCommandBuilder } = require('@discordjs/builders');
const Band = require('../../models/band');
const { updateTopBandsEmbed } = require('./../../models/utils'); // Asumiendo que tienes una función de utilidad para actualizar el embed

module.exports = {
  data: new SlashCommandBuilder()
    .setName('resetear')
    .setDescription('Resetea los puntos de todas las bandas y limpia el top de bandas'),

// ... código anterior ...
async run(client, interaction) {
  // Resetea los puntos de todas las bandas a cero y borra las entradas.
  await Band.deleteMany({});

  // Envía una confirmación de que los puntos han sido reseteados.
  await interaction.reply('Todos los puntos de las bandas han sido reseteados y las bandas eliminadas.');

  // Actualiza el embed de clasificación para que refleje el reseteo.
  await updateTopBandsEmbed(client, interaction.channelId, true); // Pasamos 'true' para indicar que es un reseteo.
}
// ... código posterior ...
}
