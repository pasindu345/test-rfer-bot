/*CMD
  command: withdraw_paid
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

if (request && request.message) {
  Api.deleteMessage({
    chat_id: request.message.chat.id,
    message_id: request.message.message_id
  });
}
// === Withdraw Paid Command ===

// === Get Passed user ID ===
let userID = params; // passed from callback_data

// === Get withdraw info ===
let data = Bot.getProperty("withdraw_info_" + userID);
if (!data) {
  Bot.sendMessage("❗ Withdraw request not found for user ID: " + userID);
  return;
}

let amount = data.amount;
let wallet = data.wallet;

// === Get currency from bot property ===
let currency = Bot.getProperty("currency") || "USDT";

// === Get Proof Channel ===
let proof_channel = Bot.getProperty("proof_channel");

// === Helper Function to mask wallet ===
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

// === Prepare Info ===
let user_link = "<a href='tg://user?id=" + userID + "'>User</a>";
let date = new Date().toLocaleString("en-US", { timeZone: "Asia/Colombo" });

let proof_text =
"<b>✅ Withdrawal Paid</b>\n\n" +
"🆔 <b>User ID:</b> <code>" + userID + "</code>\n" +
"🔗 <b>User:</b> " + user_link + "\n" +
"💰 <b>Amount:</b> <code>" + amount + " " + currency + "</code>\n" +
"💼 <b>Wallet:</b> <code>" + masked_wallet + "</code>\n" +
"⏰ <b>Time:</b> " + date;

// === Notify User ===
Api.sendMessage({
  chat_id: userID,
  text: "✅ Your withdrawal of <b>" + amount + " " + currency + "</b> has been <b>paid</b> successfully!\n\n💼 <b>Wallet:</b> <code>" + masked_wallet + "</code>",
  parse_mode: "HTML"
});

// === Notify Admin (Who clicked Done button) ===
Api.sendMessage({
  chat_id: request.from.id,
  text: "✅ Payment marked as paid for User ID <code>" + userID + "</code>",
  parse_mode: "HTML"
});

// === Send to Proof Channel ===
if(proof_channel){
  Api.sendMessage({
    chat_id: proof_channel,
    text: proof_text,
    parse_mode: "HTML"
  });
}

// === Clear withdraw info (optional clean up) ===
Bot.setProperty("withdraw_info_" + userID, "", "json");
