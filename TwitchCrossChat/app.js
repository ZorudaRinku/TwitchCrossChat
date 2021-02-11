'use strict';

console.log('Hello world');

const tmi = require('tmi.js');
var channels = ['', ''];
var crosschannel = null;

const client = new tmi.Client({
    connection: {
        secure: true,
        reconnect: true
    },
    identity: {
        username: '',
        password: ''
    },
    channels: channels
});

client.connect();

client.on('message', (channel, tags, message, self) => {
    if (tags.username == 'crosschat') return
    for (crosschannel of channels) {
        if (crosschannel.toLowerCase().slice(1) != channel.toLowerCase().slice(1)) {
            console.log(`${tags['display-name']} - ${channel}: ${message}`);
            client.say(crosschannel, `[${channel}] @${tags.username}: ${message}`);
        }
    }
});
