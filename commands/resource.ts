import { ChatInputCommandInteraction, EmbedBuilder, Message } from "discord.js";
import { getResource } from "../data";

//handle slash command

export const handleResouceSlashCommand = async (
  interaction: ChatInputCommandInteraction,
) => {
  const category = interaction.options.getString("language", true);
  const subCategory = interaction.options.getString("subcategory");
  const type = interaction.options.getString("type");

  console.log(
    "Slash Command - Category:",
    category,
    "Subcategory:",
    subCategory,
    "Type:",
    type,
  );

  try {
    const resources = getResource(category, subCategory!, type as any);
    const response = formatResources(resources);
    await interaction.reply({ content: response, ephemeral: true });
  } catch (error) {
    console.error("Error in slash command:", error);
    await interaction.reply({
      content:
        "There was an error while fetching resources. Please try again later.",
      ephemeral: true,
    });
  }
};

// Demo projects list
const demoProjects = [
  {
    name: "Weather App",
    description: "A simple weather application using a public API",
    link: "https://github.com/example/weather-app",
  },
  {
    name: "Todo List",
    description: "A basic todo list application with local storage",
    link: "https://github.com/example/todo-list",
  },
  {
    name: "Blog Platform",
    description: "A full-stack blog platform with user authentication",
    link: "https://github.com/example/blog-platform",
  },
];

export const handleProjectsCommand = async (
  interaction: ChatInputCommandInteraction,
) => {
  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle("Available Projects")
    .setDescription("Here's a list of our current projects:")
    .setTimestamp();

  demoProjects.forEach((project, index) => {
    embed.addFields({
      name: `${index + 1}. ${project.name}`,
      value: `${project.description}\n[View Project](${project.link})`,
    });
  });
  await interaction.reply({ embeds: [embed] });
};
function formatResources(resources: {
  projects: string[];
  resources: string[];
}) {
  if (resources.projects.length === 0 && resources.resources.length === 0) {
    return "No resources found.";
  }

  let response = "";
  if (resources.resources.length > 0) {
    response += "**Resources:**\n" + resources.resources.join("\n") + "\n";
  }
  if (resources.projects.length > 0) {
    response += "**Projects:**\n" + resources.projects.join("\n");
  }
  return response;
}
