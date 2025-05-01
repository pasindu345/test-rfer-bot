/*CMD
  command: /unban
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Admin
  answer: ✅ Please enter the *User ID* you want to unban

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
  Bot.runCommand("process_unban_user");
  return;
}

Bot.setProperty(target_id + "?Ban", "", "string");

Bot.sendMessage("✅ User ID `" + target_id + "` has been *UNBANNED* and can use the bot again.", { parse_mode: "Markdown" });
