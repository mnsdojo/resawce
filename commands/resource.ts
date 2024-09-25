import { Message } from 'discord.js';
import { getResource } from '../data';


export const resourceCommand = async(message: Message, args: string[]) => {
  const category = args[1]; // e.g., 'lang', 'tailwind', or 'projects'
  const subCategory = args[2]; // e.g., specific language like 'react'
  const type = args[3]; // e.g., 'projects' or 'resources'

  // Fetch resources based on the provided arguments
  const resources = getResource(category, subCategory, type as any);

  // Format the resources into a response string
  const response = formatResources(resources);
  try {
    await message.reply(response)
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
