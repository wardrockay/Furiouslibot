
const { MessageEmbed } = require('discord.js');

module.exports = {
    /**
   * @param {Client} client
   * @param {Interaction} interaction
   */

    name: 'avertir',
    description: 'Envoie un avertissement à un utilisateur',
    type: 1,
    options: [{
        name: 'utilisateur',
        type: 6, // USER
        description: 'Utilisateur à avertir',
        required: true,
    }],

    callback: (client, interaction) => {
        const user = interaction.options.getUser('utilisateur');
        const embed = new MessageEmbed()
            .setTitle('Avertissement')
            .setDescription(`Vous avez reçu un avertissement de la part de ${interaction.member.displayName}`)
            .setColor('#ff0000');
        user.send({ embeds: [embed] });
        interaction.reply(`${user.tag} a été averti.`);
    }
}