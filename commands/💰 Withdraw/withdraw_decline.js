/*CMD
  command: withdraw_decline
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 💰 Withdraw

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// === Withdraw Decline Command ===

let userID = params;
let data = Bot.getProperty("withdraw_info_" + userID);
if (!data) {
  Bot.sendMessage("❗ Withdraw request not found for user ID: " + userID);
  return;
}

let amount = data.amount;
let wallet = data.wallet;
let currency = Bot.getProperty("currency") || "USDT";

// === Mask Wallet ===
function secureMaskWallet(wallet){
  let len = wallet.length;
  if (len <= 6) {
    return wallet.slice(0, 1) + "*****" + wallet.slice(-1);
  }
  let visible_front = Math.floor(len * 0.3);
  let visible_end = Math.floor(len * 0.2);
  let masked_part = "*".repeat(len - (visible_front + visible_end));
  return wallet.slice(0, visible_front) + masked_part + wallet.slice(len - visible_end);
}
let masked_wallet = secureMaskWallet(wallet);

// === Refund user balance ===
let bal_key = "balance_" + userID;
let current_bal = Bot.getProperty(bal_key) || 0;
let new_bal = current_bal + amount;
Bot.setProperty(bal_key, new_bal, "float");

// === Get Date & Time (Colombo) ===
let date = new Date().toLocaleString("en-US", { timeZone: "Asia/Colombo" });

// === Get user details (optional safer fallback) ===
let user_info = Libs.User.getByTelegramID(userID);
let user_firstname = (user_info && user_info.first_name) ? user_info.first_name : "Unknown";
let user_username = (user_info && user_info.username) ? "@" + user_info.username : "Not set";

// === Notify User ===
Api.sendMessage({
  chat_id: userID,
  text:
    "❌ <b>Your withdrawal request was declined.</b>\n\n" +
    "📄 <b>Reason:</b> Binance ID is incorrect or another issue was found.\n" +
    "💸 <b>Refunded:</b> <code>" + amount + " " + currency + "</code>\n" +
    "💰 <b>New Balance:</b> <code>" + new_bal + " " + currency + "</code>\n\n" +
    "✏️ Please check your Binance ID and try again.",
  parse_mode: "HTML"
});

// === Notify Admin ===
Api.sendMessage({
  chat_id: request.from.id,
  text:
    "❌ Withdraw declined and refunded for user ID <code>" + userID + "</code>\n" +
    "💸 Amount: <code>" + amount + " " + currency + "</code>",
  parse_mode: "HTML"
});

// === Notify Proof Channel ===
let proof_channel = Bot.getProperty("proof_channel");
if (proof_channel) {
  let proofMsg =
"<b>❌ Withdrawal Declined</b>\n\n" +
"👤 <b>Name:</b> " + user_firstname + "\n" +
"🔗 <b>Link:</b> <a href='tg://user?id=" + userID + "'>" + user_firstname + "</a>\n" +
"👥 <b>Username:</b> " + user_username + "\n" +
"🆔 <b>User ID:</b> <code>" + userID + "</code>\n" +
"💰 <b>Amount:</b> <code>" + amount + " " + currency + "</code>\n" +
"💼 <b>Binance ID:</b> <code>" + masked_wallet + "</code>\n" +
"⏰ <b>Time:</b> " + date + "\n" +
"📄 <b>Reason:</b> Binance ID is incorrect or other issue.";

  Api.sendMessage({
    chat_id: proof_channel,
    text: proofMsg,
    parse_mode: "HTML"
  });
}

// === Clear withdraw info ===
Bot.setProperty("withdraw_info_" + userID, "", "json");
