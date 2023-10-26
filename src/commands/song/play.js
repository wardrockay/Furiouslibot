
const { createAudioPlayer, createAudioResource, joinVoiceChannel } = require('@discordjs/voice');
const ytdl = require('ytdl-core');

const queue = new Map();

module.exports = {
    /**
   * @param {Client} client
   * @param {Interaction} interaction
   */

    name: 'play',
    description: 'Joue une musique à partir d\'un lien YouTube',
    type: 1,
    options: [{
        name: 'lien',
        type: 3, // STRING
        description: 'Lien YouTube de la musique',
        required: true,
    }],

    callback: async (client, interaction) => {
        const args = interaction.options.data.map(opt => opt.value);
        const serverQueue = queue.get(interaction.guildId);
        const voiceChannel = interaction.member.voice.channel;

       // console.log(voiceChannel)
        if (!voiceChannel) return interaction.reply('Vous devez être dans un canal vocal pour jouer de la musique.');
        
        if (!args[0]) {
            return interaction.reply('Veuillez fournir une URL valide.');
        }
        
        try {
            const songInfo = await ytdl.getInfo(args[0]);   
            const song = {
                title: songInfo.videoDetails.title,
                url: songInfo.videoDetails.video_url,
            };

            if (!serverQueue) {
                const queueConstruct = {
                    textChannel: interaction.channel,
                    voiceChannel: voiceChannel,
                    connection: null,
                    songs: [],
                    volume: 100,
                    playing: true
                };
                queue.set(interaction.guildId, queueConstruct);
                queueConstruct.songs.push(song);

                const connection = joinVoiceChannel({
                    channelId: voiceChannel.id,
                    guildId: voiceChannel.guild.id,
                    adapterCreator: voiceChannel.guild.voiceAdapterCreator,
                });
                queueConstruct.connection = connection;
                play(interaction.guild, queueConstruct.songs[0]);
                interaction.reply(`Joue maintenant : ${song.title}`);
            } else {
                serverQueue.songs.push(song);
                //console.log(serverQueue.songs)
                return interaction.reply(`${song.title} a été ajouté à la file d'attente!`);
                
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des informations de la vidéo :", error);
            return interaction.reply("Une erreur s'est produite lors de la récupération des informations de la vidéo. Veuillez réessayer avec une URL valide.");
        }
    }

};

function play(guild, song) {
    const serverQueue = queue.get(guild.id);
   
    if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }

    const stream = ytdl(song.url, { filter: 'audioonly', quality: 'highestaudio', format: 'opus' });
    const resource = createAudioResource(stream);

    // Créez un nouvel AudioPlayer pour chaque chanson
    serverQueue.player = createAudioPlayer();
    serverQueue.player.on('stateChange', (oldState, newState) => {
        if (newState.status === 'idle' && oldState.status === 'playing') {
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);                    
        }
    });
    serverQueue.player.on('error', error => {
        console.error('Erreur avec le AudioPlayer:', error);
    });

    serverQueue.player.play(resource);
    serverQueue.connection.subscribe(serverQueue.player);
}
