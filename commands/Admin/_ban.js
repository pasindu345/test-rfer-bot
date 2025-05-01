/*CMD
  command: /ban
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Admin
  answer: 🚫 Please enter the *User ID* you want to ban

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let admin_id = Bot.getProperty("admin");
if (user.telegramid != admin_id) {
  Bot.sendMessage("❗ Access denied.");
  return;
}

let target_id = message.trim();
if (!target_id || isNaN(target_id)) {
  Bot.sendMessage("❗ Invalid User ID. Please enter a valid numeric ID:");
  Bot.runCommand("process_ban_user"); // ask again
  return;
}

Bot.setProperty(target_id + "?Ban", "ban", "string");

Bot.sendMessage("✅ User ID `" + target_id + "` has been *BANNED* from using the bot.", { parse_mode: "Markdown" });
