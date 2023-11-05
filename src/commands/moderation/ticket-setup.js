const {
   PermissionsBitField,
   EmbedBuilder,
   ChannelType,
   ActionRowBuilder,
   StringSelectMenuBuilder,
   SlashCommandBuilder,
   PermissionFlagsBits,
  } = require('discord.js');
const mongoose = require('mongoose');
const ticketSchema = require('../../schema/ticketSchema');
const { filterFormats } = require('ytdl-core');


module.exports = {
    /**
   * @param {Client} client
   * @param {Interaction} interaction
   */

    name: 'ticket-setup',
    description: 'Setup the ticket message and system',
    type: 1,
    option:[
        {
            name: 'channel',
            description: 'Le channel dans lequel tu souhaite envoyer les tickets',
            type: 1,
            channel_types: 0,
        },
        {
            name: 'catégorie',
            description: 'La catégorie dans lequel tu souhaite envoyer les tickets',
            type: 1,
            channel_types: 4,
        },
    ],
    permissionsRequired: [PermissionFlagsBits.Administrator],

    callback: async (client, interaction) => {
        const channel = interaction.options.getChannel('channel')
        const category = interaction.options.getChannel('categorie')

        ticketSchema.findOne({ guild: interaction.guild.id}, async (err, data) => {
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
        })

        const embed = new EmbedBuilder()
        .setColor('blue')
        .setTitle('ticket system')
        .setDescription('Si vous avez un probleme, creer un ticket pour les membres du staff')
        .setFooter({text: `${interaction.guild.name} ticket`})

        const menu = new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
            .setCustomId('select')
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
        await interaction.reply({ content: `Your ticket System has been set in ${channel}`, ephemeral: true});
    }
};