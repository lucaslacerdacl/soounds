import getToken from './config/index';
import Discord from 'discord.js';
import * as path from "path";

const prefix = '-soounds';

const sounds = [
  {
    name: `${prefix} taca o pau`,
    file: 'taca_pau',
    image: 'taca_pau.jpg',
    imgText: 'QUEEEEEIMA!'
  }
];

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const playSound = async (voiceChannel, channel, sound) => {
  try {
    const imagePath = path.join(__dirname, `./images/${sound.image}`);
    channel.send(sound.imgText, { files: [imagePath] });
  
    const connection = await voiceChannel.join();
  
    const soundPath = path.join(__dirname, `./sounds/${sound.file}.mp3`);
    const dispatcher = connection.play(
      soundPath,
      {
        filter: 'audioonly',
        volume: 0.4
      }
    );
  
    dispatcher.on('finish', () => {
      voiceChannel.leave();
    });
  } catch(error) {
    console.error(error.message);
  }
 
}


client.on('message', async (message) => {
  if (message.content.includes(prefix)) {
    const sound = sounds.find(sound => sound.name === message.content);

    if (sound) {
      const voiceChannel = message.member.voice.channel;
      const messageChannel = message.channel;
      const sound = sounds.find(sound => sound.name === message.content);
      playSound(voiceChannel, messageChannel, sound);
    } else {
      message.channel.send('Sound Not Found!');
    }
  }
});

const token = getToken();

client.login(token)
  .then(() => {
    console.log("Online");
  });