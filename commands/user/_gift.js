/*CMD
  command: /gift
  help: 
  need_reply: false
  auto_retry_time: 
  folder: user

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 🔑 gift code
  group: 
CMD*/

// === Ban Check ===
let stat = Bot.getProperty("" + user.telegramid + "?Ban");
if (stat == "ban") {
  Bot.sendMessage("🚫 *You are banned from using this bot.*", { parse_mode: "Markdown" });
  return;
}

// === Maintenance Mode Check ===
let maintenance = Bot.getProperty("maintenance_mode");
if (maintenance === true) {
  Bot.sendMessage("⚠️ *Bot is under Maintenance.*\nPlease try again later.", { parse_mode: "Markdown" });
  return;
}
let admin_id = Bot.getProperty("admin");

let inline = [
  [{ text: "🎁 Claim Gift", callback_data: "claim_gift" }]
];

if (user.telegramid == admin_id) {
  inline.push([{ text: "➕ Create Gift Code", callback_data: "create_gift_code" }]);
}

Api.sendMessage({
  chat_id: user.chatid,
  text: "🎉 <b>Gift Code Menu</b>\n\nChoose an action below:",
  parse_mode: "HTML",
  reply_markup: { inline_keyboard: inline }
});
