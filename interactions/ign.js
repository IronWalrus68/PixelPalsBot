// interactions/ign.js

import MinecraftAPI from 'minecraft-api';
import fs from 'fs/promises';

// Find UUID from Minecraft API
export async function findUUID(userIgn) {
    try {
        const uuid = await MinecraftAPI.uuidForName(userIgn);
        if (!uuid) {
            throw new Error('Username not found'); // Handle non-existent usernames
        }
        return uuid;
    } catch (err) {
        console.error(err);
        return null; // Return null or handle the error as needed
    }
}

// Check if a users.json file exists, if not create a users.json file
export async function touchUserStorage() {
    try {
        await fs.readFile('users.json');
        return;
    } catch {
        await fs.appendFile('users.json', '[]');
        console.log('Created new users.json file!');
        return;
    }
}

// take usernames and uuid, make them into a json file. then add them to the users.json file.
async function createUserObjectAndWrite(discordUsername, minecraftUsername, minecraftUUID) {
  // Create the new user object
  const userObject = {
    "discord username": discordUsername,
    "minecraft username": minecraftUsername,
    "minecraft UUID": minecraftUUID
  };

  try {
    // Read the current content of users.json
    const existingData = await fs.readFile('users.json', 'utf8');
    // Parse the existing JSON data into an array
    const usersArray = JSON.parse(existingData);
    // Push the new user object into the array
    usersArray.push(userObject);
    // Convert the updated array back to a JSON string
    const updatedData = JSON.stringify(usersArray);
    // Write the updated JSON data back to users.json
    await fs.writeFile('users.json', updatedData, 'utf8');
    console.log('New user object added to users.json');
  } catch (error) {
    console.error('Error adding user object:', error);
  }
}

export async function ignInteraction(Discordusername, userIgn) {
    const uuid = await findUUID(userIgn);
    await touchUserStorage();
    createUserObjectAndWrite(Discordusername, userIgn, uuid);
    // await interaction.reply(`Your IGN is ${userIgn}, your UUID is: ${uuid}, your Discord name is: ${Discordusername}`);
}
