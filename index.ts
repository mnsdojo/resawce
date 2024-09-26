import {
  Client,
  GatewayIntentBits,
  Events,
  REST,
  Routes,
  SlashCommandBuilder,
} from "discord.js";
import { helpCommand } from "./commands/help";
import {
  handleProjectsCommand,
  handleResouceSlashCommand,
  handleResourceMessageCommand,
} from "./commands/resource";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
  ],
});

const Token = process.env.DISCORD_TOKEN;
const ClientId = process.env.CLIENT_ID;

if (!Token || !ClientId) {
  console.error("Missing DISCORD_TOKEN or CLIENT_ID in environment variables");
  process.exit(1);
}

const commands = [
  new SlashCommandBuilder()
    .setName("projects")
    .setDescription("Get List of projects"),
  new SlashCommandBuilder()
    .setName("resource")
    .setDescription("Get resources for programming languages")
    .addStringOption((option) =>
      option
        .setName("language")
        .setDescription("The programming language to get resources for")
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("subcategory")
        .setDescription("Subcategory of resources")
        .setRequired(false),
    )
    .addStringOption((option) =>
      option
        .setName("type")
        .setDescription("Type of resources")
        .setRequired(false),
    ),
  new SlashCommandBuilder()
    .setName("help")
    .setDescription("Displays help information"),
];

const rest = new REST({ version: "10" }).setToken(Token!);

async function registerCommands() {
  try {
    console.log("Started refreshing application (/) commands.");
    await rest.put(Routes.applicationCommands(ClientId!), {
      body: commands,
    });
    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error("Error registering slash commands:", error);
  }
}

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
  registerCommands();
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  switch (interaction.commandName) {
    case "projects":
      await handleProjectsCommand(interaction);
      break;
    case "ping":
      await interaction.reply("Pong!");
      break;
    case "help":
      await interaction.reply("helping...");
      break;
    case "resource":
      await handleResouceSlashCommand(interaction);
      break;
  }
});

client.login(Token);
