/*CMD
  command: confrim channel
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Admin

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let proof_channel = Bot.getProperty("proof_channel");
if (!proof_channel) {
  Bot.sendMessage("❗ Proof channel not set.");
  return;
}

let currency = Bot.getProperty("currency") || "USDT";
let wallet = Bot.getProperty("wallet_" + user.telegramid); // assume you store wallet per user
let masked_wallet = wallet ? wallet.slice(0, 3) + "*****" + wallet.slice(-2) : "Not set";
let payment_method = Bot.getProperty("last_payment_method_" + user.telegramid) || "Not set";

let date = new Date();
let time = date.toLocaleString("en-US", { timeZone: "Asia/Colombo" }); // or any format

let proof_text =
  "*New Withdrawal Proof*\n\n" +
  "*Username:* @" + (user.username || "NoUsername") + "\n" +
  "*Telegram ID:* `" + user.telegramid + "`\n" +
  "*Amount:* " + params.amount + " " + currency + "\n" +
  "*Wallet:* `" + masked_wallet + "`\n" +
  "*Method:* " + payment_method + "\n" +
  "*Time:* " + time;

Api.sendMessage({
  chat_id: proof_channel,
  text: proof_text,
  parse_mode: "Markdown"
});
