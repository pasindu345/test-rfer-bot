/*CMD
  command: /refer
  help: 
  need_reply: false
  auto_retry_time: 
  folder: user

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 🔗 refer
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

// === Referral Info ===
let my_uid = User.getProperty("unique_id");
let bot_link = "https://t.me/" + bot.name + "?start=" + my_uid;
let total_refs = Bot.getProperty("ref_total_" + user.telegramid) || 0;

let text =
"<b>🔗 Your Referral Info</b>\n\n" +
"👥 <b>Total Referrals:</b> <code>" + total_refs + "</code>\n\n" +
"📣 <b>Invite friends using link below:</b>\n<code>" + bot_link + "</code>";

Api.sendMessage({
  chat_id: user.chatid,
  text: text,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [
      [{ text: "🔗 Copy Referral Link", url: bot_link }]
    ]
  }
});
