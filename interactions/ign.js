// interactions/ign.js
import dotenv from 'dotenv';
dotenv.config();

// import MinecraftAPI from 'minecraft-player';
import minecraftPlayer from 'minecraft-player';
import fs from 'fs/promises';

const whitelistPath = process.env.whitelistPath;

// Find UUID from Minecraft API
async function findUUID(userIgn) {
  try {
    let userDataFromAPI;
    try {
    userDataFromAPI = await minecraftPlayer(userIgn);
    } catch{throw new Error('invalid name')}
    if (!userDataFromAPI) {
      throw new Error('Username not found'); // Handle non-existent usernames
    }
    const uuid = userDataFromAPI.uuid; // "e76f96e9-b1da-4c1d-8d28-72e87c6aa80a"
    const username = userDataFromAPI.username; // "iron_walrus_68"
    return { uuid, username };
  } catch (err) {
    throw new Error('Username not found'); // Return null or handle the error as needed
  }
}

// Check if a users.json file exists, if not create a users.json file
async function touchUserStorage() {
  try {
    await fs.readFile(whitelistPath);
    return;
  } catch {
    throw new Error('Failed to find the whitelist. adjust path');
  }
}

// take usernames and uuid, make them into a json file. then add them to the users.json file.
async function createUserObjectAndWrite(uuid, username) {
  // Create the new user object
  const userObject = {
    "uuid": uuid,
    "name": username
  };

  try {
    // Read the current content of whitelist.json
    const existingData = await fs.readFile(whitelistPath, 'utf8');
    // Parse the existing JSON data into an array
    const usersArray = JSON.parse(existingData);

    // Check if the user data already exists in the array
    const userExists = usersArray.some(user => user["minecraft username"] === username);
    if (userExists) {
      console.log(`User ${username} already exists in the whitelist.`);
      return; // Exit the function if the user already exists
    }

    // Push the new user object into the array
    usersArray.push(userObject);
    // Convert the updated array back to a JSON string
    const updatedData = JSON.stringify(usersArray, null, 2);
    // Write the updated JSON data back to whitelist.json
    await fs.writeFile(whitelistPath, updatedData, 'utf8');
    console.log(`New user object added to whitelist.json: ${username}`);
  } catch (error) {
    console.error('Error adding user object:', error);
  }
}


export async function ignInteraction(userIgn) {
  let uuid, username;
  try {
    ({ uuid, username } = await findUUID(userIgn));
  } catch (error) {
    throw new Error(error);
  }
  await touchUserStorage();
  await createUserObjectAndWrite(uuid, username);
}

export function errorMessage() {
  let errorMessage = "undefined error :(";
  return errorMessage;
}
