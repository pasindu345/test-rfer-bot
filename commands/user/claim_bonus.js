/*CMD
  command: claim_bonus
  help: 
  need_reply: false
  auto_retry_time: 
  folder: user

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

if (request && request.message) {
  Api.deleteMessage({
    chat_id: request.message.chat.id,
    message_id: request.message.message_id
  });
}
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
let uid = user.telegramid;
let now = new Date().getTime();

let last_claim = Bot.getProperty("bonus_last_" + uid);
let cooldown = 24 * 60 * 60 * 1000; // 24 hours in ms

if (last_claim && (last_claim + cooldown) > now) {
  Bot.answerCallbackQuery({
    callback_query_id: request.id,
    text: "❌ You already claimed. Wait for reset."
  });
  return;
}

// Give bonus reward
let reward = Bot.getProperty("refer_reward") || 1; // reuse refer reward amount or default 1
let currency = Bot.getProperty("currency") || "USDT";

let bal = Bot.getProperty("balance_" + uid) || 0;
let new_bal = bal + reward;

Bot.setProperty("balance_" + uid, new_bal, "float");
Bot.setProperty("bonus_last_" + uid, now, "integer");

// Notify user
Api.sendMessage({
  chat_id: user.chatid,
  text: "🎉 Bonus claimed!\nYou received <b>" + reward + " " + currency + "</b>.",
  parse_mode: "HTML"
});

// Notify proof channel
let proof_channel = Bot.getProperty("proof_channel");
let date = new Date().toLocaleString("en-US", { timeZone: "Asia/Colombo" });

let proof_text =
"<b>🎁 Bonus Claimed</b>\n\n" +
"👤 <b>Username:</b> @" + (user.username || "Not set") + "\n" +
"🆔 <b>User ID:</b> <code>" + uid + "</code>\n" +
"💰 <b>Amount:</b> <code>" + reward + " " + currency + "</code>\n" +
"⏰ <b>Time:</b> " + date;

if(proof_channel){
  Api.sendMessage({
    chat_id: proof_channel,
    text: proof_text,
    parse_mode: "HTML"
  });
}

// Schedule notification after 24h
Bot.run({
  command: "notify_bonus_ready",
  run_after: 24 * 60 * 60, // 24 hours
  options: { user_id: uid }
});
