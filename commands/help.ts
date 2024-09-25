import {Message} from 'discord.js'

export const helpCommand = async (message: Message) => {
  const helpText = `
  **Available Commands:**
  - \`!resources lang [language]\`: Get resources for a specific language (e.g., react, golang).
  - \`!resources tailwind\`: Get Tailwind CSS resources.
  - \`!resources projects\`: Get general project ideas.
    `;


  try {
    await message.reply(helpText.trim())
  } catch(error){
        await message.reply('There was an error displaying the help message. Please try again later.');
  }
}
