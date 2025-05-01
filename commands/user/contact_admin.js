/*CMD
  command: contact_admin
  help: 
  need_reply: false
  auto_retry_time: 
  folder: user

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: ☎️ contact
  group: 
CMD*/

// Ban & Maintenance check (recommended)
let stat = Bot.getProperty("" + user.telegramid + "?Ban");
if (stat == "ban") {
  Bot.sendMessage("🚫 *You are banned from using this bot.*", { parse_mode: "Markdown" });
  return;
}

let maintenance = Bot.getProperty("maintenance_mode");
if (maintenance === true) {
  Bot.sendMessage("⚠️ *Bot is under Maintenance.*\nPlease try again later.", { parse_mode: "Markdown" });
  return;
}

Bot.sendMessage("✏️ Please type your message to contact Admin:");
Bot.runCommand("ask_contact_msg");
