'use strict';

var _index = require('./config/index');

var _index2 = _interopRequireDefault(_index);

var _discord = require('discord.js');

var _discord2 = _interopRequireDefault(_discord);

var _path = require('path');

var path = _interopRequireWildcard(_path);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prefix = '-soounds';

var sounds = [{
  name: prefix + ' taca o pau',
  file: 'taca_pau',
  image: 'taca_pau.jpg',
  imgText: 'QUEEEEEIMA!'
}];

var client = new _discord2.default.Client();

client.on('ready', function () {
  console.log('Logged in as ' + client.user.tag + '!');
});

var playSound = async function playSound(voiceChannel, channel, sound) {
  try {
    var imagePath = path.join(__dirname, './images/' + sound.image);
    channel.send(sound.imgText, { files: [imagePath] });

    var connection = await voiceChannel.join();

    var soundPath = path.join(__dirname, './sounds/' + sound.file + '.mp3');
    var dispatcher = connection.play(soundPath, {
      filter: 'audioonly',
      volume: 0.4
    });

    dispatcher.on('finish', function () {
      voiceChannel.leave();
    });
  } catch (error) {
    console.error(error.message);
  }
};

client.on('message', async function (message) {
  if (message.content.includes(prefix)) {
    var sound = sounds.find(function (sound) {
      return sound.name === message.content;
    });

    if (sound) {
      var voiceChannel = message.member.voice.channel;
      var messageChannel = message.channel;
      var _sound = sounds.find(function (sound) {
        return sound.name === message.content;
      });
      playSound(voiceChannel, messageChannel, _sound);
    } else {
      message.channel.send('Sound Not Found!');
    }
  }
});

var token = (0, _index2.default)();

client.login(token).then(function () {
  console.log("Online");
});