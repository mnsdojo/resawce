import {Client,GatewayIntentBits,Events, Message, REST, Routes } from 'discord.js'
import { helpCommand } from './commands/help';
import { resourceCommand } from './commands/resource';


const client = new Client({intents:[GatewayIntentBits.Guilds,GatewayIntentBits.MessageContent,GatewayIntentBits.GuildMessages,
]});
const Token = process.env.DISCORD_TOKEN;


const commands = [
  {name:"ping",description:"Replies with pong!"},
  {name:"help",description:"Displays help information"},
  {name:"resource",description:"Get resources for programming languages"}
]


const rest = new REST({ version: '10' }).setToken(Token!);


// Registering /slash commands
(async() => {
  try {
    console.log('Started refreshing application (/) commands.');
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID!),{body:commands})
  console.log('Successfully reloaded application (/) commands.');
  } catch(error){
    console.error(error)
  }

})()



client.once(Events.ClientReady, (c) => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
})


// Todo add slash commands

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  const prefix = "!";
  
  
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift()?.toLowerCase();

  switch (command) {
    case "help":
      await helpCommand(message);
      break;
    case "resources": // Fixed typo here
      await resourceCommand(message, args);
      break;
    default:
      // Optionally handle unknown commands
      await message.reply("Unknown command. Type !help for a list of commands.");
      break;
  }
});


client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  switch(interaction.commandName){
    case "ping":
      await interaction.reply("Pong!");
      break;
    case "help":
      await interaction.reply("helping...")
      break;
    case "resource":
      await interaction.reply("resourcing...");
      break;
  }
});







client.login(Token);
