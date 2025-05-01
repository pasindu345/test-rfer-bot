/*CMD
  command: /profile
  help: 
  need_reply: false
  auto_retry_time: 
  folder: user

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 👤 profile
  group: 
CMD*/

if (Bot.getProperty("maintenance_mode") === true) {
  Bot.sendMessage("🛠️ Bot is under maintenance.<br>Please try again later.", { parse_mode: "HTML" });
  return;
}

let name = user.first_name;
let username = user.username ? "@" + user.username : "Not set";
let uid = user.telegramid;

let currency = Bot.getProperty("currency") || "USDT";
let balance = Bot.getProperty("balance_" + uid) || 0;
let referrals = Bot.getProperty("ref_total_" + uid) || 0;
let total_withdraw = Bot.getProperty("total_withdraw_" + uid) || 0;

balance = balance.toFixed(2);
total_withdraw = total_withdraw.toFixed(2);

let text =
"<b>👤 Your Profile</b>\n\n" +
"🔹 <b>Name:</b> " + name + "\n" +
"🔹 <b>Username:</b> " + username + "\n" +
"🆔 <b>User ID:</b> <code>" + uid + "</code>\n\n" +
"💰 <b>Balance:</b> <code>" + balance + " " + currency + "</code>\n" +
"👥 <b>Total Referrals:</b> <code>" + referrals + "</code>\n" +
"💸 <b>Total Withdraw:</b> <code>" + total_withdraw + " " + currency + "</code>";

Api.sendMessage({
  chat_id: user.chatid,
  text: text,
  parse_mode: "HTML"
});
