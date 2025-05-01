/*CMD
  command: proceed_withdraw
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
let withdraw_enabled = Bot.getProperty("withdraw_enabled");
if (withdraw_enabled === false) {
  Bot.sendMessage("❗ Withdrawals are currently *disabled* by admin. Please try again later.", { parse_mode: "Markdown" });
  return;
}

let maintenance = Bot.getProperty("maintenance_mode");
if (maintenance === true) {
  Bot.sendMessage("⚠️ Withdrawals are currently *disabled due to Maintenance*. Please try again later.", { parse_mode: "Markdown" });
  return;
}

// Proceed → Ask amount
Bot.sendMessage("💰 Please enter the amount you want to withdraw:");
Bot.runCommand("enter_withdraw_amount");
