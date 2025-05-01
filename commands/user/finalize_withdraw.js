/*CMD
  command: finalize_withdraw
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

// === Withdraw Finalize Command ===

let withdraw_enabled = Bot.getProperty("withdraw_enabled");
if (withdraw_enabled === false) {
  Bot.sendMessage("❗ Withdrawals are currently *disabled* by admin. Please try again later.", { parse_mode: "Markdown" });
  Bot.runCommand("menu");
  return;
}

let maintenance = Bot.getProperty("maintenance_mode");
if (maintenance === true) {
  Bot.sendMessage("⚠️ Withdrawals are currently *disabled due to Maintenance*. Please try again later.", { parse_mode: "Markdown" });
  Bot.runCommand("menu");
  return;
}

// === Helpers ===
function secureMaskWallet(wallet) {
  let len = wallet.length;
  if (len <= 6) return wallet[0] + "*****" + wallet.slice(-1);
  let front = Math.floor(len * 0.3);
  let end = Math.floor(len * 0.2);
  let masked = "*".repeat(len - front - end);
  return wallet.slice(0, front) + masked + wallet.slice(len - end);
}

// === Withdrawal Details ===
let userID = user.telegramid;
let amount = User.getProperty("withdraw_amount");
let wallet = User.getProperty("user_wallet");
let proof_channel = Bot.getProperty("proof_channel");
let admin_id = Bot.getProperty("admin");
let currency = Bot.getProperty("currency") || "USDT";

if (!amount || amount <= 0) {
  Bot.sendMessage("❗ Invalid withdraw amount. Please start again.");
  Bot.runCommand("menu");
  return;
}
if (!wallet) {
  Bot.sendMessage("❗ Please set your Binance ID (wallet) before withdrawing.");
  Bot.runCommand("menu");
  return;
}

let bal_key = "balance_" + userID;
let user_bal = Bot.getProperty(bal_key) || 0;
if (user_bal < amount) {
  Bot.sendMessage("❗ Insufficient balance. Your balance is only *" + user_bal + " " + currency + "*.", { parse_mode: "Markdown" });
  Bot.runCommand("menu");
  return;
}

let new_bal = user_bal - amount;
Bot.setProperty(bal_key, new_bal, "float");

let total_wd = Bot.getProperty("total_withdraw") || 0;
Bot.setProperty("total_withdraw", total_wd + amount, "float");

// === Save data ===
Bot.setProperty("withdraw_info_" + userID, {
  user_id: userID,
  amount: amount,
  wallet: wallet
}, "json");

let masked_wallet = secureMaskWallet(wallet);
let date = new Date().toLocaleString("en-US", { timeZone: "Asia/Colombo" });
let username = user.username ? "@" + user.username : "Not set";
let user_link = "<a href='tg://user?id=" + userID + "'>" + user.first_name + "</a>";

let user_info =
  "👤 <b>Name:</b> " + user.first_name + "\n" +
  "🔗 <b>Link:</b> " + user_link + "\n" +
  "👥 <b>Username:</b> " + username + "\n" +
  "🆔 <b>User ID:</b> <code>" + userID + "</code>\n\n" +
  "💰 <b>Amount:</b> <code>" + amount + " " + currency + "</code>\n";

let proof_text =
  "<b>💸 New Withdraw Request</b>\n\n" +
  user_info +
  "💼 <b>Binance ID:</b> <code>" + masked_wallet + "</code>\n" +
  "⏰ <b>Time:</b> " + date;

if (proof_channel) {
  Api.sendMessage({
    chat_id: proof_channel,
    text: proof_text,
    parse_mode: "HTML"
  });
}

let admin_text =
  "<b>💸 New Withdraw Request (Full Details)</b>\n\n" +
  user_info +
  "💼 <b>Binance ID:</b> <code>" + wallet + "</code>\n" +
  "⏰ <b>Time:</b> " + date;

Api.sendMessage({
  chat_id: admin_id,
  text: admin_text,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [
      [
        { text: "✅ Paid", callback_data: "withdraw_paid " + userID },
        { text: "❌ Decline", callback_data: "withdraw_decline " + userID }
      ]
    ]
  }
});

Bot.sendMessage("✅ Your withdraw request of *" + amount + " " + currency + "* has been submitted and is under review.\n\n💰 *New Balance:* " + new_bal + " " + currency, { parse_mode: "Markdown" });

