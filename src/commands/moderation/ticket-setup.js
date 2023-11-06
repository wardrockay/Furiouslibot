const {
   EmbedBuilder,
   ChannelType,
   ActionRowBuilder,
   StringSelectMenuBuilder,
   ApplicationCommandOptionType,
   PermissionFlagsBits,
  } = require('discord.js');
const mongoose = require('mongoose');
const ticketSchema = require('../../schema/ticketSchema');

module.exports = {
    /**
   * @param {Client} client
   * @param {Interaction} interaction
   */

    name: 'ticket-setup',
    description: 'test Setup the ticket system',
    type: 1,
    options:[
        {
            name: 'channel',
            description: 'Le channel dans lequel tu souhaite mettre le system de tickets',
            type: ApplicationCommandOptionType.Channel,
            required: true,

        },
        {
            name: 'category',
            description: 'La catégorie dans lequel tu souhaite envoyer les tickets créé',
            type: ApplicationCommandOptionType.Channel,
            required: true,
        },
    ],
    permissionsRequired: [PermissionFlagsBits.Administrator],

    callback: async (client, interaction) => {

        const channel = interaction.options.getChannel('channel')
        const category = interaction.options.getChannel('category')
       

        try {
            const data = await ticketSchema.findOne({ guild: interaction.guild.id})

            if(!data){
                ticketSchema.create({
                    guild: interaction.guild.id,
                    channel: category.id,
                    ticket: 'first',

                })
            }else{
                await interaction.reply('Vous avez déjà un system de ticket configuré')
                return;
            }
        } catch (error) {
            console.log(error);
        }
        

        const embed = new EmbedBuilder()
        .setTitle('ticket system')
        .setDescription('Si vous avez un probleme, creer un ticket pour les membres du staff')
        .setFooter({text: `${interaction.guild.name} ticket`})

        const menu = new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
            .setCustomId('ticketTopicSelector')
            .setMaxValues(1)
            .setPlaceholder('Choisi un topic')
            .addOptions(
                {
                label: 'General Support',
                value: 'Subject: General Support'
                },
                {
                    label: 'Moderation Support',
                    value: 'Subject: Moderation Support'
                },
                {
                    label: 'Server Support',
                    value: 'Subject: Server Support'
                },
                {
                    label: 'Autre',
                    value: 'Subject: Autre Support'
                }
            )
        )

        await channel.send({embed: [embed], components: [menu]});
        await interaction.reply({ content: `Votre systeme de ticket à été configuré dans ${channel}`, ephemeral: true});
    }
};