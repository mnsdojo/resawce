import { Message } from 'discord.js';
import { getResource } from '../data';


export const resourceCommand = async (message: Message, args: string[]) => {
  console.log('Arguments received:', typeof args); // Log all arguments for debugging

  const category = args[0]; // Use args[0] as the category (e.g., 'projects')
  const subCategory = args[1]; // Optional second argument
  const type = args[2]; // Optional third argument

  // If no category is specified, prompt the user
  if (!category) {
    await message.reply("Please specify a category.");
    return;
  }

  // // For demonstration, create demo resources
  // const demoResources = {
  //   resources: [
  //     "Demo Resource 1: https://example.com/resource1",
  //     "Demo Resource 2: https://example.com/resource2",
  //   ],
  //   projects: [
  //     "Demo Project 1: https://example.com/project1",
  //     "Demo Project 2: https://example.com/project2",
  //   ],
  // };

  // // Check if the specified category is "projects"
  // if (category.toLowerCase() === "projects") {
  //   await message.reply(`Here are the projects:\n${demoResources.projects.join('\n')}`);
  // } else if (category.toLowerCase() === "resources") {
  //   await message.reply(`Here are the resources:\n${demoResources.resources.join('\n')}`);
  // } else {
  //   await message.reply("Invalid category. Please use 'projects' or 'resources'.");
  // }


    const resources = getResource(category, subCategory, type as any); // Adjust according to your function signature
      const response = formatResources(resources);
  try {
        await message.reply(response);
  } catch(error){
        await message.reply('There was an error while fetching resources. Please try again later.');
  }
};


function formatResources(resources: { projects: string[]; resources: string[] }) {
  if (resources.projects.length === 0 && resources.resources.length === 0) {
    return "No resources found.";
  }

  let response = '';
  if (resources.resources.length > 0) {
    response += '**Resources:**\n' + resources.resources.join('\n') + '\n';
  }
  if (resources.projects.length > 0) {
    response += '**Projects:**\n' + resources.projects.join('\n');
  }
  return response;
}
