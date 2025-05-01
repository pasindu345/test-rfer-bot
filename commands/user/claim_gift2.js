/*CMD
  command: claim_gift2
  help: 
  need_reply: true
  auto_retry_time: 
  folder: user

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let code = message.trim();
let gift = Bot.getProperty("gift_" + code);

if (!gift) {
  Bot.sendMessage("❌ Invalid gift code.\n\nPlease try again or contact admin.");
  return;
}

if (gift.used_by) {
  Bot.sendMessage("❌ This gift code has already been redeemed.");
  return;
}

// === Add to user balance ===
let amount = gift.amount;
let bal_key = "balance_" + user.telegramid;
let user_bal = Bot.getProperty(bal_key) || 0;
let new_bal = user_bal + amount;
Bot.setProperty(bal_key, new_bal, "float");

// === Mark code as used ===
gift.used_by = user.telegramid;
Bot.setProperty("gift_" + code, gift, "json");

let currency = Bot.getProperty("currency") || "USDT";
let proof_channel = Bot.getProperty("proof_channel");

// === Proof post content ===
let date = new Date().toLocaleString("en-US", { timeZone: "Asia/Colombo" });

let proof_text =
"<b>🎁 Gift Code Claimed</b>\n\n" +
"👥 <b>Username:</b> @" + (user.username || "Not set") + "\n" +
"🆔 <b>User ID:</b> <code>" + user.telegramid + "</code>\n" +
"💰 <b>Amount:</b> <code>" + amount + " " + currency + "</code>\n" +
"⏰ <b>Time:</b> " + date;

if(proof_channel){
  Api.sendMessage({
    chat_id: proof_channel,
    text: proof_text,
    parse_mode: "HTML"
  });
}

Bot.sendMessage("🎉 Congratulations!\n\n✅ You have successfully redeemed the gift code and received *" + amount + " " + currency + "*.\n\n💰 *New Balance:* " + new_bal + " " + currency, { parse_mode: "Markdown" });
