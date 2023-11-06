const { SlashCommandBuilder } = require('@discordjs/builders');
const Band = require('../../models/band'); // Asegúrate de que la ruta al modelo Band es correcta.

module.exports = {
    data: new SlashCommandBuilder()
      .setName('crear-banda')
      .setDescription('Crea una nueva banda con el rol especificado')
      .addRoleOption(option => 
        option.setName('rol')
              .setDescription('El rol para la nueva banda')
              .setRequired(true)),
  
    async run(client, interaction) {
      const bandName = interaction.options.getRole('rol');

    // Verifica si la banda ya existe
    const existingBand = await Band.findOne({ name: bandName });
    if (existingBand) {
      await interaction.reply(`La banda ${bandName} ya existe.`);
      return;
    }

    // Crea una nueva banda
    const newBand = new Band({ name: bandName });
    await newBand.save();

    await interaction.reply(`La banda ${bandName} ha sido creada con éxito.`);
  }
};
