import { ActivityType, Client, Events, IntentsBitField, Partials } from 'discord.js';
import WOK from 'wokcommands';
import path from 'path';
require('dotenv/config');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.DirectMessages,
    IntentsBitField.Flags.MessageContent,
  ],
  partials: [Partials.Channel],
});

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);

  client.user?.setPresence({
    status: 'online',
    activities: [
      {
        name: 'Valorante 🔫',
        type: ActivityType.Playing,
        state: '*★,°*:.☆(￣▽￣) / $:*.°★* 。',
      },
    ],
  });

  new WOK({
    client,
    commandsDir: path.join(__dirname, 'commands'),
    botOwners: ['95377567707566080'],
    testServers: ['289669662612914176', '1215498228271677540'],
    mongoUri: process.env.DATABASE_URL,
    cooldownConfig: {
      errorMessage: 'Please wait {TIME} before doing that again.',
      botOwnersBypass: true,
      dbRequired: 300,
    },
  });
});

client.login(process.env.TOKEN);


//TODO: https://discord.js.org/docs/packages/discord.js/14.14.1/GuildMember:Class#disableCommunicationUntil