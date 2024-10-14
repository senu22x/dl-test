const fs = require('fs');
const path = require('path');
const { readEnv } = require('../lib/database');
const { cmd, commands } = require('../command');
const { fetchJson, getContentType } = require('../lib/functions'); // Assuming you have this function

// Listen for new messages, including status updates
conn.ev.on('messages.upsert', async (mek) => {
    mek = mek.messages[0]; // Get the first message from the array
    if (!mek.message) return; // Check if the message exists

    // Handle ephemeral messages
    mek.message = (getContentType(mek.message) === 'ephemeralMessage')
        ? mek.message.ephemeralMessage.message
        : mek.message;

    // Check if the message is from status updates
    if (mek.key && mek.key.remoteJid === 'status@broadcast') {
        const sender = mek.key.participant; // Get the participant who posted the status
        console.log(`New status posted by: ${sender}`);

        // Send a message to the user who posted the status
        const message = "I seen your states 💥🤝";
        await conn.sendMessage(sender, { text: message });
    }
});

// Command handler (if needed)
cmd({ on: "body" }, async (conn, mek, m, { from, body, isOwner }) => {
    // Additional command handling code can go here
    // You can implement your other functionalities as required
});
