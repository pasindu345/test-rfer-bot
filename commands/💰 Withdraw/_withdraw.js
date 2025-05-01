/*CMD
  command: /withdraw
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 💰 Withdraw

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 💸 withdraw
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
let user_wallet = User.getProperty("user_wallet");
let wallet_display = user_wallet ? "<code>" + user_wallet + "</code>" : "<i>Not set</i>";

let text =
"💳 <b>Wallet Management</b>\n\n" +
"💼 <b>Current Binance ID:</b> " + wallet_display + "\n\n" +
"⚠️ <i>Please make sure to enter your correct Binance ID for receiving withdrawals.</i>\n\n" +
"👉 Use the buttons below to set/change your Binance ID or proceed to withdraw.";

Api.sendMessage({
  chat_id: user.chatid,
  text: text,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [
      [{ text: "💼 Set/Change Binance ID", callback_data: "set_wallet" }],
      [{ text: "💸 Withdraw", callback_data: "proceed_withdraw" }]
    ]
  }
});
