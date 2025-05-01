/*CMD
  command: set_wallet
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 💰 Withdraw
  answer: *💼 Please enter your wallet address*

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
let wallet = message.trim();

User.setProperty("user_wallet", wallet, "string");

Bot.sendMessage("✅ Your wallet has been saved!\n\n💼 `" + wallet + "`", { parse_mode: "Markdown" });

// Back to withdraw menu
Bot.runCommand("/withdraw");
