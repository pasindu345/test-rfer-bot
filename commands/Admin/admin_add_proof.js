/*CMD
  command: admin_add_proof
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Admin
  answer: Please enter the proof channel username (e.g., @Reload_proofs

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let ch = message.trim();

// Add @ if missing
if (!ch.startsWith("@")) {
  ch = "@" + ch;
}

// Validate the format
if (!/^@[a-zA-Z0-9_]{5,}$/.test(ch)) {
  Api.sendMessage({
    chat_id: user.telegramid,
    text: "❗ Invalid channel username format.",
  });
  return; // Make sure this is not inside another function or forbidden block
}

// Save the channel
Bot.setProperty("proof_channel", ch, "string");

// Send confirmation message
Api.sendMessage({
  chat_id: user.telegramid,
  text: "✅ Proof channel set to: " + ch,
});
