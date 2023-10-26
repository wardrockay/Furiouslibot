const queue = require('./variable');

module.exports = {
    /**
   * @param {Client} client
   * @param {Interaction} interaction
   */

    name: 'skip',
    description: 'Passe à la chanson suivante',
    type: 1,

    callback: async (client, interaction) => {
    const serverQueue = queue.get(interaction.guildId);

    if (!interaction.member.voice.channel) return interaction.reply('Vous devez être dans un canal vocal pour sauter la musique.');
    if (!serverQueue || !serverQueue.songs.length) return interaction.reply('Il n\'y a pas de chanson à sauter.');
    if (serverQueue.player) {
        serverQueue.player.stop();
        interaction.reply("Je joue la piste suivante.");
        console.log('Je joue la piste suivante.');
    } else {
        return interaction.reply('Il n\'y a actuellement aucune musique en cours de lecture.');
    }
    }
}