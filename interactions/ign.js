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
        // console.error(err);
        throw null; // Return null or handle the error as needed
    }
}

// Check if a users.json file exists, if not create a users.json file
export async function touchUserStorage() {
    try {
        await fs.readFile('whitelist.json');
        return;
    } catch {
        await fs.appendFile('whitelist.json', '[]');
        console.log('Created new whitelist.json file!');
        return;
    }
}

// take usernames and uuid, make them into a json file. then add them to the users.json file.
async function createUserObjectAndWrite(minecraftUsername, minecraftUUID) {
  // Create the new user object
  const userObject = {
    "minecraft UUID": minecraftUUID,
    "minecraft username": minecraftUsername
  };
  
  try {
    // Read the current content of whitelist.json
    const existingData = await fs.readFile('whitelist.json', 'utf8');
    // Parse the existing JSON data into an array
    const usersArray = JSON.parse(existingData);
    
    // Check if the user data already exists in the array
    const userExists = usersArray.some(user => user["minecraft username"] === minecraftUsername);
    if (userExists) {
      console.log(`User ${minecraftUsername} already exists in the whitelist.`);
      return; // Exit the function if the user already exists
    }
    
    // Push the new user object into the array
    usersArray.push(userObject);
    // Convert the updated array back to a JSON string
    const updatedData = JSON.stringify(usersArray, null, 2);
    // Write the updated JSON data back to whitelist.json
    await fs.writeFile('whitelist.json', updatedData, 'utf8');
    console.log(`New user object added to whitelist.json: ${minecraftUsername}`);
  } catch (error) {
    console.error('Error adding user object:', error);
  }
}


export async function ignInteraction(userIgn) {
    const uuid = await findUUID(userIgn);
    await touchUserStorage();
    createUserObjectAndWrite(userIgn, uuid);
}
