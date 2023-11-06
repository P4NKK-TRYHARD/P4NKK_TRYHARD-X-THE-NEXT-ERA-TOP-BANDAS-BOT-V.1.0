const { MessageEmbed } = require('discord.js');
const Band = require('./band'); // Asegúrate de que la ruta al modelo Band es correcta

async function updateTopBandsEmbed(client, channelId) {
  try {
    const channel = await client.channels.fetch(channelId);
    let leaderboardMessage;
    let fetchedMessages;
    let lastId;

    // Utiliza paginación para buscar a través de los mensajes si es necesario
    while (true) {
      fetchedMessages = await channel.messages.fetch({ limit: 100, before: lastId });
      leaderboardMessage = fetchedMessages.find(m =>
        m.embeds.length > 0 && m.embeds[0].title === 'Top Bandas'
      );
      if (leaderboardMessage || fetchedMessages.size === 0) break;
      lastId = fetchedMessages.last().id;
    }

    if (!leaderboardMessage) {
      console.log('No se encontró el mensaje del leaderboard.');
      // Considera enviar un nuevo mensaje si no se encuentra el leaderboard
      return;
    }

    // Obtén los datos actualizados para el embed
    const topBands = await Band.find({}).sort({ points: -1 }).limit(10);
    const updatedEmbed = new MessageEmbed()
      .setTitle('Top Bandas')
      .setDescription(topBands.length ? 
                      topBands.map((band, index) => `${index + 1}. ${band.name} - ${band.points} puntos`).join('\n') : 
                      'No hay bandas para mostrar. Añade puntos para que aparezcan aquí.')
      .setColor('#0099ff');

    // Edita el mensaje con el nuevo embed
    await leaderboardMessage.edit({ embeds: [updatedEmbed] });
  } catch (error) {
    console.error('Error al actualizar el leaderboard:', error);
  }
}

module.exports = { updateTopBandsEmbed };
