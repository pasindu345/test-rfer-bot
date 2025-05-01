/*CMD
  command: static
  help: 
  need_reply: false
  auto_retry_time: 
  folder: user

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 📊 statics
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

// === Force Join Check ===
let channel1 = Bot.getProperty("channel1");
let channel2 = Bot.getProperty("channel2");
let channel3 = Bot.getProperty("channel3");

let joined = User.getProperty("joined");
if ((channel1 || channel2 || channel3) && joined !== "Yes") {
  Bot.sendMessage("⚠️ *You must join all required channels to access this feature.*", { parse_mode: "Markdown" });
  return;
}

// === Gather Statistics ===
let all_users = Bot.getProperty("wholeUsers", []);
let total_users = all_users.length;

let total_refs = 0;
for (let i = 0; i < total_users; i++) {
  let refs = Bot.getProperty("ref_total_" + all_users[i]) || 0;
  total_refs += refs;
}

let total_withdraw = Bot.getProperty("total_withdraw") || 0;
let currency = Bot.getProperty("currency") || "USDT";

// === Get Current Time (Colombo) ===
let date = new Date().toLocaleString("en-US", { timeZone: "Asia/Colombo" });

// === Display Text ===
let text =
"📊 <b>Bot Statistics</b>\n\n" +
"👥 <b>Total Users:</b> <code>" + total_users + "</code>\n" +
"🤝 <b>Total Referrals:</b> <code>" + total_refs + "</code>\n" +
"💸 <b>Total Withdraw:</b> <code>" + total_withdraw + " " + currency + "</code>\n\n" +
"⏰ <b>Current Time (Colombo):</b>\n<code>" + date + "</code>\n\n" +
"👑 <b>Bot creator:</b> @Pasindu_21";

Api.sendMessage({
  chat_id: user.chatid,
  text: text,
  parse_mode: "HTML"
});
