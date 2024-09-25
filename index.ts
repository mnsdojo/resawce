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
const prefix = "!";
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

    const args = message.content.trim().split(/ +/g);
  
    const command = args[0].slice(prefix.length).toLowerCase();
  
    args.shift(); // This removes the command from the args array

  switch (command) {
    case "help":
      await helpCommand(message);
      break;
    case "resources": 
    // Make sure to call resourceCommand correctly
      await resourceCommand(message, args); 
      break;
    default:
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
