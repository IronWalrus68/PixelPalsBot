# PixelPalsBot

PixelPalsBot is a Discord bot designed to seamlessly add members from my Discord server to the whitelist of my Minecraft server, ensuring that only trusted members can join the game.

## Features
- Automatically adds Discord users to the Minecraft server whitelist.
- Easy-to-use commands for adding users.
- Integration with Discord for a smooth user experience.

## Artwork
The artwork for PixelPalsBot was beautifully drawn by atlasdr0wned. We appreciate their creative contribution to the project!

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/IronWalrus68/PixelPalsBot.git
    ```

2. Navigate to the project directory:
    ```bash
    cd PixelPalsBot
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

4. Set up your environment variables:
    - Create a `.env` file in the root directory.
    - Add your Discord bot token and Minecraft server details:
        ```
        discordBotToken=your_discord_bot_token
        discordBotClientId=your_discord_client_ID
        whitelistPath=the_path_to_your_whitelist_file_in_your_server
        ```

5. Start the bot:
    ```bash
    node index.js
    ```

## Usage

- **Add a user to the whitelist:**
    ```
    !whitelist add <username>
    ```

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## Contact
For any questions or issues, please open an issue in the repository or contact us through the email form on my website, camj.uk.

Enjoy using PixelPalsBot and happy gaming!
