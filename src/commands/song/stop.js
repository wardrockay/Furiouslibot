const queue = require('./variable');

module.exports = {

    /**
   * @param {Client} client
   * @param {Interaction} interaction
   */

    name: 'stop',
    description: 'Arrête la musique',
    type: 1,

    callback: (client, interaction) => {
        const serverQueue = queue.get(interaction.guildId);
        if (!interaction.member.voice.channel) return interaction.reply('Vous devez être dans un canal vocal pour arrêter la musique.');
        serverQueue.songs = [];
        if (serverQueue.player) {
            serverQueue.player.stop();
            interaction.reply("j'ai arreté la musique.")
            console.log("J'ai arreté la musique")
        }
    }
}