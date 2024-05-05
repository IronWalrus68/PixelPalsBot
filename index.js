import dotenv from 'dotenv';
dotenv.config();
const TOKEN = process.env.discordBotToken;
const CLIENT_ID = process.env.discordBotClientId;

import { Events, REST, Routes } from 'discord.js';
import { ignInteraction, errorMessage } from './interactions/ign.js';

const commands = [
  {
    name: 'beep',
    description: 'Replies with boop!',
  },
  {
    name: 'ign',
    description: 'Add your minecraft username to the pixal pp mc server whitelist!!',
    options: [
      {
        name: 'username',
        type: 3,
        description: 'Your minecraft IGN',
        required: true,
      },
    ],
  },
];

const rest = new REST({ version: '10' }).setToken(TOKEN);

try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}

import { Client, GatewayIntentBits } from 'discord.js';
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on(Events.ClientReady, () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  // beep boop test
  if (interaction.commandName === 'beep') {
    await interaction.reply('boop!');
  }
  // add users ign to mc server whitelist
  if (interaction.commandName === 'ign') {
    const userIgn = interaction.options.getString('username');
    console.log(userIgn)
    try{
    await ignInteraction(userIgn)
    } catch {
      console.log(errorMessage())
      return await interaction.reply(errorMessage)
      }
    await interaction.reply(`Congrats ${interaction.user.username}, You're on the list!`);
  }
});

client.login(TOKEN);